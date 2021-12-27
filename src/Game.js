import React from "react";
import Stats from "./Stats";
import Burger from "./Burger";
import Booster from "./Booster";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.mouseClicked = this.mouseClicked.bind(this);
  }

  mouseClicked() {
    //lisätään jokaiseen klikkiin boostin arvo. default 0 max 1.5
    const clicks = this.props.clicks + 1 + this.props.boost;
    this.props.setClicks(clicks);
  }

  render() {
    return (
      <React.Fragment>
        <div className="header">
          <h1>Burger Clicker</h1>
        </div>
        <div className="content content--justified">
          <Stats count={this.props.clicks} />
          <Burger
            boost={this.props.boost}
            setBoost={this.props.setBoost}
            onClick={this.mouseClicked}
          />
          <Booster boost={this.props.boost} setBoost={this.props.setBoost} />
        </div>
      </React.Fragment>
    );
  }
}

export default Game;
