import React, { Dispatch, SetStateAction } from 'react';
import { Chat } from '../../types';
import ChatCard from '../ChatCard/ChatCard';

interface Props {
    chats: Chat[];
    setUserChats: Dispatch<SetStateAction<Chat[]>>;
    listingId: number;
}

const ChatList: React.FC<Props> = ({ chats, setUserChats, listingId }: Props): JSX.Element => {
    return (
        <div className="chat-list">
            {chats.length > 0 ? (
                chats.map((chat) => {
                    return (
                        <ChatCard key={chat.id} chat={chat} setUserChats={setUserChats} listingId={listingId} />
                    )
                })
            ) : (
                <h2>No chats found</h2>
            )}
        </div>
    )
}

export default ChatList;