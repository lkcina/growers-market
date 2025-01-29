import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { Chat } from '../../types';
import NewMessageForm from '../NewMessageForm/NewMessageForm';
import { createChat, getUserChats, sendMessage } from '../../api';
import { useAuth } from '../../Context/UseAuth';
import MessageList from '../MessageList/MessageList';

interface Props {
    chat: Chat | undefined;
    listingId: number;
    setUserChats: Dispatch<SetStateAction<Chat[]>>;
}

const ListingChat: React.FC<Props> = ({ chat, listingId, setUserChats }: Props): JSX.Element => {
    const [newMessage, setNewMessage] = React.useState<string>('');
    const [serverError, setServerError] = React.useState<string | null>(null);

    const { user } = useAuth();
    const userName = user?.userName;

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
            const chatResult = await createChat(listingId);
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

    return (
        <div className="listing-chat">
            <MessageList messages={chat ? chat.messages : []} userName={userName} />
            <NewMessageForm chat={chat} onSubmit={onNewMessageSubmit} message={newMessage} handleMessageInputChange={handleMessageInputChange} />
        </div>
    )
}

export default ListingChat;