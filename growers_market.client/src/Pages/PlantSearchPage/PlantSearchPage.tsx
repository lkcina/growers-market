import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { getSpeciesDetails, searchSpecies } from '../../api';
import SpeciesList from '../../Components/SpeciesList/SpeciesList';
import SpeciesSearchBar from '../../Components/SpeciesSearch/SpeciesSearchBar/SpeciesSearchBar';
import { SpeciesInfo } from '../../types';

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
    const [wishlistValues, setWishlistValues] = useState<SpeciesInfo[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);

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
        const value = e.target.value === "null" ? null : Boolean(e.target.value);
        setSpeciesSearchIndoor(value);
    }

    const handleEdibleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === "null" ? null : Boolean(e.target.value);
        setSpeciesSearchEdible(value);
    }

    const handlePoisonousChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === "null" ? null : Boolean(e.target.value);
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

        const result = await getSpeciesDetails(value);
        if (typeof result === "string") {
            setServerError(result);
        } else {
            const updatedWishlist = [...wishlistValues, result];
            console.log(updatedWishlist);
            setWishlistValues(updatedWishlist);
        }

    }

    const onWishlistRemove = (e: SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const input = target.getElementsByClassName("rem-wishlist-input")[0] as HTMLInputElement;
        const value = Number(input.value);
        console.log(value);
        const updatedWishlist = wishlistValues.filter((species) => species.id !== value);
        console.log(updatedWishlist);
        setWishlistValues(updatedWishlist);
    }

    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchSpecies(speciesSearchQuery, speciesSearchCycle, speciesSearchWatering, speciesSearchSunlight, speciesSearchHardiness, speciesSearchIndoor, speciesSearchEdible, speciesSearchPoisonous);
        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data)) {
            setSpeciesSearchResult(result.data);
        }
        console.log(speciesSearchResult, serverError);
    }
    return (
        <div className="plant-search-page">
            {serverError ?? <h2>{serverError}</h2>}
            <h2>Plant Finder</h2>
            <SpeciesSearchBar onSearchSubmit={onSearchSubmit} query={speciesSearchQuery} handleQueryChange={handleQueryChange} cycle={speciesSearchCycle} handleCycleChange={handleCycleChange} sunlight={speciesSearchSunlight} handleSunlightChange={handleSunlightChange} watering={speciesSearchWatering} handleWateringChange={handleWateringChange} hardiness={speciesSearchHardiness} handleHardinessChange={handleHardinessChange} indoor={speciesSearchIndoor} handleIndoorChange={handleIndoorChange} edible={speciesSearchEdible} handleEdibleChange={handleEdibleChange} poisonous={speciesSearchPoisonous} handlePoisonousChange={handlePoisonousChange} />
            <SpeciesList searchResult={speciesSearchResult} onWishlistCreate={onWishlistCreate} onWishlistRemove={onWishlistRemove} wishlistValues={wishlistValues} />
        </div>
    );
};

export default PlantSearchPage;