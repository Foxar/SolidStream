import React from 'react';

export default function ChatMessage(props) {
    return (
        <div className="chatMessage">
            <b>{props.name}</b>
            :
            <p>{props.message}</p>
        </div>
    );
}