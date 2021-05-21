import React, { Component } from 'react';
import StreamPlayer from '../StreamPlayer/StreamPlayer'
import Cookies from 'js-cookie';

class StreamPanel extends Component {
    constructor() {
        super();
        this.state = {
            streamID: null,
            errorMessage: '',
            deleteMessage: ''
        }
        this.handleStartStream = this.handleStartStream.bind(this);
        this.handleStopStream = this.handleStopStream.bind(this);
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
                    data => { this.setState({ streamID: data.id }); }
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
                    this.setState({
                        deleteMessage: 'Stream stopped!'
                    })
                );
            } else {
                this.setState({ errorMessage: "Unknown error!" });
            }
        });
    }

    render() {
        return (
            <div className="streamingPanel">
                {this.state.errorMessage && (<p className="errorMessage">{this.state.errorMessage}</p>)}
                {this.state.deleteMessage && (<p className="deleteMessage">{this.state.deleteMessage}</p>)}
                {this.state.streamID &&
                    (
                        <div className="streamingKey">
                            <p>Your stream can be started!</p>
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