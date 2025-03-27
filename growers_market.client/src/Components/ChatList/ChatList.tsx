import React, { Dispatch, SetStateAction } from 'react';
import { Chat } from '../../types';
import ChatCard from '../ChatCard/ChatCard';
import './ChatList.css';

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
                <h3>No chats found</h3>
            )}
        </div>
    )
}

export default ChatList;