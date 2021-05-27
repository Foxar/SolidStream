
import { Typography } from '@material-ui/core';
import React, { Component } from 'react';
import StreamPlayer from '../Streaming/StreamPlayer/StreamPlayer';

class PlayerPage extends Component {
    constructor() {
        super();
        this.state = {
            streamID: null,
            errorMessage: '',
            loaded: false
        }
    }
    componentDidMount() {

        const { match: { params } } = this.props;

        if (params.id !== 'test') {
            let requestData = new FormData();
            requestData.append('name', params.id);
            const responsePromise = fetch('http://localhost:8000/api/checkstream', {
                method: 'POST',
                body: requestData
            });
            responsePromise.then(response => {
                if (response.ok) {
                    this.setState({
                        streamID: params.id,
                        loaded: true
                    });
                } else {
                    this.setState({
                        errorMessage: "Failed to load the stream."
                    });
                }
            })
        } else {
            this.setState({
                loaded: true
            })
        }

    }
    render() {
        return (
            <div className="playerPage">
                {this.state.errorMessage && (<p className="errorMessage">{this.state.errorMessage}</p>)}
                {this.state.loaded ? <StreamPlayer streamID={this.state.streamID} /> : <h5>Loading...</h5>}
            </div>
        );
    }
}

export default PlayerPage;