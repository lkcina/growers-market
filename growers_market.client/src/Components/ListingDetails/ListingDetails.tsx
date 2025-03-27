import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import "./ListingDetails.css";
import { Chat, Listing } from "../../types";
import ListingChat from "../ListingChat/ListingChat";
import { useAuth } from "../../Context/UseAuth";
import { createChat, deleteChat, getUserChats, sendMessage } from "../../api";

interface Props {
    listing: Listing;
    chat: Chat | null | undefined;
    columns: number;
    listingColumn: number;
    setUserChats: Dispatch<SetStateAction<Chat[]>> | null;
    listingId: number;
}

const ListingDetails: React.FC<Props> = ({ listing, chat, columns, listingColumn, setUserChats, listingId }: Props,): JSX.Element => {
    const { isLoggedIn } = useAuth();
    const [newMessage, setNewMessage] = useState<string>('');
    const [serverError, setServerError] = React.useState<string | null>(null);

    console.log(chat)

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
                } else if (Array.isArray(newChats) && setUserChats !== null) {
                    setUserChats(newChats);
                    setNewMessage('');
                    newMessageInput.rows = 1;
                }
            }

        } else {
            const chatResult = await createChat(listingId);
            console.log(chatResult);
            if (typeof chatResult === "string") {
                setServerError(chatResult);
                return
            } else {
                const result = await sendMessage(chatResult.data.id, message);
                if (typeof result === "string" && setUserChats !== null) {
                    setServerError(result);
                    return
                } else {
                    console.log(result);
                    const newChats = await getUserChats();
                    if (typeof newChats === "string") {
                        setServerError(newChats);
                        return
                    } else if (Array.isArray(newChats) && setUserChats !== null) {
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
        if (window.confirm("Are you sure you want to delete this chat?") && chat !== null && chat !== undefined) {
            const result = await deleteChat(chat.id);
            if (typeof result === "string") {
                setServerError(result);
                return
            } else {
                const newChats = await getUserChats();
                if (typeof newChats === "string") {
                    setServerError(newChats);
                    return
                } else if (Array.isArray(newChats) && setUserChats !== null) {
                    setUserChats(newChats);
                }
            }
        } else {
            return;
        }
    }

    return (
        <div className="listing-details" style={{ gridColumn: `${columns <= 2 ? "1 / -1" : listingColumn === columns ? "-3 / span 2" : `${listingColumn} / span 2`}`, left: `${columns === 1 ? "-12px" : listingColumn !== columns && listingColumn !== 1 ? "-118px" : "0"}`, flexDirection: `${columns === 1 ? "column" : "row"}` }} >
            <div className="listing-details-properties">
                <p>Seller: {listing.appUserName}</p>
                <p>Species: {listing.species !== null ? listing.species.scientificName : "Species not specified"}</p>
                <p>Quantity: {listing.quantity}</p>
            
                <div className="listing-details-description">
                    {listing.description}
                </div>
            </div>
            {isLoggedIn() ? <ListingChat chat={chat} newMessage={newMessage} onNewMessageSubmit={onNewMessageSubmit} handleMessageInputChange={handleMessageInputChange} removeChat={removeChat} /> : null}
        </div>
    );
}

export default ListingDetails;