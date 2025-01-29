import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { Chat } from '../../types';
import ListingChat from '../ListingChat/ListingChat';
import { getListingChats, getUserChats, sendMessage } from '../../api';

interface Props {
    chat: Chat;
    setUserChats: Dispatch<SetStateAction<Chat[]>>;
    listingId: number;
}

const ChatCard: React.FC<Props> = ({ chat, setUserChats, listingId }: Props): JSX.Element => {
    const [newMessage, setNewMessage] = React.useState<string>('');
    const [serverError, setServerError] = React.useState<string | null>(null);

    const handleMessageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
                getListingChats(listingId).then((chatResult) => {
                    if (typeof chatResult === "string") {
                        setServerError(chatResult);
                    } else if (Array.isArray(chatResult)) {
                        console.log(chatResult);
                        setUserChats(chatResult);
                        setNewMessage('');
                    }
                })
            }

        } else {
            return
        }
    }

    return (
        <div id={chat.id.toString()} className="chat-card">
            <h3>{chat.appUsername}</h3>
            <ListingChat chat={chat} newMessage={newMessage} handleMessageInputChange={handleMessageInputChange} onNewMessageSubmit={onNewMessageSubmit} />
        </div>
    )
}

export default ChatCard;