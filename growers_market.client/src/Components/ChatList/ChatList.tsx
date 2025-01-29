import React, { Dispatch, SetStateAction } from 'react';
import { Chat } from '../../types';
import ChatCard from '../ChatCard/ChatCard';

interface Props {
    chats: Chat[];
    setUserChats: Dispatch<SetStateAction<Chat[]>>;
}

const ChatList: React.FC<Props> = ({ chats, setUserChats }: Props): JSX.Element => {
    return (
        <div className="chat-list">
            {chats.length > 0 ? (
                chats.map((chat) => {
                    return (
                        <ChatCard key={chat.id} chat={chat} setUserChats={setUserChats} />
                    )
                })
            ) : (
                <h2>No chats found</h2>
            )}
        </div>
    )
}

export default ChatList;