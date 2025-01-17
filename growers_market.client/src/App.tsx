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

    const onWishlistCreate = async (e: any) => {
        e.preventDefault();
        console.log(e.target.getElementsByClassName("add-wishlist-input")[0].value);
        if (wishlistValues.find((species) => species.id === e.target.getElementsByClassName("add-wishlist-input")[0].value)) {
            return;
        }

        console.log(wishlistValues);
        const result = await getSpeciesDetails(e.target.getElementsByClassName("add-wishlist-input")[0].value);
        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data)) {
            const updatedWishlist = [...wishlistValues, result.data];
            setWishlistValues(updatedWishlist);
        }
        
    }

    const onWishlistRemove = (e: any) => {
        e.preventDefault();
        const updatedWishlist = wishlistValues.filter((species) => species.id !== e.target.getElementsByClassName("rem-wishlist-input")[0].value);
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
            <ListWishlist wishlistValues={wishlistValues} onWishlistRemove={onWishlistRemove} />
            <h1>Plant Finder</h1>
            <SpeciesSearchBar onSearchSubmit={onSearchSubmit} search={speciesSearch} handleChange={handleSpeciesSearchChange} />
            <SpeciesList searchResult={speciesSearchResult} onWishlistCreate={onWishlistCreate} />
        </div>
    );
}

export default App;