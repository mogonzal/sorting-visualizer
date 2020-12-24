import React, {Component} from 'react';

//state: selected, open or not

export default class ImageSelectMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.defaultIndex,
      open: false,
      justClicked: false
    };
  }

  getSelectedOption() {
    return this.props.options[this.state.selected];
  }

  toggleOpen() {
    this.setState((state) => {
      return {open: !state.open};
    });
  }

  handleListClick(idx) {
    this.setState({selected: idx});
    this.toggleOpen();
  }
  
  close() {
    this.setState({open: false});
  }

  render() {
     return (
      <>
        <div className={"mt-1 relative " + this.props.trigger}>
          <label id="listbox-label" className="block text-sm font-medium text-gray-700 tracking-wider">
            {this.props.labelText}
          </label>
          <button onClick={() => this.toggleOpen()} type="button" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" className="relative w-48 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none sm:text-sm">
            <span className="flex items-center font-medium">
              <img src={this.props.optionImages[this.state.selected]} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
              <span className="ml-3 block truncate">
                {this.props.options[this.state.selected]}
              </span>
            </span>
            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </button>

          {this.state.open &&
            <div className="absolute mt-1 w-48 rounded-md bg-white shadow-lg left-0">
              <ul tabIndex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" className="max-h-56 rounded-md text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {this.props.options.map((item, i) => (
                  <li id="listbox-item-0" role="option" className="rounded-md bg-white hover:bg-gray-200 text-gray-500 hover:text-black cursor-pointer select-none relative py-2 pl-3 pr-9" onClick={() => this.handleListClick(i)}>
                    <div className="flex items-center">
                      <img src={this.props.optionImages[i]} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                      <span className="ml-3 block font-medium truncate">
                        {item}
                      </span>
                    </div>
                    {this.state.selected === i &&
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    }
                  </li>
                ))}
              </ul>
            </div>
          }

          

        </div>
      </>
    );
  }
}