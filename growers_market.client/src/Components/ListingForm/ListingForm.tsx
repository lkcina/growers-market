import React, { FormEvent } from "react";
import { SpeciesInfo } from "../../types";
import { v4 as uuidv4 } from 'uuid';
import ListingFormImages from "../ListingFormImages/ListingFormImages";

interface Props {
    onListingFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
    listingId: number | null;
    listingTitle: string;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    listingIsForTrade: boolean;
    handleIsForTradChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    listingPrice: number;
    handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    listingQuantity: number;
    handleQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    listingSpecies: SpeciesInfo | null;
    handleSpeciesChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    listingDescription: string;
    handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    listingInputImages: File[];
    handleImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    listingImageValues: (File | string)[];
    speciesSelectOptions: SpeciesInfo[];
    onRemoveImage: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onAddImage: (e: React.MouseEvent<HTMLButtonElement>) => void;
    fileInputCount: number;
}

const ListingForm: React.FC<Props> = ({ onListingFormSubmit, listingId, listingTitle, handleTitleChange, listingIsForTrade, handleIsForTradChange, listingPrice, handlePriceChange, listingQuantity, handleQuantityChange, listingSpecies, handleSpeciesChange, listingDescription, handleDescriptionChange, listingInputImages, handleImagesChange, listingImageValues, speciesSelectOptions, onRemoveImage, onAddImage, fileInputCount }: Props): JSX.Element => {
    return (
        <form onSubmit={onListingFormSubmit}>
            <fieldset>
                <label htmlFor="listing-title">Title</label>
                <input type="text" id="listing-title" name="Title" required value={listingTitle} onChange={handleTitleChange} />
            </fieldset>
            <fieldset>
                <label htmlFor="listing-is-for-trade">For Trade</label>
                <input type="checkbox" id="listing-is-for-trade" name="IsForTrade" checked={listingIsForTrade} onChange={handleIsForTradChange} />
            </fieldset>
            <fieldset>
                <label htmlFor="listing-price">Price</label>
                <input type="number" id="listing-price" name="Price" min="0.00" max="9999.99" value={listingPrice} step="0.01" onChange={handlePriceChange} />
            </fieldset>
            <fieldset>
                <label htmlFor="listing-quantity">Quantity</label>
                <input type="number" id="listing-quantity" name="Quantity" min="0" max="999" value={listingQuantity} onChange={handleQuantityChange} />
            </fieldset>
            <fieldset>
                <label htmlFor="listing-species">Species</label>
                <select id="listing-species" name="SpeciesId" value={listingSpecies ? listingSpecies.id : "0"} onChange={handleSpeciesChange} >
                    <option value="0" disabled>Select a species</option>
                    {
                        speciesSelectOptions.map(s => {
                            return <option key={uuidv4()} id={String(s.id)} value={s.id}>{s.commonName} ({s.scientificName[0]})</option>
                        })
                    }
                </select>
            </fieldset>
            <fieldset>
                <label htmlFor="listing-description">Description</label>
                <textarea id="listing-description" name="Description" value={listingDescription} onChange={handleDescriptionChange} />
            </fieldset>
            <ListingFormImages inputImages={listingInputImages} handleImagesChange={handleImagesChange} imageValues={listingImageValues} onRemoveImage={onRemoveImage} onAddImage={onAddImage} fileInputCount={fileInputCount} />
            <fieldset>
                <button type="submit">Submit</button>
                <button type="button" >Cancel</button>
            </fieldset>
        </form>
    )
}

export default ListingForm;