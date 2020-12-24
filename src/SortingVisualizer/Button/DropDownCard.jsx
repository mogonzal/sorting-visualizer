import React from "react";
import "./Buttons.css"

const DropDownCard = ({data, onClick}) => (
    <div className="card">
        <ul className="test">
            {data.map((item, i) => (
                <li id={i} className="cardButton" onClick={onClick}>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

export default DropDownCard;