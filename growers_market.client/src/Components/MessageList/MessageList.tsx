import React, { useEffect, useRef } from 'react';
import { Message } from '../../types';
import MessageBlock from '../MessageBlock/MessageBlock';
import './MessageList.css';

interface Props {
    messages: Message[];
    userName: string | undefined;
}

const MessageList: React.FC<Props> = ({ messages, userName }: Props): JSX.Element => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            (messagesEndRef.current as HTMLDivElement).scrollIntoView({ block: 'nearest', inline: 'start' });
        }
    }, [messages]);

    return (
        <div className="message-list">
            {messages.length > 0 ? (
                messages.map((message, index) => {


                    return (
                        <MessageBlock key={message.id} message={message} lastMessage={index > 0 ? messages[index - 1] : null} userName={userName} />
                    );
                })
            ) : (
                <h3>No messages</h3>
            )}
            <div className="message-list-end" ref={messagesEndRef}></div>
        </div>
    );
}

export default MessageList;