import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { Chat } from '../../types';
import ListingChat from '../ListingChat/ListingChat';
import { deleteChat, getListingChats, sendMessage } from '../../api';
import './ChatCard.css';

interface Props {
    chat: Chat;
    setUserChats: Dispatch<SetStateAction<Chat[]>>;
}

const ChatCard: React.FC<Props> = ({ chat, setUserChats }: Props): JSX.Element => {
    const [newMessage, setNewMessage] = React.useState<string>('');
    const [serverError, setServerError] = React.useState<string | null>(null);

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
                getListingChats(chat.listing.id).then((chatResult) => {
                    if (typeof chatResult === "string") {
                        setServerError(chatResult);
                    } else if (Array.isArray(chatResult)) {
                        console.log(chatResult);
                        setUserChats(chatResult);
                        setNewMessage('');
                        newMessageInput.rows = 1;
                    }
                })
            }

        } else {
            return
        }
    }

    const removeChat = async () => {
        if (window.confirm("Are you sure you want to delete this chat?")) {
            const result = await deleteChat(chat.id);
            if (typeof result === "string") {
                setServerError(result);
                return
            } else {
                const newChats = await getListingChats(chat.listing.id);
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
        <div id={chat.id.toString()} className="chat-card">
            <h3>{chat.appUsername}</h3>
            <div className="chat-container">
                <ListingChat chat={chat} newMessage={newMessage} handleMessageInputChange={handleMessageInputChange} onNewMessageSubmit={onNewMessageSubmit} removeChat={removeChat} />
            </div>
        </div>
    )
}

export default ChatCard;