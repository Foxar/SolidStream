import React from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

export default function ChatMessage(props) {
    return (
        <div className="chatMessage">
            <Avatar src={`https://i.pravatar.cc/150?u=${props.name}`} />
            <div className="content">
                <Typography variant='subtitle2'>{props.name}</Typography>
                <Typography variant='subtitle1'>{props.message}</Typography>
            </div>
        </div>
    );
}