import React from 'react';
import { Message } from '../../types';

interface Props {
    message: Message;
    lastMessage: Message | null;
    userName: string | undefined;
}

const MessageBlock: React.FC<Props> = ({ message, lastMessage, userName }: Props): JSX.Element => {
    const messageYear = message.createdAt.getFullYear();
    const messageMonth = message.createdAt.getMonth();
    const messageDay = message.createdAt.getDate();
    const messageHour = message.createdAt.getHours();
    const messageMinute = message.createdAt.getMinutes();
    const messageDayOfWeek = message.createdAt.getDay();

    const hours = messageHour > 12 ? messageHour - 12 : messageHour === 0 ? 12 : messageHour;
    const amPm = messageHour >= 12 ? "PM" : "AM";

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const daysOfWeek = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    const currentYear = new Date().getFullYear();

    const lastMessageYear = lastMessage ? lastMessage.createdAt.getFullYear() : null;
    const lastMessageMonth = lastMessage ? lastMessage.createdAt.getMonth() : null;
    const lastMessageDay = lastMessage ? lastMessage.createdAt.getDate() : null;

    const showDate = () => {
        if (lastMessage && messageYear === lastMessageYear && messageMonth === lastMessageMonth && messageDay === lastMessageDay) {
            return false;
        } else {
            return true;
        }
    }

    return (
        <div className={`message-block ${message.appUsername === userName ? "sent" : "received"}`}>
            {showDate() ? <h4>{daysOfWeek[messageDayOfWeek]}, {months[messageMonth]} {messageDay}{messageYear !== currentYear ? `, ${currentYear}` : ""}</h4> : null}
            <div className="message-content">
                <p>{message.content}</p>
                <span>{hours}:{messageMinute < 10 ? `0${messageMinute}` : messageMinute} {amPm}</span>
            </div>
        </div>
    )
}

export default MessageBlock;