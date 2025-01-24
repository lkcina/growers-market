import React, { useEffect, useState } from 'react';  
import ListingForm from '../../Components/ListingForm/ListingForm';  
import { Listing, SpeciesInfo } from '../../types';  
import { createListing, getUsedSpecies } from '../../api';  
  
interface Props {  
}  
  
const UserListingsPage: React.FC<Props> = () => {  
    const [listingId, setListingId] = useState<number | null>(null);  
    const [listingTitle, setListingTitle] = useState<string>("");  
    const [listingIsForTrade, setListingIsForTrade] = useState<boolean>(false);  
    const [listingPrice, setListingPrice] = useState<number>(0.00);  
    const [listingQuantity, setListingQuantity] = useState<number>(1);  
    const [listingSpecies, setListingSpecies] = useState<SpeciesInfo | null>(null);  
    const [listingDescription, setListingDescription] = useState<string>("");
    const [listingImages, setListingImages] = useState<FileList | null>(null);
  
    const [speciesSelectOptions, setSpeciesSelectOptions] = useState<SpeciesInfo[]>([]);  
  
    const [listingValues, setListingValues] = useState<Listing[]>([]);  
  
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
        });  
    }, [])  
  
    const handleListingTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
        setListingTitle(e.target.value);  
    }  
  
    const handleListingIsForTradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setListingIsForTrade(e.target.checked);  
    }  
  
    const handleListingPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
        setListingPrice(Number(e.target.value));  
    }  
  
    const handleListingQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
        setListingQuantity(Number(e.target.value));  
    }  
  
    const handleListingSpeciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {  
        const speciesId = Number(e.target.value);  
        const species = speciesSelectOptions.find(s => s.id === speciesId) || null;  
        setListingSpecies(species);  
    }  
  
    const handleListingDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {  
        setListingDescription(e.target.value);  
    }

    const handleListingImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setListingImages(e.target.files || new FileList);
    }
  
    const onListingFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {  
        e.preventDefault();  
        if (listingId === null) {  
            const form = e.target as HTMLFormElement;  
            const data = new FormData(form);
            data.set('IsForTrade', listingIsForTrade.toString());
            
            console.log(Object.fromEntries(data.entries()));  
            const listingResult = await createListing(data);  

            if (typeof listingResult === "string") {  
                setServerError(listingResult);  
                return;  
            } else if (listingResult.status === 201) {  
                console.log(listingResult.data);  
                const updatedListingValues = [...listingValues, listingResult.data];  
                console.log(updatedListingValues);  
                setListingValues(updatedListingValues);  
            }  
        } else {
            // update listing  
        }  
    }  
  
    return (  
        <div>  
            <h1>UserListings Page</h1>  
            <ListingForm onListingFormSubmit={onListingFormSubmit} listingId={listingId} listingTitle={listingTitle} handleTitleChange={handleListingTitleChange} listingIsForTrade={listingIsForTrade} handleIsForTradChange={handleListingIsForTradeChange} listingPrice={listingPrice} handlePriceChange={handleListingPriceChange} listingQuantity={listingQuantity} handleQuantityChange={handleListingQuantityChange} listingSpecies={listingSpecies} handleSpeciesChange={handleListingSpeciesChange} listingDescription={listingDescription} handleDescriptionChange={handleListingDescriptionChange} listingImages={listingImages} handleImagesChange={handleListingImagesChange} speciesSelectOptions={speciesSelectOptions} />  
        </div>  
    );  
};  
  
export default UserListingsPage;