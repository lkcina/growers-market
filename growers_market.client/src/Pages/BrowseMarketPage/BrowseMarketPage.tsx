import React, { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import ListingSearchBar from '../../Components/ListingSearch/ListingSearchBar/ListingSearchBar';
import { Chat, Listing, SpeciesInfo } from '../../types';
import { getUsedSpecies, getUserChats, searchListings } from '../../api';
import SearchInfo from '../../Components/SearchInfo/SearchInfo';
import ListingList from '../../Components/ListingList/ListingList';

interface Props {
}

const BrowseMarketPage: React.FC<Props> = () => {
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

    const [userChats, setUserChats] = useState<Chat[]>([]);
    const [listingDetails, setListingDetails] = useState<number | null>(null);

    const [serverError, setServerError] = useState<string | null>(null);

    useEffect(() => {
        getUsedSpecies().then((result) => {
            if (typeof result === "string") {
                setServerError(result);
                return;
            } else if (Array.isArray(result)) {
                console.log(result);
                setSpeciesSelectOptions(result);
            }
        })

        searchListings(1, "", null, 9999.99, null, null, null).then((result) => {
            if (typeof result === "string") {
                setServerError(result);
            } else if (Array.isArray(result.data.data)) {
                console.log(result.data);
                setListingSearchResult(result.data.data);
                setListingSearchCurrentPage(result.data.currentPage);
                setListingSearchLastPage(result.data.lastPage);
                setListingSearchFrom(result.data.from);
                setListingSearchTo(result.data.to);
                setListingSearchTotal(result.data.total);
            }
            console.log(listingSearchResult, serverError);
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

    const handleIsForTradeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === "null" ? null : e.target.value === "true" ? true : false;
        setListingIsForTrade(value);
    };

    const handlePriceMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
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

    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchListings(1, listingSearchQuery, listingIsForTrade, listingPriceMax, listingSpecies ? listingSpecies.id : null, null, listingSort);
        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data.data)) {
            console.log(result.data);
            setListingSearchResult(result.data.data);
            setListingSearchCurrentPage(result.data.currentPage);
            setListingSearchLastPage(result.data.lastPage);
            setListingSearchFrom(result.data.from);
            setListingSearchTo(result.data.to);
            setListingSearchTotal(result.data.total);
        }
        console.log(listingSearchResult, serverError);
    }

    const onSearchNextPage = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchListings(listingSearchCurrentPage + 1, listingSearchQuery, listingIsForTrade, listingPriceMax, listingSpecies ? listingSpecies.id : null, null, listingSort);
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
        console.log(listingSearchResult, serverError);
    }

    const onSearchPreviousPage = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchListings(listingSearchCurrentPage - 1, listingSearchQuery, listingIsForTrade, listingPriceMax, listingSpecies ? listingSpecies.id : null, null, listingSort);
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
        console.log(listingSearchResult, serverError);
    }

    const showDetails = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const input = target.elements.namedItem("listingId") as HTMLInputElement;
        const value = Number(input.value);
        if (listingDetails === value) {
            setListingDetails(null);
            return;
        }
        setListingDetails(value);
    }

    return (
        <div id="browse-market-page">
            <ListingSearchBar query={listingSearchQuery} handleQueryChange={handleQueryChange} isForTrade={listingIsForTrade} handleIsForTradeChange={handleIsForTradeChange} priceMax={listingPriceMax} handlePriceMaxChange={handlePriceMaxChange} species={listingSpecies} handleSpeciesChange={handleSpeciesChange} sort={listingSort} handleSortChange={handleSortChange} speciesSelectOptions={speciesSelectOptions} onSearchSubmit={onSearchSubmit} />
            <SearchInfo currentPage={listingSearchCurrentPage} lastPage={listingSearchLastPage} from={listingSearchFrom} to={listingSearchTo} total={listingSearchTotal} onNextPage={onSearchNextPage} onPreviousPage={onSearchPreviousPage} />
            <ListingList listings={listingSearchResult} onSelect={showDetails} listingDetails={listingDetails} userChats={userChats} setUserChats={setUserChats} />
            <SearchInfo currentPage={listingSearchCurrentPage} lastPage={listingSearchLastPage} from={listingSearchFrom} to={listingSearchTo} total={listingSearchTotal} onNextPage={onSearchNextPage} onPreviousPage={onSearchPreviousPage} />
        </div>
    );
};

export default BrowseMarketPage;