import React, { MouseEvent, SyntheticEvent } from 'react';
import './ListingImages.css';
import { ListingImage } from '../../types';

interface Props {
    listingTitle: string;
    images: ListingImage[];
    imageIndex: number;
    onNextImage: (e: MouseEvent<HTMLButtonElement>) => void;
    onPreviousImage: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ListingImages: React.FC<Props> = ({ listingTitle, images, imageIndex, onNextImage, onPreviousImage }: Props): JSX.Element => {
    const onImageError = (e: SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLImageElement;
        target.classList.add("image-error");
    }

    return (
        <div className="listing-images">
            {images.length > 1 ? <button onClick={onPreviousImage}>{"<"}</button> : null}
            {images.length > 0 ? <img src={images[imageIndex].url} alt={listingTitle} onError={onImageError} style={{ objectPosition: `${images[imageIndex].positionX}% ${images[imageIndex].positionY}%` }} /> : <div>No images</div>}
            {images.length > 1 ? <button onClick={onNextImage}>{">"}</button> : null}
        </div>
    );
}

export default ListingImages;