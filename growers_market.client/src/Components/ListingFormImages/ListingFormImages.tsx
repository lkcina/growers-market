import React from "react";
import ImageInput from "./ImageInput/ImageInput";

interface Props {
    inputImages: File[];
    imageValues: (File | string)[];
    handleImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveImage: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onAddImage: (e: React.MouseEvent<HTMLButtonElement>) => void;
    fileInputCount: number;
}

const ListingFormImages: React.FC<Props> = ({ inputImages, handleImagesChange, imageValues, onRemoveImage, onAddImage, fileInputCount }: Props): JSX.Element => {
    return (
        <fieldset>
            <label htmlFor="listing-images">Images</label>
            {imageValues.length > 5 ? <p>Exceeded maximum of 5 images</p> : <p>Maximum of 5 images</p>}
            <div id="listing-images-preview">
                {imageValues.map((image, index) => {
                    if (typeof image === "string") {
                        return (
                            <div id={index.toString()} key={index} className="image-preview">
                                <img src={image} alt={`Listing image ${index + 1}`} />
                                <button type="button" onClick={onRemoveImage}>X</button>
                            </div>
                        )
                    } else {
                        return (
                            <div id={index.toString()} key={index} className="image-preview">
                                <img src={URL.createObjectURL(image)} alt={`Listing image ${index + 1}`} />
                                <button type="button" onClick={onRemoveImage}>X</button>
                            </div>
                        )
                    }
                })}
            </div>
            <button type="button" onClick={onAddImage}>Add Images</button>
            <input type="hidden" name="ImagePaths" value={JSON.stringify(imageValues.filter(i => typeof i === "string"))} />
            {Array.from({ length: fileInputCount }).map((_, i) => (
                <ImageInput key={i} handleImagesChange={handleImagesChange} />
            ))}
        </fieldset>
    )
}

export default ListingFormImages;