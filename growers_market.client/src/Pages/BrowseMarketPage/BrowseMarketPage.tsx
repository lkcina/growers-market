import React, { ChangeEvent, FormEvent, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import ListingSearchBar from '../../Components/ListingSearch/ListingSearchBar/ListingSearchBar';
import { Chat, Listing, SpeciesInfo } from '../../types';
import { getUsedSpecies, getUserChats, searchListings } from '../../api';
import SearchInfo from '../../Components/SearchInfo/SearchInfo';
import ListingList from '../../Components/ListingList/ListingList';
import './BrowseMarketPage.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import { useAuth } from '../../Context/UseAuth';



const BrowseMarketPage: React.FC = (): JSX.Element => {
    const { isLoggedIn } = useAuth();

    const [listingSearchQuery, setListingSearchQuery] = useState<string>("");
    const [listingIsForTrade, setListingIsForTrade] = useState<boolean | null>(null);
    const [listingPriceMax, setListingPriceMax] = useState<number>(9999.99);
    const [listingSpecies, setListingSpecies] = useState<SpeciesInfo | null>(null);
    const [listingSort, setListingSort] = useState<string | null>(null);
    const [speciesSelectOptions, setSpeciesSelectOptions] = useState<SpeciesInfo[]>([]);

    const [listingSearchResult, setListingSearchResult] = useState<Listing[]>([]);
    const [listingSearchCurrentPage, setListingSearchCurrentPage] = useState<number>(1);
    const [listingSearchLastPage, setListingSearchLastPage] = useState<number>(1);
    const [listingSearchFrom, setListingSearchFrom] = useState<number>(1);
    const [listingSearchTo, setListingSearchTo] = useState<number>(1);
    const [listingSearchTotal, setListingSearchTotal] = useState<number>(0);

    const [listingSearchRadius, setListingSearchRadius] = useState<number>(20);
    const [listingSearchUnit, setListingSearchUnit] = useState<string>("mi");
    const [listingSearchLocation, setListingSearchLocation] = useState<string>(isLoggedIn() ? "Home Address" : "Current Location");

    const [currentLocationLat, setCurrentLocationLat] = useState<number | null>(null);
    const [currentLocationLng, setCurrentLocationLng] = useState<number | null>(null);

    const [userChats, setUserChats] = useState<Chat[]>([]);
    const [listingDetails, setListingDetails] = useState<number | null>(null);

    const [serverError, setServerError] = useState<string | null>(null);

    useEffect(() => {
        getUsedSpecies().then((result) => {
            if (typeof result === "string") {
                setServerError(result);
                return;
            } else if (Array.isArray(result)) {
                setSpeciesSelectOptions(result);
            }
        })

        if (listingSearchLocation === "Current Location") {
            if (!navigator.geolocation) {
                setServerError("Geolocation is not supported by your browser");
                toast.error("Geolocation is not supported by your browser");
                return;
            }
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentLocationLat(position.coords.latitude);
                setCurrentLocationLng(position.coords.longitude);
            }, () => {
                setServerError("Unable to retrieve your location");
                toast.error("Unable to retrieve your location");
            });
        }
        searchListings(1, "", null, 10000, null, null, null, listingSearchRadius, listingSearchUnit, listingSearchLocation, currentLocationLat, currentLocationLng).then((result) => {
            if (typeof result === "string") {
                setServerError(result);
            } else if (Array.isArray(result.data.data)) {
                setListingSearchResult(result.data.data);
                setListingSearchCurrentPage(result.data.currentPage);
                setListingSearchLastPage(result.data.lastPage);
                setListingSearchFrom(result.data.from);
                setListingSearchTo(result.data.to);
                setListingSearchTotal(result.data.total);
            }
        });
    }, [])

    useEffect(() => {
        getUserChats().then((result) => {
            if (typeof result === "string") {
                setServerError(result);
                return;
            } else if (Array.isArray(result)) {
                setUserChats(result);
            }
        })
    }, [])


    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setListingSearchQuery(e.target.value);
    };

    const handleIsForTradeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value === "null" ? null : e.target.value === "true" ? true : false;
        setListingIsForTrade(value);
    };

    const handlePriceMaxChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setListingPriceMax(parseFloat(e.target.value));
    }

    const handleSpeciesChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const speciesId = Number(e.target.value);
        const species = speciesSelectOptions.find(s => s.id === speciesId) || null;
        setListingSpecies(species);
    }

    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value === "null" ? null : e.target.value;
        setListingSort(value);
    }

    const searchRadiusIncrement = (e: SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        let updatedRadius = listingSearchRadius;
        if (updatedRadius < 500) {
            updatedRadius += 10;
            setListingSearchRadius(updatedRadius);
        }

        let interval: number | NodeJS.Timeout = 0;

        const timeout = setTimeout(() => {
            interval = setInterval(() => {
                if (updatedRadius < 500) {
                    updatedRadius += 10;
                    setListingSearchRadius(updatedRadius);
                }
            }, 50);
        }, 500);

        const mouseUpEvent = (ev: MouseEvent | TouchEvent) => {
            ev.preventDefault();
            ev.stopPropagation();
            clearTimeout(timeout);
            clearInterval(interval);
            document.removeEventListener("mouseup", mouseUpEvent);
            document.removeEventListener("touchend", mouseUpEvent);
        };

        document.addEventListener("mouseup", mouseUpEvent);
        document.addEventListener("touchend", mouseUpEvent);
    }

    const searchRadiusDecrement = (e: SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        let updatedRadius = listingSearchRadius;
        if (updatedRadius > 10) {
            updatedRadius -= 10;
            setListingSearchRadius(updatedRadius);
        }

        let interval: number | NodeJS.Timeout = 0;

        const timeout = setTimeout(() => {
            interval = setInterval(() => {
                if (updatedRadius > 10) {
                    updatedRadius -= 10;
                    setListingSearchRadius(updatedRadius);
                }
            }, 50);
        }, 500);

        const mouseUpEvent = (ev: MouseEvent | TouchEvent) => {
            ev.preventDefault();
            ev.stopPropagation();
            clearTimeout(timeout);
            clearInterval(interval);
            document.removeEventListener("mouseup", mouseUpEvent);
            document.removeEventListener("touchend", mouseUpEvent);
        };

        document.addEventListener("mouseup", mouseUpEvent);
        document.addEventListener("touchend", mouseUpEvent);
    }

    const handleSearchUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setListingSearchUnit(e.target.value);
    }

    const handleSearchLocationChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "Current Location") {
            if (!navigator.geolocation) {
                setServerError("Geolocation is not supported by your browser");
                toast.error("Geolocation is not supported by your browser");
                return;
            }
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentLocationLat(position.coords.latitude);
                setCurrentLocationLng(position.coords.longitude);
            }, () => {
                setServerError("Unable to retrieve your location");
                toast.error("Unable to retrieve your location");
            });
        }
        setListingSearchLocation(e.target.value);
    }

    const handleLocationOptionSelect = (e: SyntheticEvent) => {
        const target = e.target as HTMLButtonElement;
        const input = target.parentElement?.parentElement?.children.namedItem("searchLocation") as HTMLInputElement;
        input.value = target.value;
        const event = new InputEvent('change', { bubbles: true }) as unknown as ChangeEvent<HTMLInputElement>;
        Object.defineProperty(event, 'target', { writable: false, value: input });

        setListingSearchLocation(target.value);
        handleSearchLocationChange(event);

    }

     const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchListings(1, listingSearchQuery, listingIsForTrade, listingPriceMax, listingSpecies ? listingSpecies.id : null, null, listingSort, listingSearchRadius, listingSearchUnit, listingSearchLocation, currentLocationLat, currentLocationLng);
        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data.data)) {
            setListingSearchResult(result.data.data);
            setListingSearchCurrentPage(result.data.currentPage);
            setListingSearchLastPage(result.data.lastPage);
            setListingSearchFrom(result.data.from);
            setListingSearchTo(result.data.to);
            setListingSearchTotal(result.data.total);
        }
        
    }

    const onSearchNextPage = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchListings(listingSearchCurrentPage + 1, listingSearchQuery, listingIsForTrade, listingPriceMax, listingSpecies ? listingSpecies.id : null, null, listingSort, listingSearchRadius, listingSearchUnit, listingSearchLocation, currentLocationLat, currentLocationLng);
        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data.data)) {
            setListingSearchResult(result.data.data);
            setListingSearchCurrentPage(result.data.currentPage);
            setListingSearchLastPage(result.data.lastPage);
            setListingSearchFrom(result.data.from);
            setListingSearchTo(result.data.to);
            setListingSearchTotal(result.data.total);
        }
    }

    const onSearchPreviousPage = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchListings(listingSearchCurrentPage - 1, listingSearchQuery, listingIsForTrade, listingPriceMax, listingSpecies ? listingSpecies.id : null, null, listingSort, listingSearchRadius, listingSearchUnit, listingSearchLocation, currentLocationLat, currentLocationLng);
        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data.data)) {
            setListingSearchResult(result.data.data);
            setListingSearchCurrentPage(result.data.currentPage);
            setListingSearchLastPage(result.data.lastPage);
            setListingSearchFrom(result.data.from);
            setListingSearchTo(result.data.to);
            setListingSearchTotal(result.data.total);
        }
    }

    const showDetails = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const input = target.elements.namedItem("listingId") as HTMLInputElement;
        const value = Number(input.value);
        if (listingDetails === value) {
            setListingDetails(null);
            return;
        }
        setListingDetails(value);
    }, [listingDetails]);

    return (
        <div id="browse-market-page">
            <Link to="/market/saved">Saved Listings</Link>
            <ListingSearchBar query={listingSearchQuery} handleQueryChange={handleQueryChange} isForTrade={listingIsForTrade} handleIsForTradeChange={handleIsForTradeChange} priceMax={listingPriceMax} handlePriceMaxChange={handlePriceMaxChange} species={listingSpecies} handleSpeciesChange={handleSpeciesChange} sort={listingSort} handleSortChange={handleSortChange} speciesSelectOptions={speciesSelectOptions} onSearchSubmit={onSearchSubmit} searchRadius={listingSearchRadius} searchRadiusIncrement={searchRadiusIncrement} searchRadiusDecrement={searchRadiusDecrement} searchUnit={listingSearchUnit} handleSearchUnitChange={handleSearchUnitChange} searchLocation={listingSearchLocation} handleSearchLocationChange={handleSearchLocationChange} handleLocationOptionSelect={handleLocationOptionSelect} />
            <SearchInfo currentPage={listingSearchCurrentPage} lastPage={listingSearchLastPage} from={listingSearchFrom} to={listingSearchTo} total={listingSearchTotal} onNextPage={onSearchNextPage} onPreviousPage={onSearchPreviousPage} />
            <ListingList listings={listingSearchResult} onSelect={showDetails} listingDetails={listingDetails} userChats={userChats} setUserChats={setUserChats} />
            <SearchInfo currentPage={listingSearchCurrentPage} lastPage={listingSearchLastPage} from={listingSearchFrom} to={listingSearchTo} total={listingSearchTotal} onNextPage={onSearchNextPage} onPreviousPage={onSearchPreviousPage} />
        </div>
    );
};

export default BrowseMarketPage;