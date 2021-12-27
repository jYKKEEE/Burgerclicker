import React, { useState } from "react";
import burger from "./images/burger.png";
import doom from "./images/doom.png";

function Burger(props) {
  const { boost, setBoost, onClick } = props;

  const [pressed, setPressed] = useState(false);
  const classValue = pressed
    ? "burger__img burger__img--pressed"
    : "burger__img";
  if (boost === 665) {
    return (
      <div className="doom">
        <img
          src={doom}
          alt="X"
          className={classValue}
          onPointerDown={() => {
            setPressed(true);
          }}
          onPointerUp={() => {
            setPressed(false);
          }}
          onClick={onClick}
        />
        <button
          className="reset_button"
          onClick={() => {
            setBoost(0);
          }}
        >
          cheats OFF
        </button>
      </div>
    );
  } else {
    return (
      <div className="burger">
        <img
          src={burger}
          alt=""
          className={classValue}
          onPointerDown={() => {
            setPressed(true);
          }}
          onPointerUp={() => {
            setPressed(false);
          }}
          onClick={onClick}
        />
      </div>
    );
  }
}
export default Burger;
