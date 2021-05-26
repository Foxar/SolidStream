import React, { Component } from 'react';
import ChatMessage from './ChatMessage.js';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

class Chat extends Component {
    constructor(props) {
        super();
        this.state = {
            streamID: props.streamID
        }
    }

    render() {
        return (
            <Box className="chat">
                <div className="chatMessagesContainer">
                    <div className="chatMessages">
                        <ChatMessage name={'Username'} message={'This is a message'} />
                        <ChatMessage name={'Name'} message={'A message'} />
                        <ChatMessage name={'Some guy'} message={'Hey dudes'} />
                        <ChatMessage name={'Username'} message={'This is a message'} />
                        <ChatMessage name={'Name'} message={'A message'} />
                        <ChatMessage name={'Some guy'} message={'Hey dudes'} />
                        <ChatMessage name={'Username'} message={'This is a message'} />
                        <ChatMessage name={'Name'} message={'A message'} />
                        <ChatMessage name={'Some guy'} message={'Hey dudes'} />
                        <ChatMessage name={'Username'} message={'This is a message'} />
                        <ChatMessage name={'Name'} message={'A message'} />
                        <ChatMessage name={'Some guy'} message={'Hey dudes'} />
                        <ChatMessage name={'Username'} message={'This is a message'} />
                        <ChatMessage name={'Name'} message={'A message'} />
                        <ChatMessage name={'Some guy'} message={'Hey dudes'} />

                    </div>
                </div>
                <div className="chatInput">

                    <TextField className="messageInput" InputProps={{ disableUnderline: true }} placeholder="Message" />
                    <IconButton className="sendIcon"><SendIcon /></IconButton>

                </div>


            </Box>

        )
    }
}

export default Chat;