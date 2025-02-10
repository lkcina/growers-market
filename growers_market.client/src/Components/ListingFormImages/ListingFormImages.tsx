import React, { SyntheticEvent } from "react";
import ImageInput from "./ImageInput/ImageInput";
import './ListingFormImages.css';

interface Props {
    inputImages: File[];
    imageValues: (File | string)[];
    handleImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveImage: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onAddImage: (e: React.MouseEvent<HTMLButtonElement>) => void;
    fileInputCount: number;
}

const ListingFormImages: React.FC<Props> = ({ inputImages, handleImagesChange, imageValues, onRemoveImage, onAddImage, fileInputCount }: Props): JSX.Element => {
    const onImageError = (e: SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLImageElement;
        target.classList.add("image-error");
    }

    return (
        <fieldset className="listing-form-images">
            <button id="listing-images" type="button" onClick={onAddImage}>Add Images</button>
            <input type="hidden" name="ImagePaths" value={JSON.stringify(imageValues.filter(i => typeof i === "string"))} />
            {Array.from({ length: fileInputCount }).map((_, i) => (
                <ImageInput key={i} handleImagesChange={handleImagesChange} />
            ))}
            <div className="listing-images-preview">
                {imageValues.length > 5 ? <p className="exception">* Exceeded maximum of 5 images</p> : <p>* Maximum of 5 images</p>}
                <div className="preview-container">
                    {imageValues.length > 0 ? imageValues.map((image, index) => {
                        if (typeof image === "string") {
                            return (
                                <div id={index.toString()} key={index} className="image-preview">
                                    <img src={image} alt={`Listing image ${index + 1}`} onError={onImageError} />
                                    <button type="button" onClick={onRemoveImage}>X</button>
                                </div>
                            )
                        } else {
                            return (
                                <div id={index.toString()} key={index} className="image-preview">
                                    <img src={URL.createObjectURL(image)} alt={`Listing image ${index + 1}`} onError={onImageError} />
                                    <button type="button" onClick={onRemoveImage}>X</button>
                                </div>
                            )
                        }
                    }) : <h3>No Images</h3>}
                </div>
            </div>
            
        </fieldset>
    )
}

export default ListingFormImages;