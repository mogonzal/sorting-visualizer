import React, {Component} from "react";
import * as Misc from "../Functions/Misc"
import * as Algs from "../Functions/SortingAlgs"

/* 
  The secondary Component on the bottom portion of the page. Stores the heights of bars
  used to visualize each algorithm in the state (as it is needed for rendering), as well
  as the IDs for any queued animations (in case they need to be stopped should a sim or
  randomization be stopped early).
*/
export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barHeights: [],
    }
    this.timeoutIDs = [];
  }
  
  /*
    Automatically randomizes the bars when this component first appears on the page.
  */
  componentDidMount() {
    this.randomize(this.props.numBars);
  }

  /*
    Randomizes the bars to some height between 1 and the maximum height of this Component
    (with some vertical padding taken into account).
  */
  randomize(numBars) {
    // *Very Important!* Stops all queued animations before re-randomizing everything
    this.clearAnimations();

    let list = Array(numBars).fill(0);
    this.setState({barHeights: list});

    // Shuffle the indices up (creates the "random" effect of which bars are chosen)
    let indices = [];
    list.map((item, idx) => indices.push(idx));
    Misc.shuffle(indices);
    
    const maxHeight = (window.innerHeight * 5/6) * 0.8 // 0.8 is for 10% y-padding
    const delay = 1000 / numBars; // Takes 1s total regardless of chosen delay
    const bars = document.getElementsByClassName("visBar");

    // For each index, set height of that bar to a random number from [1, maxHeight]
    indices.map((item, idx) => {
      list[item] = Misc.randomInt(5, maxHeight);
      this.timeoutIDs.push(setTimeout(() => {
        bars[item].style.height = `${list[item]}px`;
      }, idx * delay));
    });
    
    // Update barHeights array to reflect the new random values
    this.timeoutIDs.push(setTimeout(() => {
      this.setState({barHeights: list});
    }, numBars * delay));
  }
  
  /*
    Called each time the visualizer randomizes or simulates in order to prevent
    previously-queued animations from interfering with the new ones.
  */
  clearAnimations() {
    // Clear all queued changes
    this.timeoutIDs.map((item) => clearTimeout(item));
    this.timeoutIDs = [];

    // Set all bars back to default color and revert progress bar back to zero
    const bars = document.getElementsByClassName("visBar");
    for (let i = 0; i < this.state.barHeights.length; i++) {
      bars[i].style.height = `${this.state.barHeights[i]}px`;
      bars[i].style.background = "linear-gradient(#bfdbfe, #60a5fa)";
    }
    document.getElementById("progressBar").style.width = "0px";
  }

  /*
    Performs a bubble sort on the barHeights list. Takes the resulting swaps
    and queues the relevant animations repersenting each swap to the bars.
  */
  animateBubbleSort(delay) {
    this.clearAnimations();
    
    const bars = document.getElementsByClassName("visBar");
    const origList = this.state.barHeights.slice();

    // Returns the new list as element 0 and the list of swaps as element 1
    const result = Algs.getBubbleSortAnimations(origList);
    const newList = result[0];
    const swaps = result[1];

    // For each swap, set the relevant bars to a red color, then swap them,
    // then return them to the original color.
    for (let i = 0; i < swaps.length; i++) {
      const b1 = swaps[i][0];
      const b2 = swaps[i][1];

      // Make both bars red
      this.timeoutIDs.push(setTimeout(() => {
        bars[b1].style.background = "linear-gradient(#fecaca, #f87171)";
        bars[b2].style.background = "linear-gradient(#fecaca, #f87171)";
      }, i * delay));

      // Swap bar heights and update progress bar
      this.timeoutIDs.push(setTimeout(() => {
        const tmp = bars[b1].style.height;
        bars[b1].style.height = bars[b2].style.height;
        bars[b2].style.height = tmp;
        document.getElementById("progressBar").style.width = `${11.5*(i+1)/swaps.length}rem`;
      }, (i+0.5) * delay));

      // Make both bars blue again
      this.timeoutIDs.push(setTimeout(() => {
        bars[b1].style.background = "linear-gradient(#bfdbfe, #60a5fa)";
        bars[b2].style.background = "linear-gradient(#bfdbfe, #60a5fa)";
      }, (i+1) * delay));
    }

    // Update barHeights array to reflect sorted values, reset progress bar
    this.timeoutIDs.push(setTimeout(() => {
      document.getElementById("progressBar").style.width = "0rem";
      this.setState({barHeights: newList});
    }, swaps.length * delay));
  }

  /*
    Performs a quick sort on the barHeights list. Takes the resulting swaps
    and queues the relevant animations repersenting each swap to the bars.
  */
  animateQuickSort(delay) {
    this.clearAnimations();

    const bars = document.getElementsByClassName("visBar");
    const origList = this.state.barHeights.slice();

    // Returns the new list as element 0 and the list of swaps as element 1
    const result = Algs.getQuickSortAnimations(origList, 0, origList.length-1);
    const newList = result[0];
    const swaps = result[1];

    // For each swap, set the swapped bars to red and pivot bar to green,
    // swap them, then return them to the original color.
    for (let i = 0; i < swaps.length; i++) {
      const b1 = swaps[i][0];
      const b2 = swaps[i][1];
      const b3 = swaps[i][2];

      // Perform color changes (b1,b2 to red, b3 to green)
      this.timeoutIDs.push(setTimeout(() => {
        bars[b1].style.background = "linear-gradient(#fecaca, #f87171)";
        bars[b2].style.background = "linear-gradient(#fecaca, #f87171)";
        bars[b3].style.background = "linear-gradient(#a7f3d0, #34d399)";
      }, i * delay));

      // Swap bar heights and update progress bar
      this.timeoutIDs.push(setTimeout(() => {
        const tmp = bars[b1].style.height;
        bars[b1].style.height = bars[b2].style.height;
        bars[b2].style.height = tmp;
        document.getElementById("progressBar").style.width = `${11.5*i/swaps.length}rem`;
      }, (i+0.5) * delay));

      // Make all bars blue again
      this.timeoutIDs.push(setTimeout(() => {
        bars[b1].style.background = "linear-gradient(#bfdbfe, #60a5fa)";
        bars[b2].style.background = "linear-gradient(#bfdbfe, #60a5fa)";
        bars[b3].style.background = "linear-gradient(#bfdbfe, #60a5fa)";
      }, (i+1) * delay));
    }

    // Update barHeights array to reflect sorted values, reset progress bar
    this.timeoutIDs.push(setTimeout(() => {
      document.getElementById("progressBar").style.width = "0rem";
      this.setState({barHeights: newList});
    }, swaps.length * delay));
  }

  /*
    Performs a merge sort on the barHeights list. Takes the resulting comparisons,
    then changes and queues the relevant animations repersenting each swap to the bars.
  */
  animateMergeSort(delay) {
    this.clearAnimations();

    const bars = document.getElementsByClassName("visBar");
    const origList = this.state.barHeights.slice();

    // Returns new list as element 0, comparisons as element 1, changes as element 2
    const result = Algs.getMergeSortAnimations(origList, 0, origList.length);
    const newList = result[0];
    const comps = result[1];
    const changes = result[2];

    // For each comparison, set the two bars as red. After comparisons are over,
    // animate the formation of the "changed" partition by making the newly placed
    // bars green. Use a step counter to keep track of each delay easily
    let step = 0;
    for (let i = 0; i < comps.length; i++) {
      const currComps = comps[i];
      const currChanges = changes[i];

      // Change compared bars to a red color
      for (let j = 0; j < currComps.length; j++) {
        this.timeoutIDs.push(setTimeout(() => {
          bars[currComps[j]].style.background = "linear-gradient(#fecaca, #f87171)";
   
          // After one delay "tick" change these same bars back to blue
          setTimeout(() => {
            bars[currComps[j]].style.background = "linear-gradient(#bfdbfe, #60a5fa)";
          }, delay);
        }, step * delay));
        step++;
      }

      // Animate formation of changed partition by changing heights and color to green
      for (let j = 0; j < currChanges.length; j++) {
        this.timeoutIDs.push(setTimeout(() => {
          bars[currChanges[j][0]].style.background = "linear-gradient(#a7f3d0, #34d399)";
          bars[currChanges[j][0]].style.height = `${currChanges[j][1]}px`;
        }, step * delay));
        step++;
      }

      // Update progress bar after each partition is complete
      this.timeoutIDs.push(setTimeout(() => {
        //change all currChanges bars back to blue
        for (let j = 0; j < currChanges.length; j++) {
          bars[currChanges[j][0]].style.background = "linear-gradient(#bfdbfe, #60a5fa)";
        }
        document.getElementById("progressBar").style.width = `${11.5*(i+1)/comps.length}rem`;
      }, step * delay));
    }

    // Update barHeights array to reflect sorted values, reset progress bar
    this.timeoutIDs.push(setTimeout(() => {
      document.getElementById("progressBar").style.width = "0rem";
      this.setState({barHeights: newList});
    }, (step+1) * delay));
  }

  /*
    Runs each time the props or state of this component changes (typically after a
    set of animations has just finished). Simply takes the barHeights array and sets
    each bar to the corresponding index's value.
  */
  render() {
    const numBars = this.state.barHeights.length;

    let width;
    let padding;

    if (numBars === 10) {
      width = 100;
      padding = 10;
    }
    else if (numBars === 50) {
      width = 25;
      padding = 5;
    }
    else if (numBars === 100) {
      width = 15;
      padding = 3;
    }
    else if (numBars === 500) {
      width = 2;
      padding = 1.75;
    }

    return (
      <>
        {this.state.barHeights.map((value, idx) => (
          <div className="visBar bg-gradient-to-t from-blue-400 to-blue-200 select-none shadow-md rounded-sm"
            key={idx}
            style={{height: `${value}px`, width: `${width}px`, marginLeft: `${padding/2}px`, marginRight: `${padding/2}px`}}/>
        ))}
      </>
    );
  }
}