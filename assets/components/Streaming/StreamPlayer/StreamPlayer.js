import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Chat from '../StreamChat/Chat';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';


class StreamPlayer extends Component {
    constructor(props) {
        super();
        console.log("streamid");
        console.log(props.streamID);
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
                <Box className="streamBox">
                    <Paper square={true} elevation={4} className="streamPlayer">
                        <ReactPlayer playing={true} muted={true} width={'75%'} height={'auto'}
                            url={this.state.streamUrl} onError={this.refreshSoon}
                        />
                        <Chat />
                    </Paper>
                    <Paper className="streamInfo">
                        <Avatar className='streamerAvatar' size='large' src={`https://i.pravatar.cc/150?u='John Harpin'`} />
                        <Typography variant='h4'>John Harpin is streaming:</Typography>
                        <Typography variant='h5'>The funny bunny stream</Typography>
                    </Paper>
                </Box>
            );
        }
    }
}

export default StreamPlayer;