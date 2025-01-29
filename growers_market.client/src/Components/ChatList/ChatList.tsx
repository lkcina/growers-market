import React from 'react';
import { Chat } from '../../types';
import ChatCard from '../ChatCard/ChatCard';

interface Props {
    chats: Chat[];
    isSeller: boolean;
}

const ChatList: React.FC<Props> = ({ chats, isSeller }: Props): JSX.Element => {
    return (
        <div className="chat-list">
            {chats.length > 0 ? (
                chats.map((chat) => {
                    return (
                        <ChatCard key={chat.id} chat={chat} isSeller={isSeller} />
                    )
                })
            ) : (
                <h2>No chats found</h2>
            )}
        </div>
    )
}

export default ChatList;