import React, { Dispatch, FormEvent, MouseEvent, SetStateAction } from 'react';
import { Chat, Listing } from '../../types';
import ListingCard from '../ListingCard/ListingCard';
import './ListingList.css';

interface Props {
    listings: Listing[];
    onSelect: (e: FormEvent<HTMLFormElement>) => void;
    listingDetails: number | null;
    userChats: Chat[] | null;
    setUserChats: Dispatch<SetStateAction<Chat[]>> | null;
}

const ListingList: React.FC<Props> = ({ listings, onSelect, listingDetails, userChats, setUserChats }): JSX.Element => {

    return (
        <div className="listing-list">
            {listings.length > 0 ? (
                listings.map((listing) => {
                    return <ListingCard key={listing.id} listing={listing} onSelect={onSelect} listingDetails={listingDetails} chat={userChats ? userChats.find((chat) => chat.listing.id === listing.id) : null} setUserChats={setUserChats} />
                })
            ) : (
                <h2>No results found</h2>
            )}
        </div>
    );
}

export default ListingList;