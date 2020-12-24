import React from "react";
import "./Buttons.css"

const Button = ({text, onClick}) => (
    <button className="mainButton" onClick={onClick}>
        {text}
    </button>
);

export default Button;