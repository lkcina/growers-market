import React, { MouseEvent, SyntheticEvent, useRef } from 'react';
import './ListingImages.css';
import { ListingImage } from '../../types';
import { useSwipeable } from 'react-swipeable';

interface Props {
    listingTitle: string;
    images: ListingImage[];
    imageIndex: number;
    onNextImage: (e: MouseEvent<HTMLButtonElement>) => void;
    onPreviousImage: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ListingImages: React.FC<Props> = ({ listingTitle, images, imageIndex, onNextImage, onPreviousImage }: Props): JSX.Element => {
    const nextButtonRef = useRef<HTMLButtonElement>(null);
    const previousButtonRef = useRef<HTMLButtonElement>(null);
    const onImageError = (e: SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLImageElement;
        target.classList.add("image-error");
    }

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            if (previousButtonRef.current && images.length > 1) {
                previousButtonRef.current.click();
            }
        },
        onSwipedRight: () => {
            if (nextButtonRef.current && images.length > 1) {
                nextButtonRef.current.click();
            }
        },
        trackMouse: true,
        preventScrollOnSwipe: true,
    });

    return (
        <div className="listing-images" {...swipeHandlers}>
            {images.length > 1 ? <button ref={previousButtonRef} onClick={onPreviousImage}>{"<"}</button> : null}
            {images.length > 0 ? <img src={images[imageIndex].url} alt={listingTitle} onError={onImageError} style={{ objectPosition: `${images[imageIndex].positionX}% ${images[imageIndex].positionY}%` }} /> : <div>No images</div>}
            {images.length > 1 ? <button ref={nextButtonRef} onClick={onNextImage}>{">"}</button> : null}
        </div>
    );
}

export default ListingImages;