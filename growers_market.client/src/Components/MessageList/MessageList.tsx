import React from 'react';
import { Message } from '../../types';
import MessageBlock from '../MessageBlock/MessageBlock';

interface Props {
    messages: Message[];
    userName: string | undefined;
}

const MessageList: React.FC<Props> = ({ messages, userName }: Props): JSX.Element => {

    return (
        <div id="message-list">
            {messages.length > 0 ? (
                messages.map((message, index) => {


                    return (
                        <MessageBlock key={message.id} message={message} lastMessage={index > 0 ? messages[index - 1] : null} userName={userName} />
                    );
                })
            ) : (
                <h4>No messages</h4>
            )}
        </div>
    );
}

export default MessageList;