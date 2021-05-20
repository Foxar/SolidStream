
import React, { Component } from 'react';
import StreamPlayer from '../Streaming/StreamPlayer/StreamPlayer';

class PlayerPage extends Component {
    render() {
        return (
            <div className="playerPage">
                <h4>Video playing paage</h4>
                <StreamPlayer />
            </div>
        );
    }
}

export default PlayerPage;