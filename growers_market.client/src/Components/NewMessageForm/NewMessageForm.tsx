import React from 'react';
import { Chat } from '../../types';
import './NewMessageForm.css';

interface Props {
    chat: Chat | null;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    message: string;
    handleMessageInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const NewMessageForm: React.FC<Props> = ({ chat, onSubmit, message, handleMessageInputChange }: Props): JSX.Element => {
    return (
        <form className="new-message-form" onSubmit={onSubmit}>
            <input type="hidden" name="chatId" value={chat ? chat.id : "null" } />
            <textarea onChange={handleMessageInputChange} value={message} required name="newMessage" rows={1} placeholder="Enter Message"/>
            <button type="submit">S</button>
        </form>
    )
}


export default NewMessageForm;