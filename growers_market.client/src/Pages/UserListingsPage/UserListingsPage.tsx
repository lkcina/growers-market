import React, { useEffect, useState } from 'react';  
import ListingForm from '../../Components/ListingForm/ListingForm';  
import { Listing, SpeciesInfo } from '../../types';  
import { createListing, getUsedSpecies, updateListing } from '../../api';  
import { toast } from 'react-toastify';
  
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
    const [listingInputImages, setListingInputImages] = useState<File[]>([]);
    const [listingImageValues, setListingImageValues] = useState<(File | string)[]>([]);

    const [fileInputCount, setFileInputCount] = useState<number>(0);
  
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
        const updatedInputImages = listingInputImages.concat(Array.from(e.target.files || []));
        setListingInputImages(updatedInputImages);
        const updatedImageValues: (File | string)[] = [...listingImageValues, ...Array.from(e.target.files || [])];
        console.log(updatedImageValues);
        setListingImageValues(updatedImageValues);
    }
  
    const onListingFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {  
        e.preventDefault();
        if (listingTitle === "") {
            toast.warning("Title is required");
            return;
        } else if (listingImageValues.length > 5) {
            toast.warning("Exceeded maximum of 5 images");
            return;
        }
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);
        data.set('IsForTrade', listingIsForTrade.toString());
        const uploadedImages = Array.from(listingInputImages || []).filter(image => listingImageValues.includes(image));
        console.log(uploadedImages);
        data.set('UploadedImages', uploadedImages[0]);

        for (let i = 1; i < uploadedImages.length; i++) {
            data.append('UploadedImages', uploadedImages[i]);
        }

        console.log(Object.fromEntries(data.entries()));

        if (listingId === null) {

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
            const listingResult = await updateListing(listingId, data);

            if (typeof listingResult === "string") {
                setServerError(listingResult);
                return;
            } else if (listingResult.status === 201) {
                console.log(listingResult.data);
                const updatedListingValues = [...listingValues, listingResult.data];
                console.log(updatedListingValues);
                setListingValues(updatedListingValues);
            }
        }  
    }

    const onRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const button = e.target as HTMLButtonElement;
        const imageIndex = Number(button.parentElement?.id);
        const updatedImageValues = [...listingImageValues];
        updatedImageValues.splice(imageIndex, 1);
        console.log(updatedImageValues);
        setListingImageValues(updatedImageValues);
    }

    const onAddImage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setFileInputCount(fileInputCount + 1);
    }
  
    return (  
        <div>  
            <h1>UserListings Page</h1>
            <button onClick={() => setListingId(null)}>Create New Listing</button>
            <button onClick={() => { setListingId(7); setListingImageValues(["C:\\Users\\jacya\\Source\\Repos\\growers-market-1\\growers_market.Server\\Uploads\\ListingImages\\01882a32-0463-40e6-b4f0-bc3562572cb1.jpg", "C:\\Users\\jacya\\Source\\Repos\\growers-market-1\\growers_market.Server\\Uploads\\ListingImages\\d6e0e0c3-4f85-4cbb-86b1-7ea71381b4f7.jpg"]) }}>Edit Listing</button>
            <ListingForm onListingFormSubmit={onListingFormSubmit} listingId={listingId} listingTitle={listingTitle} handleTitleChange={handleListingTitleChange} listingIsForTrade={listingIsForTrade} handleIsForTradChange={handleListingIsForTradeChange} listingPrice={listingPrice} handlePriceChange={handleListingPriceChange} listingQuantity={listingQuantity} handleQuantityChange={handleListingQuantityChange} listingSpecies={listingSpecies} handleSpeciesChange={handleListingSpeciesChange} listingDescription={listingDescription} handleDescriptionChange={handleListingDescriptionChange} listingInputImages={listingInputImages} handleImagesChange={handleListingImagesChange} listingImageValues={listingImageValues} speciesSelectOptions={speciesSelectOptions} onRemoveImage={onRemoveImage} onAddImage={onAddImage} fileInputCount={fileInputCount} />  
        </div>  
    );  
};  
  
export default UserListingsPage;