
import React, { Component } from 'react';
import ReactPlayer from 'react-player';


class PlayerPage extends Component {
    render() {
        return (
            <div className="playerPage">
                <h4>Video playing page</h4>
                <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
            </div>
        );
    }
}

export default PlayerPage;