import React, { Component } from 'react';
import StreamPlayer from '../StreamPlayer/StreamPlayer'
import Cookies from 'js-cookie';

class StreamPanel extends Component {
    constructor() {
        super();
        this.state = {
            streamID: null,
            infoMessage: '',
            errorMessage: '',
            deleteMessage: ''
        }
        this.handleStartStream = this.handleStartStream.bind(this);
        this.handleStopStream = this.handleStopStream.bind(this);
        this.setTimedError = this.setTimedError.bind(this);
        this.setTimedInfo = this.setTimedInfo.bind(this);
        this.setTimedDeleteNotice = this.setTimedDeleteNotice.bind(this);
    }

    setTimedError(msg, time = 5000) {
        this.setState({ errorMessage: msg });
        setTimeout(() => {
            this.setState({ errorMessage: "" });
        }, time);
    }

    setTimedInfo(msg, time = 5000) {
        this.setState({ infoMessage: msg });
        setTimeout(() => {
            this.setState({ infoMessage: "" });
        }, time);
    }

    setTimedDeleteNotice(msg, time = 5000) {
        this.setState({ deleteMessage: msg });
        setTimeout(() => {
            this.setState({ deleteMessage: "" });
        }, time);
    }

    handleStartStream() {

        const responsePromise = fetch('http://localhost:8000/secureapi/createstream', {
            method: 'POST',
            headers: {
                'Authorization': 'BEARER '.concat(Cookies.get('jwt-token'))
            }
        });
        responsePromise.then(response => {
            if (response.ok) {
                this.setState({ errorMessage: "" });
                response.json().then(
                    data => {
                        this.setState({ streamID: data.id });
                        this.setTimedInfo("Your stream can be started!");
                    }
                );
            }
            else if (response.status == 401) {
                this.setState({ errorMessage: "Authorization error, please log in!" });
            } else {
                this.setState({ errorMessage: "Unknown error!" });
            }
        });
        this.forceUpdate();
    }

    handleStopStream() {
        let formData = new FormData();
        formData.append('name', this.state.streamID);
        const responsePromise = fetch('http://localhost:8000/api/deletestream', {
            method: 'POST',
            body: formData
        });

        responsePromise.then(response => {
            if (response.ok) {
                response.json().then(
                    this.setTimedDeleteNotice("Stream stopped!")
                );
            } else if (response.status == 404) {
                this.setTimedError("Stream did not yet start.");
            } else {
                this.setTimedError("Unknown error!");
            }
        });
    }

    render() {
        return (
            <div className="streamingPanel">
                {this.state.errorMessage && (<p className="errorMessage">{this.state.errorMessage}</p>)}
                {this.state.deleteMessage && (<p className="deleteMessage">{this.state.deleteMessage}</p>)}
                {this.state.infoMessage && (<p className="infoMessage">{this.state.infoMessage}</p>)}
                {this.state.streamID &&
                    (
                        <div className="streamingKey">
                            <p>Your key: {this.state.streamID}</p>
                        </div>
                    )}
                <div className="buttons">
                    <button onClick={this.handleStartStream}>Start</button>
                    <button onClick={this.handleStopStream}>Stop</button>
                </div>
                <StreamPlayer streamID={this.state.streamID} />
            </div>
        );
    }
}

export default StreamPanel;