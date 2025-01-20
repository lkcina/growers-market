import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import './App.css';
import SpeciesSearchBar from './Components/SpeciesSearch/SpeciesSearch';
import { SpeciesInfo } from './types';
import { getSpeciesDetails, searchSpecies } from './api';
import SpeciesList from './Components/SpeciesList/SpeciesList';
import ListWishlist from './Components/Wishlist/ListWishlist/ListWishlist';


function App() {
    const [speciesSearch, setSpeciesSearch] = useState<string>("");
    const [speciesSearchResult, setSpeciesSearchResult] = useState<SpeciesInfo[]>([]);
    const [wishlistValues, setWishlistValues] = useState<SpeciesInfo[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);

    const handleSpeciesSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSpeciesSearch(e.target.value);
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
        const result = await searchSpecies(speciesSearch);
        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data)) {
            setSpeciesSearchResult(result.data);
        }
        console.log(speciesSearchResult, serverError);
    }

    return (
        <div className="app">
            {serverError ?? <h2>{serverError}</h2>}
            <h1>Wishlist</h1>
            <ListWishlist wishlistValues={wishlistValues} onWishlistRemove={onWishlistRemove} onWishlistCreate={onWishlistCreate} />
            <h1>Plant Finder</h1>
            <SpeciesSearchBar onSearchSubmit={onSearchSubmit} search={speciesSearch} handleChange={handleSpeciesSearchChange} />
            <SpeciesList searchResult={speciesSearchResult} onWishlistCreate={onWishlistCreate} onWishlistRemove={onWishlistRemove} wishlistValues={wishlistValues} />
        </div>
    );
}

export default App;