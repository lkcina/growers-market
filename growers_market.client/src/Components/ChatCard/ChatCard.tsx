import React from 'react';
import { Chat } from '../../types';

interface Props {
    chat: Chat;
    isSeller: boolean;
}

const ChatCard: React.FC<Props> = ({ chat, isSeller }: Props): JSX.Element => {

    return (
        <div id={chat.id.toString()} className="chat-card">
            <h2>{chat.listing.title}</h2>
            <h3>{isSeller ? chat.appUsername : chat.listing.appUsername}</h3>
            <div className="message-box">
                MESSAGES!
            </div>
        </div>
    )
}

export default ChatCard;