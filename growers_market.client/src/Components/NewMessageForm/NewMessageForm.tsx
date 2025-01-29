import React from 'react';
import { Chat } from '../../types';

interface Props {
    chat: Chat | undefined;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    message: string;
    handleMessageInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NewMessageForm: React.FC<Props> = ({ chat, onSubmit, message, handleMessageInputChange }: Props): JSX.Element => {
    return (
        <form onSubmit={onSubmit}>
            <input type="hidden" name="chatId" value={chat ? chat.id : "null" } />
            <input type="text" onChange={handleMessageInputChange} value={message} required name="newMessage" placeholder="Enter Message"/>
            <button type="submit">Send</button>
        </form>
    )
}


export default NewMessageForm;