import React, { ChangeEvent, FormEvent } from 'react';
import { Chat } from '../../types';
import NewMessageForm from '../NewMessageForm/NewMessageForm';
import { useAuth } from '../../Context/UseAuth';
import MessageList from '../MessageList/MessageList';
import './ListingChat.css';

interface Props {
    chat: Chat | null;
    newMessage: string;
    onNewMessageSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleMessageInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    removeChat: () => void;
}

const ListingChat: React.FC<Props> = ({ chat, newMessage, onNewMessageSubmit, handleMessageInputChange, removeChat }: Props): JSX.Element => {
    

    const { user } = useAuth();
    const userName = user?.userName;

    

    

    return (
        <div className="listing-chat">
            {chat ? <button className="del-chat-btn" onClick={removeChat}>Delete Chat</button> : null}
            <MessageList messages={chat ? chat.messages : []} userName={userName} />
            <NewMessageForm chat={chat} onSubmit={onNewMessageSubmit} message={newMessage} handleMessageInputChange={handleMessageInputChange} />
        </div>
    )
}

export default ListingChat;