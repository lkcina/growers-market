import React, { ChangeEvent, MouseEvent, SyntheticEvent, useCallback } from "react";
import ImageInput from "./ImageInput/ImageInput";
import './ListingFormImages.css';
import { useDropzone } from 'react-dropzone';
import { ListingImagePosition } from "../../types";

interface Props {
    imageValues: (File | string)[];
    handleImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveImage: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onAddImage: (e: React.MouseEvent<HTMLButtonElement>) => void;
    fileInputCount: number;
    imagePositions: ListingImagePosition[];
    startPositionImage: (e: MouseEvent<HTMLImageElement>) => void;
}

const ListingFormImages: React.FC<Props> = ({ handleImagesChange, imageValues, onRemoveImage, onAddImage, fileInputCount, imagePositions, startPositionImage }: Props): JSX.Element => {
    const onImageError = (e: SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLImageElement;
        target.classList.add("image-error");
    }
    
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const dto = new DataTransfer();
        acceptedFiles.forEach(file => dto.items.add(file));
        const listingFormImages = document.getElementsByClassName("listing-form-images")[0] as HTMLFieldSetElement;
        const input = document.createElement("input") as HTMLInputElement;
        input.type = 'file';
        input.files = dto.files;
        input.name = "UploadedImages";
        input.className = "uploaded-images";
        input.multiple = true;
        input.addEventListener('change', (e: Event) => handleImagesChange(e as unknown as ChangeEvent<HTMLInputElement>));
        listingFormImages.appendChild(input);
        const event = new Event('change', { bubbles: true });
        input.dispatchEvent(event);
    }, [handleImagesChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


    return (
        <fieldset className="listing-form-images">
            <button id="listing-images" type="button" onClick={onAddImage}>Add Images</button>
            <input type="hidden" name="ImagePaths" value={JSON.stringify(imageValues.filter(i => typeof i === "string"))} />
            {Array.from({ length: fileInputCount }).map((_, i) => (
                <ImageInput key={i} handleImagesChange={handleImagesChange} />
            ))}
            <input id="image-drop" {...getInputProps()} />
            <div className="listing-images-preview" >
                {imageValues.length > 5 ? <p className="exception">* Exceeded maximum of 5 images</p> : <p>* Maximum of 5 images</p>}
                <div className={isDragActive ? "preview-container dragging" : "preview-container"} {...getRootProps()} onClick={undefined}>
                    {imageValues.length > 0 ? imageValues.map((image, index) => {
                        if (typeof image === "string") {
                            return (
                                <div id={index.toString()} key={index} className="image-preview" onClick={(e) => e.stopPropagation()}>
                                    <img src={image} alt={`Listing image ${index + 1}`} draggable={false} onMouseDown={startPositionImage} onError={onImageError} style={{objectPosition: `${imagePositions[index].positionX}% ${imagePositions[index].positionY}%`}} />
                                    <button className="delete-img" type="button" onClick={onRemoveImage}>X</button>
                                </div>
                            )
                        } else {
                            return (
                                <div id={index.toString()} key={index} className="image-preview" onClick={(e) => e.stopPropagation() }>
                                    <img src={URL.createObjectURL(image)} draggable={false} alt={`Listing image ${index + 1}`} onMouseDown={startPositionImage} onError={onImageError} style={{ objectPosition: `${imagePositions[index].positionX}% ${imagePositions[index].positionY}%` }} />
                                    <button className="delete-img" type="button" onClick={onRemoveImage}>X</button>
                                </div>
                            )
                        }
                    }) : <p>Drag and drop images here</p>}
                </div>
            </div>
            
        </fieldset>
    )
}

export default ListingFormImages;