import React, {Component} from 'react';
import Slice from '../Slice/Slice'
import './Visualizer.css'

//props: datasize, width, height

export default class Visualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num_slices: 1,
            slices: [],
        };
    }

    createGrid() {
        const row = [];
        for (let i = 0; i < 20; i++) {
            const currentSlice = {
                i,
            };
            row.push(currentSlice);
        }
        this.state.slices.push(row);
    }

    render() {
        const {slices} = this.state;
        console.log(slices)
        return (
            <div className='visualizer'>
                <Slice></Slice>
            </div>
        );
    }

}