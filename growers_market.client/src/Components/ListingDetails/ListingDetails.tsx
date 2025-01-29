import React, { Dispatch, SetStateAction } from "react";
import "./ListingDetails.css";
import { Chat, Listing } from "../../types";
import ListingChat from "../ListingChat/ListingChat";
import { useAuth } from "../../Context/UseAuth";

interface Props {
    listing: Listing;
    chat: Chat | undefined;
    setUserChats: Dispatch<SetStateAction<Chat[]>>;
}

const ListingDetails: React.FC<Props> = ({ listing, chat, setUserChats }: Props,): JSX.Element => {
    const { isLoggedIn } = useAuth();

    return (
        <div className="listing-details">
            <div className="species-details-properties">
                <p>Seller: {listing.appUserName}</p>
                <p>Quantity: {listing.quantity}</p>
            </div>
            <div className="listing-details-description">
                {listing.description}
            </div>
            {isLoggedIn() ? <ListingChat chat={chat} listingId={listing.id} setUserChats={setUserChats} /> : null}
        </div>
    );
}

export default ListingDetails;