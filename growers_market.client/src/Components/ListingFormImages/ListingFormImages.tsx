import React from "react";

interface Props {
    listingImages: FileList | null;
    imageValues: (File | string)[];
    handleImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ListingFormImages: React.FC<Props> = ({ listingImages, handleImagesChange, imageValues }: Props): JSX.Element => {
    return (
        <fieldset>
            <div id="listing-images-preview">
                {imageValues.map((image, index) => {
                    return typeof image === "string" ?
                        <img key={index} src={image} alt={`Listing image ${index + 1}`} /> :
                        <img key={index} src={URL.createObjectURL(image)} alt={`Listing image ${index + 1}`} />
                })}
            </div>
            <input type="hidden" name="ImagePaths" value={JSON.stringify(imageValues.filter(i => typeof i === "string"))} />
            <label htmlFor="listing-images">Images</label>
            <input id="listing-images" type="file" name="UploadedImages" multiple  onChange={handleImagesChange} />
        </fieldset>
    )
}

export default ListingFormImages;