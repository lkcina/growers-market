import React, { Dispatch, FormEvent, MouseEvent, SetStateAction } from 'react';
import { Chat, Listing } from '../../types';
import ListingImages from '../ListingImages/ListingImages';
import ListingDetails from '../ListingDetails/ListingDetails';

interface Props {
    listing: Listing;
    onSelect: (e: FormEvent<HTMLFormElement>) => void;
    listingDetails: number | null;
    chat: Chat | undefined | null;
    setUserChats: Dispatch<SetStateAction<Chat[]>>;
}

const ListingCard: React.FC<Props> = ({ listing, onSelect, listingDetails, chat, setUserChats }: Props): JSX.Element => {
    const [imageIndex, setImageIndex] = React.useState(0);

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
        <div id={listing.id.toString()} className="listing-card">
            <ListingImages listingTitle={listing.title} images={listing.images} imageIndex={imageIndex} onNextImage={onNextImage} onPreviousImage={onPreviousImage} />
            <h2>{listing.title}</h2>
            <div className="listing-asking">
                <p>{listing.isForTrade ? "Tradable" : ""}</p>
                <p>{listing.price > 0 ? `$${(Math.round(listing.price * 100) / 100).toFixed(2)}` : "Free"}</p>
            </div>
            <div className="listing-species">
                <p>{listing.species.commonName}</p>
                <p>{listing.species.scientificName[0]}</p>
            </div>
            <form onSubmit={onSelect}>
                <input type="hidden" name="listingId" value={listing.id.toString()} />
                <button type="submit">View Listing</button>
            </form>
            {listingDetails === listing.id ? (
                <ListingDetails listing={listing} chat={chat} setUserChats={setUserChats} />
            ) : null}
        </div>
    );
}

export default ListingCard;