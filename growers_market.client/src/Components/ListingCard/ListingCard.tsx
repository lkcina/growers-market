import React, { FormEvent, MouseEvent, useEffect, useState } from 'react';
import { Listing } from '../../types';
import ListingImages from '../ListingImages/ListingImages';
import './ListingCard.css';

interface Props {
    listing: Listing;
    onSelect: (e: FormEvent<HTMLFormElement>) => void;
    listingDetails: number | null;
    isAfterDetails: boolean;
}

const ListingCard: React.FC<Props> = ({ listing, onSelect, listingDetails, isAfterDetails }: Props): JSX.Element => {
    const [imageIndex, setImageIndex] = useState<number>(0);


    const onNextImage = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (listing) {
            if (imageIndex === listing.images.length - 1) {
                setImageIndex(0);
            } else {
                setImageIndex(imageIndex + 1);
            }
        }
    }

    const onPreviousImage = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (listing) {
            if (imageIndex === 0) {
                setImageIndex(listing.images.length - 1);
            } else {
                setImageIndex(imageIndex - 1);
            }
        }
    }

    

    return (
        <div id={`listing-${listing.id}`} className={listingDetails === listing.id ? "listing-card show-details" : "listing-card"} style={{ gridColumn: `${isAfterDetails ? "1 / 2" : "auto"}` }}>
            <div>
                <ListingImages listingTitle={listing.title} images={listing.images} imageIndex={imageIndex} onNextImage={onNextImage} onPreviousImage={onPreviousImage} />
                <h3>{listing.title}</h3>
                <div className="listing-asking">
                    <p>{listing.isForTrade ? "Tradable" : ""}</p>
                    <p>{listing.price > 0 ? `$${(Math.round(listing.price * 100) / 100).toFixed(2)}` : "Free"}</p>
                </div>
                <div className="listing-address">
                    <p>{listing.appUser.address.city}, {listing.appUser.address.state}</p>
                </div>
                <div className="listing-species">
                    <p>{listing.species !== null ? listing.species.commonName : "Species not specified"}</p>
                </div>
                <form className="view-listing-form" onSubmit={onSelect}>
                    <input type="hidden" name="listingId" value={listing.id.toString()} />
                    <button type="submit">View Listing</button>
                </form>
            </div>
            {listingDetails === listing.id ? <div className="details-arrow" /> : null}
        </div>
    );
}

const areEqual = (prevProps: Props, nextProps: Props) => {
    return (
        prevProps.listing.id === nextProps.listing.id &&
        prevProps.listingDetails === nextProps.listingDetails &&
        prevProps.isAfterDetails === nextProps.isAfterDetails
    );
}

export default React.memo(ListingCard, areEqual);