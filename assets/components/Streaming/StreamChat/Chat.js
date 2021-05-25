import React, { Component } from 'react';
import ChatMessage from './ChatMessage.js';

class Chat extends Component {
    constructor(props) {
        super();
        this.state = {
            streamID: props.streamID
        }
    }

    render() {
        return (
            <div className="chat">
                <div className="chatMessages">
                    <ChatMessage name={'Username'} message={'This is a message'} />
                    <ChatMessage name={'Name'} message={'A message'} />
                    <ChatMessage name={'Some guy'} message={'Hey dudes'} />
                </div>
                <div className="chatInput">
                    <input></input>
                    <button>Send</button>
                </div>


            </div>

        )
    }
}

export default Chat;