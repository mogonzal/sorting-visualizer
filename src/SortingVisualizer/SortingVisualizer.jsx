import React, {Component} from "react";
import Visualizer from "./Visualizer/Visualizer"
import ImageSelectMenu from "./Menus/ImageSelectMenu"
import SelectMenu from "./Menus/SelectMenu"

/*
  The main Component taking up the entirety of the page. Stores information for the various
  options, names, images, etc. as well as references to its children components.
*/
export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.algOptions = ["Bubble Sort", "Quick Sort", "Merge Sort"];
    this.algOptionImages = ["https://i.imgur.com/83vTj7A.png", "https://i.imgur.com/VuHhqSu.png", "https://i.imgur.com/LEASD31.png"];
    this.delayOptions = [10, 50, 100, 500];
    this.sizeOptions = [10, 50, 100, 500];
    this.algMenuRef = React.createRef();
    this.sizeMenuRef = React.createRef();
    this.delayMenuRef = React.createRef();
    this.visRef = React.createRef();
  }

  /*
    Runs each time the user clicks on the page. Checks if the click was on each of the option
    menus and if not it closes them. Makes the user experience much smoother so that they
    don't have to open and close each menu every single time.
  */
  closeMenusIfApplicable(e) {
    if (!e.target.closest(".algMenu")) {
      this.algMenuRef.current.setState({isOpen: false});
    }
    if (!e.target.closest(".sizeMenu")) {
      this.sizeMenuRef.current.setState({isOpen: false});
    }
    if (!e.target.closest(".delayMenu")) {
      this.delayMenuRef.current.setState({isOpen: false});
    }
  }

  /*
    Runs each time the user clicks on the "Randomize" button. Since the visualizer is responsible
    for randomizing itself when needed, this simply checks the number of bars to randomize with
    and lets the visualizer do the rest of the work.
  */
  randomizeVisualizer() {
    setTimeout(() => {
      const numBars = this.sizeOptions[this.sizeMenuRef.current.state.selected];
      this.visRef.current.randomize(numBars);
    }, 0);
  }

  /*
    Runs each time the user clicks on the "Simulate" button. Since the visualizer is responsible
    for animating itself, this will check the requested step time and pass it on to the
    visualizer to do the rest.
  */
  simulateSort() {
    const alg = this.algMenuRef.current.state.selected;
    const delay = this.delayOptions[this.delayMenuRef.current.state.selected];

    if (alg === 0) { // Bubble Sort  
      this.visRef.current.animateBubbleSort(delay);
    }
    else if (alg === 1) { // Quick Sort
      this.visRef.current.animateQuickSort(delay);
    }
    else if (alg === 2) { // Merge Sort
      this.visRef.current.animateMergeSort(delay);
    }
  }

  /*
    Runs each time the props or state of this component changes (which is never),
    so it is essentially responsible for setting up the initial look of the page,
    with the following structure:

    -----------------------------------------------------------------------------
    |      [alg menu]  [size menu]  [delay menu]  [randomize]  [simulate]       |
    -----------------------------------------------------------------------------
    |                                                                           |
    |                                                                           |
    |                                                                           |
    |                               visualizer                                  |
    |                                                                           |
    |                                                                           |
    ----------------------------------------------------------------------------|
  */
  render() {
      return (
        <div className="absolute w-full h-full bg-grey-50" onClick={(e) => this.closeMenusIfApplicable(e)}>
          <div className="bg-blue-50 pt-8 h-1/6 shadow-md space-y-6 rounded-b-lg">
            <div className="flex justify-evenly self-center">
              <ImageSelectMenu ref={this.algMenuRef} label="Algorithm" trigger="algMenu" options={this.algOptions} suffix="" optionImages={this.algOptionImages} defaultIdx={0} />
              <SelectMenu ref={this.sizeMenuRef} label="Data Size" trigger="sizeMenu" options={this.sizeOptions} suffix="" defaultIdx={0} />
              <SelectMenu ref={this.delayMenuRef} label="Step Time" trigger="delayMenu" options={this.delayOptions} suffix="ms" defaultIdx={0} />
              <div className="mt-1">
                <label id="listbox-label" className="block text-sm font-medium text-gray-700 tracking-wider select-none opacity-0">
                  Easter
                </label>
                <button onClick={() => this.randomizeVisualizer()} type="button" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" className="relative w-48 h-10 bg-white hover:bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 text-left cursor-pointer focus:outline-none sm:text-sm">
                  <span className="relative flex justify-center items-center font-medium ">
                    <span className="relative block truncate">
                      Randomize
                    </span>
                  </span>
                </button>
              </div>
              <div className="mt-1">
                <label id="listbox-label" className="block text-sm font-medium text-gray-700 tracking-wider select-none opacity-0">
                  egg
                </label>
                <button onClick={() => this.simulateSort()} type="button" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" className="relative w-48 h-10 bg-white hover:bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 text-left cursor-pointer focus:outline-none sm:text-sm">
                  <span className="relative flex justify-center items-center font-medium select-none">
                    <span id="progressBar" className="absolute bg-green-100 rounded-md h-8 w-0 select-none"></span>
                    <span className="relative block truncate">
                      Simulate
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex h-5/6 items-end justify-center" style={{paddingBottom: `${window.innerHeight/12}px`}}>
            <Visualizer ref={this.visRef} className="z-0" numBars={this.sizeOptions[0]} />
          </div>
        </div>
      );

  }
}