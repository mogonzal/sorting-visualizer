import React, {Component} from 'react';
//import Visualizer from './Visualizer/Visualizer'
//import DropDownButton from './Button/DropDownButton'
import ImageSelectMenu from './Button/ImageSelectMenu'
import SelectMenu from './Button/SelectMenu'
//import './SortingVisualizer.css';

//state: algorithm, speed, datasize, (time?)

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        alg: 0,
        speed: 0,
        size: 0
    };
    this.algs = ["Bubble Sort", "Quick Sort", "Merge Sort"];
    this.algImages = ["https://i.imgur.com/83vTj7A.png", "data:image/png;base64,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", "https://i.imgur.com/JDlakf8.png"];
    this.speeds = [10, 100, 1000];
    this.sizes = [10, 100, 1000];
    this.algBtnRef = React.createRef();
    this.sizeBtnRef = React.createRef();
    this.speedBtnRef = React.createRef();
  }

  handleClick(e) {
    /*if (!e.target.closest(".trigger")) {
      this.algBtnRef.current.close();
      this.sizeBtnRef.current.close();
      this.speedBtnRef.current.close();
    }*/
    //check alg button
    if (!e.target.closest(".a")) {
      this.algBtnRef.current.close();
    }
    if (!e.target.closest(".b")) {
      this.sizeBtnRef.current.close();
    }
    if (!e.target.closest(".c")) {
      this.speedBtnRef.current.close();
    }
  }

  render() {
      return (
        <div className="absolute p-3 w-full h-full" onClick={(e) => this.handleClick(e)}>
          <div className="flex justify-evenly">
            <ImageSelectMenu ref={this.algBtnRef} labelText="Algorithm" trigger="a" options={this.algs} optionImages={this.algImages} defaultIndex={this.state.alg} />
            <SelectMenu ref={this.sizeBtnRef} labelText="Data Size" trigger="b" options={this.sizes} defaultIndex={this.state.size} />
            <SelectMenu ref={this.speedBtnRef} labelText="Speed" trigger="c" options={this.speeds} defaultIndex={this.state.speed} />
          </div>
          <div className="text-white">Test!</div>
        </div>
      );

  }
}