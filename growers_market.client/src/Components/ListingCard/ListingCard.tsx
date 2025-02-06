import React, { ChangeEvent, Dispatch, FormEvent, MouseEvent, SetStateAction, useState } from 'react';
import { Chat, Listing } from '../../types';
import ListingImages from '../ListingImages/ListingImages';
import ListingDetails from '../ListingDetails/ListingDetails';
import { createChat, deleteChat, getUserChats, sendMessage } from '../../api';
import './ListingCard.css';

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

    const handleMessageInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {  
        e.target.rows = 1;
        const { scrollHeight, clientHeight } = e.target;
        console.log(scrollHeight, clientHeight);
        if (scrollHeight > clientHeight) {  
            e.target.rows += Math.floor((scrollHeight - clientHeight) / 16);
            e.target.style.overflowY = "hidden";
            if (e.target.rows > 8) {
                e.target.rows = 8;
                e.target.style.overflowY = "auto";
            }
        }
        setNewMessage(e.target.value);  
    }

    const onNewMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const newMessageInput = target.elements.namedItem("newMessage") as HTMLTextAreaElement;
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
                    newMessageInput.rows = 1;
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
                        const messageList = target.parentElement?.querySelector(".message-list");
                        if (messageList) {
                            messageList.scrollTop = messageList.scrollHeight + newMessageInput.rows * 16;
                        }
                        newMessageInput.rows = 1;
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
        <div id={listing.id.toString()} className={listingDetails === listing.id ? "listing-card show-details" : "listing-card"}>
            <div>
                <ListingImages listingTitle={listing.title} images={listing.images} imageIndex={imageIndex} onNextImage={onNextImage} onPreviousImage={onPreviousImage} />
                <h3>{listing.title}</h3>
                <div className="listing-asking">
                    <p>{listing.isForTrade ? "Tradable" : ""}</p>
                    <p>{listing.price > 0 ? `$${(Math.round(listing.price * 100) / 100).toFixed(2)}` : "Free"}</p>
                </div>
                <div className="listing-species">
                    <p>{listing.species !== null ? listing.species.commonName : "Species not specified"}</p>
                </div>
                <form className="view-listing-form" onSubmit={onSelect}>
                    <input type="hidden" name="listingId" value={listing.id.toString()} />
                    <button type="submit">View Listing</button>
                </form>
            </div>
            {listingDetails === listing.id ? (
                <ListingDetails listing={listing} chat={chat} newMessage={newMessage} onNewMessageSubmit={onNewMessageSubmit} handleMessageInputChange={handleMessageInputChange} removeChat={removeChat} />
            ) : null}
        </div>
    );
}

export default ListingCard;