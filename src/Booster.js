import React from "react";

function Booster(props) {
  const { boost, setBoost } = props;

  const iddqd = () => {
    var i = prompt(`doom`, `cheater?`);
    console.log(`sana = ${i}`);
    if (i === `iddqd`) {
      setTimeout(() => {
        setBoost(665);
      }, 250);
    } else {
      if (i !== null) {
        alert(`"${i}" ...that's not right! knowers know...`);
      }
      setBoost(0);
    }
  };

  if (1 + boost === 3) {
    return (
      <div className="booster--doom">
        <button
          alt="CLICKME!"
          onClick={() => {
            iddqd();
          }}
        >
          Catch me if u can!
        </button>
      </div>
    );
  } else {
    return <div className="booster--visible">{1 + boost} burgers / click</div>;
  }
}
export default Booster;
