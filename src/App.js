import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import Menu from "./Menu";
import Game from "./Game";
import "./App.css";
import Coupons from "./Coupons";
import Profile from "./Profile";
import allCoupons from "./allCoupons";

class Clicker extends Component {
  constructor(props) {
    super(props);
    let clicks = parseFloat(localStorage.getItem("clicks"));
    clicks = clicks ? clicks : 0;
    let coupons = localStorage.getItem("coupons");
    coupons = coupons ? JSON.parse(coupons) : [];
    this.state = {
      clicks: clicks,
      coupons: coupons,
      claimableCoupons: 0,
      countUpdateValue: 0,
      boost: 0,
    };
    this.setClicks = this.setClicks.bind(this);
    this.claimCoupon = this.claimCoupon.bind(this);
    this.updateCouponCount = this.updateCouponCount.bind(this);
    this.setBoost = this.setBoost.bind(this);
    this.booster = this.booster.bind(this);
  }
  componentDidMount() {
    this.updateCouponCount(this.state.clicks);
  }
  setBoost(value) {
    this.setState({ boost: value });
  }

  /* Lisätään burgereiden määrää mikäli käyttääjä painaa hiirtä riittävän nopeasti */
  booster() {
    //klikkaukset alussa
    const clicksNow = this.state.clicks;
    if (this.state.boost <= 2) {
      // if jotta iddqd toimii
      setTimeout(() => {
        /*odotetaan 0.7 sekunttia ja tarkastetaan kuinka monta painallusta tullut tänä aikana
      ja lisätään klikkien mukaan boosterin arvoa
      */
        var timesClicked = this.state.clicks - clicksNow;
        console.log("kerrat:" + timesClicked);
        if (timesClicked >= 12) {
          this.setBoost(2);
        } else if (timesClicked >= 9) {
          this.setBoost(1.4);
        } else if (timesClicked >= 7) {
          this.setBoost(0.8);
        } else if (timesClicked >= 5) {
          this.setBoost(0.4);
        } else if (timesClicked >= 4) {
          this.setBoost(0.3);
        } else {
          this.setBoost(0);
        }
      }, 700);
    }
  } // Boosterin toiminnallisuus

  setClicks(clicks) {
    this.setState({
      clicks: clicks,
    });
    if (clicks > this.state.countUpdateValue) {
      this.updateCouponCount(clicks);
    }
    localStorage.setItem("clicks", clicks);
    this.booster();
  }

  updateCouponCount(clicks) {
    let coupons = 0;
    let updateValue = this.state.countUpdateValue;
    allCoupons.forEach((coupon) => {
      if (coupon.price <= clicks) {
        coupons++;
      }
      if (
        (updateValue < clicks && coupon.price > updateValue) ||
        (coupon.price > clicks && coupon.price < updateValue)
      ) {
        updateValue = coupon.price;
      }
      this.setState({
        claimableCoupons: coupons,
        countUpdateValue: updateValue,
      });
    });
  }
  claimCoupon(couponId) {
    let filteredCoupons = allCoupons.filter((offer) => offer.id === couponId);
    let selectedCoupon = Object.assign({}, filteredCoupons[0]);
    selectedCoupon.claimed = Date.now();
    selectedCoupon.validDue = Date.now() + 14 * 24 * 60 * 60 * 1000;
    let clicks = this.state.clicks;
    clicks = clicks - selectedCoupon.price;
    let coupons = this.state.coupons.slice();
    coupons.push(selectedCoupon);
    this.setState({
      clicks: clicks,
      coupons: coupons,
    });
    this.updateCouponCount(clicks);
    localStorage.setItem("clicks", clicks);
    localStorage.setItem("coupons", JSON.stringify(coupons));
  }

  render() {
    return (
      <Router>
        <div className="clicker">
          <Route
            path="/"
            exact
            render={(props) => (
              <Game
                clicks={this.state.clicks}
                setClicks={this.setClicks}
                boost={this.state.boost}
                setBoost={this.setBoost}
              />
            )}
          />
          <Route
            path="/coupons"
            render={(props) => (
              <Coupons
                clicks={this.state.clicks}
                claimCoupon={this.claimCoupon}
              />
            )}
          />
          <Route
            path="/profile"
            render={(props) => (
              <Profile
                reset={this.setClicks}
                coupons={this.state.coupons}
                resetCoupons={this.updateCouponCount}
              />
            )}
          />
          <Menu claimableCoupons={this.state.claimableCoupons} />
        </div>
      </Router>
    );
  }
}

export default Clicker;
