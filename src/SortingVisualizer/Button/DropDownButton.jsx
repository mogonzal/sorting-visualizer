import React from "react";
import Button from "./Button";
import DropDownCard from "./DropDownCard";
import "./Buttons.css"

const DropDownButton = ({options, state}) => {
    const [open, setOpen] = React.useState(false);
    const drop = React.useRef(null);
    let label = options[state];

    function handleClick(e) {
        if (!e.target.closest(`.${drop.current.className}`) && open) {
            setOpen(false);
        }
    }

    React.useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    });

    return (
        <div
            className="dropdown"
            ref={drop}
            style={{position: "relative", margin: "16px"}}
        >
            <Button text={label} onClick={() => setOpen(open => !open)}/>
            {open && <DropDownCard data={options} onClick={() => setOpen(open => !open)}/>}
        </div>
    )
};

export default DropDownButton;