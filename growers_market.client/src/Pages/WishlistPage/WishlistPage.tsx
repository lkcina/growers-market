import React, { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { postWishlist, getSpeciesDetails, deleteWishlist, getWishlist } from '../../api';
import ListWishlist from '../../Components/Wishlist/ListWishlist/ListWishlist';
import { SpeciesInfo } from '../../types';
import SearchBar from '../../Components/SearchBar/SearchBar';
import './WishlistPage.css';
import SpeciesList from '../../Components/SpeciesList/SpeciesList';

interface Props {
}

const WishlistPage: React.FC<Props> = () => {
    const [wishlistSearchQuery, setWishlistSearchQuery] = useState<string>("");
    const [wishlistSearchResult, setWishlistSearchResult] = useState<SpeciesInfo[]>([]);

    const [speciesDetails, setSpeciesDetails] = useState<number | null>(null);

    const [wishlistValues, setWishlistValues] = useState<SpeciesInfo[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);

    useEffect(() => {
        getWishlist().then((result) => {
            if (typeof result === "string") {
                setServerError(result);
            } else if (Array.isArray(result.data)) {
                setWishlistValues(result.data);
                setWishlistSearchResult(result.data);
                console.log(result.data);
            }
        });
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if (speciesDetails !== null) {
                const detailsElement = document.getElementById(`species-${speciesDetails}`);
                console.log(detailsElement);
                if (detailsElement) {
                    detailsElement.scrollIntoView();
                }
            }
        }, 1);
    }, [speciesDetails])

    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setWishlistSearchQuery(e.target.value);
    }

    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = wishlistValues.filter((species) => species.commonName.toLowerCase().includes(wishlistSearchQuery.toLowerCase()) || species.scientificName[0].toLowerCase().includes(wishlistSearchQuery.toLowerCase()));
        console.log(result);
        setWishlistSearchResult(result);
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
        const updatedSearchResult = wishlistSearchResult.filter((species) => species.id !== value);
        setWishlistSearchResult(updatedSearchResult);
    }

    const showDetails = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const input = target.elements.namedItem("speciesId") as HTMLInputElement;
        const value = Number(input.value);
        if (speciesDetails === value) {
            setSpeciesDetails(null);
            return;
        }
        setSpeciesDetails(value);
    }

    return (
        <div id="wishlist-page">
            <h1>My Wishlist</h1>
            <SearchBar handleQueryChange={handleQueryChange} onSearchSubmit={onSearchSubmit} query={wishlistSearchQuery} />
            <SpeciesList wishlistValues={wishlistValues} onWishlistCreate={onWishlistCreate} onWishlistRemove={onWishlistRemove} searchResult={wishlistSearchResult} showDetails={showDetails} speciesDetails={speciesDetails} />
        </div>
    );
};

export default WishlistPage;