import React, { useState, useEffect, FormEvent } from 'react';
import { getUserChats } from '../../api';
import { Chat, Listing } from '../../types';
import ChatList from '../../Components/ChatList/ChatList';
import ListingList from '../../Components/ListingList/ListingList';

interface Props {
}

const ChatsPage: React.FC<Props> = () => {
    const [userChats, setUserChats] = useState<Chat[]>([]);
    const [listings, setListings] = useState<Listing[]>([]);
    const [listingDetails, setListingDetails] = useState<number | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);

    useEffect(() => {
        getUserChats().then((result) => {
            if (typeof result === "string") {
                setServerError(result);
                return;
            } else if (Array.isArray(result)) {
                setUserChats(result);
                setListings(result.map(chat => chat.listing));
            }
        })
    }, [])

    const showDetails = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const input = target.elements.namedItem("listingId") as HTMLInputElement;
        const value = Number(input.value);
        if (listingDetails === value) {
            setListingDetails(null);
            return;
        }
        setListingDetails(value);
    }

    return (
        <div>
            <h1>Chats Page</h1>
            <div>
                <ListingList listings={listings} listingDetails={listingDetails} userChats={userChats} onSelect={showDetails} setUserChats={setUserChats} />
            </div>
        </div>
    );
};

export default ChatsPage;