import React from "react";
function Stats(props) {
  //count outputissa otetaan desimaalit pois näkyvistä.
  return (
    <div className="stats">
      <div className="stats__title">Burgers</div>
      <div className="stats__count">{props.count.toFixed()}</div>
    </div>
  );
}

export default Stats;
