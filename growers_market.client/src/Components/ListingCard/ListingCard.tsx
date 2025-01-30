import React, { ChangeEvent, Dispatch, FormEvent, MouseEvent, SetStateAction, useState } from 'react';
import { Chat, Listing } from '../../types';
import ListingImages from '../ListingImages/ListingImages';
import ListingDetails from '../ListingDetails/ListingDetails';
import { createChat, deleteChat, getUserChats, sendMessage } from '../../api';

interface Props {
    listing: Listing;
    onSelect: (e: FormEvent<HTMLFormElement>) => void;
    listingDetails: number | null;
    chat: Chat | undefined | null;
    setUserChats: Dispatch<SetStateAction<Chat[]>>;
}

const ListingCard: React.FC<Props> = ({ listing, onSelect, listingDetails, chat, setUserChats }: Props): JSX.Element => {
    const [imageIndex, setImageIndex] = useState<number>(0);
    const [newMessage, setNewMessage] = React.useState<string>('');
    const [serverError, setServerError] = React.useState<string | null>(null);

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

    const handleMessageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(newMessage);
        setNewMessage(e.target.value);
    }

    const onNewMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const newMessageInput = target.elements.namedItem("newMessage") as HTMLInputElement;
        const message = newMessageInput.value;
        if (message === '') {
            return;
        }

        const chatIdInput = target.elements.namedItem("chatId") as HTMLInputElement;
        const chatId = chatIdInput.value === "null" ? null : Number(chatIdInput.value);

        if (chatId !== null) {
            const result = await sendMessage(chatId, message);
            if (typeof result === "string") {
                setServerError(result);
                return
            } else {
                const newChats = await getUserChats();
                if (typeof newChats === "string") {
                    setServerError(newChats);
                    return
                } else if (Array.isArray(newChats)) {
                    setUserChats(newChats);
                    setNewMessage('');
                }
            }

        } else {
            const chatResult = await createChat(listing.id);
            console.log(chatResult);
            if (typeof chatResult === "string") {
                setServerError(chatResult);
                return
            } else {
                const result = await sendMessage(chatResult.data.id, message);
                if (typeof result === "string") {
                    setServerError(result);
                    return
                } else {
                    console.log(result);
                    const newChats = await getUserChats();
                    if (typeof newChats === "string") {
                        setServerError(newChats);
                        return
                    } else if (Array.isArray(newChats)) {
                        setUserChats(newChats);
                        setNewMessage('');
                    }
                }
            }
        }
    }

    const removeChat = async () => {
        if (window.confirm("Are you sure you want to delete this chat?")) {
            const result = await deleteChat(chat.id);
            if (typeof result === "string") {
                setServerError(result);
                return
            } else {
                const newChats = await getUserChats();
                if (typeof newChats === "string") {
                    setServerError(newChats);
                    return
                } else if (Array.isArray(newChats)) {
                    setUserChats(newChats);
                }
            }
        } else {
            return;
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
                <ListingDetails listing={listing} chat={chat} newMessage={newMessage} onNewMessageSubmit={onNewMessageSubmit} handleMessageInputChange={handleMessageInputChange} removeChat={removeChat} />
            ) : null}
        </div>
    );
}

export default ListingCard;