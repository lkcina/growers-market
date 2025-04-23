import React, { useState, useEffect, FormEvent } from 'react';
import { getUserChats } from '../../api';
import { Chat, Listing } from '../../types';
import ListingList from '../../Components/ListingList/ListingList';
import './ChatsPage.css';
import { Link } from 'react-router-dom';


const ChatsPage: React.FC = () => {
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
            }
        })
    }, [])

    useEffect(() => {
        if (userChats.length > 0) {
            setListings(userChats.map(chat => chat.listing));
        }
    }, [userChats])

    const showDetails = (e: FormEvent<HTMLFormElement>) => {
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
        <div id="chats-page">
            <Link to="/market">Browse</Link>
            <ListingList listings={listings} listingDetails={listingDetails} userChats={userChats} onSelect={showDetails} setUserChats={setUserChats} />
        </div>
    );
};

export default ChatsPage;