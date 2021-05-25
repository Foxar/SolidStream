import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Chat from '../StreamChat/Chat';


class StreamPlayer extends Component {
    constructor(props) {
        super();
        this.state = {
            streamID: props.streamID,
            refreshing: false
        }
        this.refreshUrl = this.refreshUrl.bind(this);
        this.refreshSoon = this.refreshSoon.bind(this);

    }

    refreshUrl() {
        //If no streamIURL is given, use test stream URL
        var streamUrl = 'http://localhost:8080/'.concat(this.state.streamID).concat(".m3u8");
        if (this.state.streamID == null)
            streamUrl = "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8";
        this.setState({ streamUrl: streamUrl });
    }
    refreshSoon() {
        //Set refreshing to true in 1 second
        setTimeout(() => {
            this.setState({ refreshing: true });
        }, 1000);
        //Set refreshing to false in 2 seconds
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 2000);
    }

    componentDidMount() {
        this.refreshUrl();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ streamID: nextProps.streamID }, () => {
            this.refreshUrl();
        });
    }

    render() {
        //Render nothing if ReactPlayer's refreshing. This is to ensure full reload of the m3u8 file. 
        if (this.state.refreshing) {
            return null;
        }
        else {
            return (
                <div className="streamPlayer">
                    <ReactPlayer playing={true} muted={true} width={'75%'} height={'auto'}
                        url={this.state.streamUrl} onError={this.refreshSoon}
                    />
                    <Chat />
                </div>
            );
        }
    }
}

export default StreamPlayer;