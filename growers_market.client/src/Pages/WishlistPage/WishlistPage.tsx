import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { postWishlist, getSpeciesDetails, deleteWishlist, getWishlist } from '../../api';
import ListWishlist from '../../Components/Wishlist/ListWishlist/ListWishlist';
import { SpeciesInfo } from '../../types';
import WishlistSearchBar from '../../Components/WishlistSearchBar/WishlistSearchBar';

interface Props {
}

const WishlistPage: React.FC<Props> = () => {
    const [wishlistSearchQuery, setWishlistSearchQuery] = useState<string>("");
    const [wishlistSearchResult, setWishlistSearchResult] = useState<SpeciesInfo[]>([]);

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

    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setWishlistSearchQuery(e.target.value);
    }

    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = wishlistValues.filter((species) => species.commonName.toLowerCase().includes(wishlistSearchQuery.toLowerCase()) || species.scientificName[0].toLowerCase().includes(wishlistSearchQuery.toLowerCase()));
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

    return (
        <div>
            <h1>Wishlist Page</h1>
            <WishlistSearchBar handleQueryChange={handleQueryChange} onSearchSubmit={onSearchSubmit} query={wishlistSearchQuery} />
            <ListWishlist wishlistValues={wishlistValues} onWishlistCreate={onWishlistCreate} onWishlistRemove={onWishlistRemove} wishlistSearchResult={wishlistSearchResult} />
        </div>
    );
};

export default WishlistPage;