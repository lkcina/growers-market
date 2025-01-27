import React, { MouseEvent } from 'react';

interface Props {
    listingTitle: string;
    images: string[];
    imageIndex: number;
    onNextImage: (e: MouseEvent<HTMLButtonElement>) => void;
    onPreviousImage: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ListingImages: React.FC<Props> = ({ listingTitle, images, imageIndex, onNextImage, onPreviousImage }: Props): JSX.Element => {
    return (
        <div className="listing-images">
            {images.length > 1 ? <button onClick={onPreviousImage}>{"<"}</button> : null}
            {images.length > 0 ? <img src={images[imageIndex]} alt={listingTitle} /> : <div>No images</div>}
            {images.length > 1 ? <button onClick={onNextImage}>{">"}</button> : null}
        </div>
    );
}

export default ListingImages;