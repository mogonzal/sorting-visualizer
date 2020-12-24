import React, {Component} from 'react';
import './Slice.css'

// props: width, height, color, current index, true index

export default class Slice extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='slice'></div>
        );
    }

}