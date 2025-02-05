import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import "./ListingDetails.css";
import { Chat, Listing } from "../../types";
import ListingChat from "../ListingChat/ListingChat";
import { useAuth } from "../../Context/UseAuth";

interface Props {
    listing: Listing;
    chat: Chat | undefined | null;
    newMessage: string;
    onNewMessageSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleMessageInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    removeChat: () => void;
}

const ListingDetails: React.FC<Props> = ({ listing, chat, newMessage, onNewMessageSubmit, handleMessageInputChange, removeChat }: Props,): JSX.Element => {
    const { isLoggedIn } = useAuth();

    return (
        <div className="listing-details">
            <div className="listing-details-properties">
                <p>Seller: {listing.appUserName}</p>
                <p>Species: {listing.species !== null ? listing.species.scientificName : "Species not specified"}</p>
                <p>Quantity: {listing.quantity}</p>
            
                <div className="listing-details-description">
                    {listing.description}
                </div>
            </div>
            {isLoggedIn() && chat !== null ? <ListingChat chat={chat} newMessage={newMessage} onNewMessageSubmit={onNewMessageSubmit} handleMessageInputChange={handleMessageInputChange} removeChat={removeChat} /> : null}
        </div>
    );
}

export default ListingDetails;