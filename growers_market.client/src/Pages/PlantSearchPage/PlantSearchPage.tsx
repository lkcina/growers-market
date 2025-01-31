import React, { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { getSpeciesDetails, getWishlist, postWishlist, searchSpecies, deleteWishlist, getUsedSpecies, getRandomSpecies } from '../../api';
import SpeciesList from '../../Components/SpeciesList/SpeciesList';
import SpeciesSearchBar from '../../Components/SpeciesSearch/SpeciesSearchBar/SpeciesSearchBar';
import { SpeciesInfo } from '../../types';
import SearchInfo from '../../Components/SearchInfo/SearchInfo';

interface Props {
}

const PlantSearchPage: React.FC<Props> = () => {
    const [speciesSearchQuery, setSpeciesSearchQuery] = useState<string>("");
    const [speciesSearchCycle, setSpeciesSearchCycle] = useState<string | null>(null);
    const [speciesSearchSunlight, setSpeciesSearchSunlight] = useState<string | null>(null);
    const [speciesSearchWatering, setSpeciesSearchWatering] = useState<string | null>(null);
    const [speciesSearchHardiness, setSpeciesSearchHardiness] = useState<number | null>(null);
    const [speciesSearchIndoor, setSpeciesSearchIndoor] = useState<boolean | null>(null);
    const [speciesSearchEdible, setSpeciesSearchEdible] = useState<boolean | null>(null);
    const [speciesSearchPoisonous, setSpeciesSearchPoisonous] = useState<boolean | null>(null);

    const [speciesSearchResult, setSpeciesSearchResult] = useState<SpeciesInfo[]>([]);

    const [speciesSearchCurrentPage, setSpeciesSearchCurrentPage] = useState<number>(1);
    const [speciesSearchLastPage, setSpeciesSearchLastPage] = useState<number>(1);
    const [speciesSearchFrom, setSpeciesSearchFrom] = useState<number>(1);
    const [speciesSearchTo, setSpeciesSearchTo] = useState<number>(30);
    const [speciesSearchTotal, setSpeciesSearchTotal] = useState<number>(0);

    const [wishlistValues, setWishlistValues] = useState<SpeciesInfo[]>([]);
    const [speciesDetails, setSpeciesDetails] = useState<number | null>(null);

    const [serverError, setServerError] = useState<string | null>(null);

    useEffect(() => {
        getWishlist().then((result) => {
            if (typeof result === "string") {
                setServerError(result);
            } else if (Array.isArray(result.data)) {
                setWishlistValues(result.data);
                console.log(result.data);
            }
        });

        getRandomSpecies().then((result) => {
            if (typeof result === "string") {
                setServerError(result);
            } else if (Array.isArray(result.data.data)) {
                setSpeciesSearchResult(result.data.data);
                setSpeciesSearchCurrentPage(result.data.currentPage);
                setSpeciesSearchLastPage(result.data.lastPage);
                setSpeciesSearchFrom(result.data.from);
                setSpeciesSearchTo(result.data.to);
                setSpeciesSearchTotal(result.data.total);
            }
            console.log(speciesSearchResult, serverError);
        })
    }, [])

    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSpeciesSearchQuery(e.target.value);
    }

    const handleCycleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value === "null" ? null : e.target.value;
        setSpeciesSearchCycle(value);
    }
    const handleSunlightChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value === "null" ? null : e.target.value;
        setSpeciesSearchSunlight(value);
    }

    const handleWateringChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value === "null" ? null : e.target.value;
        setSpeciesSearchWatering(value);
    }

    const handleHardinessChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value === "null" ? null : Number(e.target.value);
        setSpeciesSearchHardiness(value);
    }

    const handleIndoorChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === "null" ? null : e.target.value === "true" ? true : false;
        setSpeciesSearchIndoor(value);
    }

    const handleEdibleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === "null" ? null : e.target.value === "true" ? true : false;
        setSpeciesSearchEdible(value);
    }

    const handlePoisonousChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === "null" ? null : e.target.value === "true" ? true : false;
        setSpeciesSearchPoisonous(value);
    }

    const onWishlistCreate = async (e: SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const input = target.getElementsByClassName("add-wishlist-input")[0] as HTMLInputElement;
        const value = Number(input.value);
        if (wishlistValues.find((species) => species.id === value)) {
            return;
        }
        const wishlistResult = await postWishlist(value);
        if (typeof wishlistResult === "string") {
            setServerError(wishlistResult);
            return;
        } else if (wishlistResult.status === 201) {
            console.log("Wishlist created");
        }

        const result = await getSpeciesDetails(value);
        if (typeof result === "string") {
            setServerError(result);
        } else {

            const updatedWishlist = [...wishlistValues, result];
            console.log(updatedWishlist);
            setWishlistValues(updatedWishlist);
        }

    }

    const onWishlistRemove = async (e: SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const input = target.getElementsByClassName("rem-wishlist-input")[0] as HTMLInputElement;
        const value = Number(input.value);
        console.log(value);
        const wishlistResult = await deleteWishlist(value);
        if (typeof wishlistResult === "string") {
            setServerError(wishlistResult);
            return;
        } else if (wishlistResult.status === 204) {
            console.log("Wishlist deleted");
        }

        const updatedWishlist = wishlistValues.filter((species) => species.id !== value);
        console.log(updatedWishlist);
        setWishlistValues(updatedWishlist);
    }

    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchSpecies(1, speciesSearchQuery, speciesSearchCycle, speciesSearchWatering, speciesSearchSunlight, speciesSearchHardiness, speciesSearchIndoor, speciesSearchEdible, speciesSearchPoisonous);
        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data.data)) {
            setSpeciesSearchResult(result.data.data);
            setSpeciesSearchCurrentPage(result.data.currentPage);
            setSpeciesSearchLastPage(result.data.lastPage);
            setSpeciesSearchFrom(result.data.from);
            setSpeciesSearchTo(result.data.to);
            setSpeciesSearchTotal(result.data.total);
        }
        console.log(speciesSearchResult, serverError);
    }

    const onSearchNextPage = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchSpecies(speciesSearchCurrentPage + 1, speciesSearchQuery, speciesSearchCycle, speciesSearchWatering, speciesSearchSunlight, speciesSearchHardiness, speciesSearchIndoor, speciesSearchEdible, speciesSearchPoisonous);
        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data.data)) {
            setSpeciesSearchResult(result.data.data);
            setSpeciesSearchCurrentPage(result.data.currentPage);
            setSpeciesSearchLastPage(result.data.lastPage);
            setSpeciesSearchFrom(result.data.from);
            setSpeciesSearchTo(result.data.to);
            setSpeciesSearchTotal(result.data.total);
        }
        console.log(speciesSearchResult, serverError);
    }

    const onSearchPreviousPage = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchSpecies(speciesSearchCurrentPage - 1, speciesSearchQuery, speciesSearchCycle, speciesSearchWatering, speciesSearchSunlight, speciesSearchHardiness, speciesSearchIndoor, speciesSearchEdible, speciesSearchPoisonous);
        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data.data)) {
            setSpeciesSearchResult(result.data.data);
            setSpeciesSearchCurrentPage(result.data.currentPage);
            setSpeciesSearchLastPage(result.data.lastPage);
            setSpeciesSearchFrom(result.data.from);
            setSpeciesSearchTo(result.data.to);
            setSpeciesSearchTotal(result.data.total);
        }
        console.log(speciesSearchResult, serverError);
    }

    const showDetails = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const input = target.elements.namedItem("speciesId") as HTMLInputElement;
        const value = Number(input.value);
        if (speciesDetails === value) {
            setSpeciesDetails(null);
            return;
        }
        const species = await getSpeciesDetails(value);
        if (typeof species === "string") {
            setServerError(species);
            return;
        }
        const updatedSpeciesSearchResult = speciesSearchResult.map(s => s.id === value ? species : s);
        setSpeciesSearchResult(updatedSpeciesSearchResult);
        setSpeciesDetails(value);
    }

    return (
        <div className="plant-search-page">
            {serverError ?? <h2>{serverError}</h2>}
            <h1>Plant Finder</h1>
            <SpeciesSearchBar onSearchSubmit={onSearchSubmit} query={speciesSearchQuery} handleQueryChange={handleQueryChange} cycle={speciesSearchCycle} handleCycleChange={handleCycleChange} sunlight={speciesSearchSunlight} handleSunlightChange={handleSunlightChange} watering={speciesSearchWatering} handleWateringChange={handleWateringChange} hardiness={speciesSearchHardiness} handleHardinessChange={handleHardinessChange} indoor={speciesSearchIndoor} handleIndoorChange={handleIndoorChange} edible={speciesSearchEdible} handleEdibleChange={handleEdibleChange} poisonous={speciesSearchPoisonous} handlePoisonousChange={handlePoisonousChange} />
            <SearchInfo currentPage={speciesSearchCurrentPage} lastPage={speciesSearchLastPage} from={speciesSearchFrom} to={speciesSearchTo} total={speciesSearchTotal} onNextPage={onSearchNextPage} onPreviousPage={onSearchPreviousPage} />
            <SpeciesList searchResult={speciesSearchResult} onWishlistCreate={onWishlistCreate} onWishlistRemove={onWishlistRemove} wishlistValues={wishlistValues} speciesDetails={speciesDetails} showDetails={showDetails} />
            <SearchInfo currentPage={speciesSearchCurrentPage} lastPage={speciesSearchLastPage} from={speciesSearchFrom} to={speciesSearchTo} total={speciesSearchTotal} onNextPage={onSearchNextPage} onPreviousPage={onSearchPreviousPage} />
        </div>
    );
};

export default PlantSearchPage;