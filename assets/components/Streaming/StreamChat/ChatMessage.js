import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function ChatMessage(props) {
    return (
        <div className="chatMessage">
            <Typography variant='subtitle2'>{props.name}</Typography>
            <Typography variant='subtitle1'>{props.message}</Typography>
        </div>
    );
}