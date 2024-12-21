import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./DonateSmall.scss";
import { withRouter } from "react-router-dom";

const DonateSmall = (props) => {
  const handleNavigate = (path, targetScrollTop) => {
    if (props.history) {
      props.history.push(path, { targetScrollTop });
    } else {
      console.error("Navigation failed: History object is not available.");
    }
  };

  useEffect(() => {
    const state = props.location.state || {};
    const targetScrollTop = state.targetScrollTop || 0;

    if (targetScrollTop && document.documentElement) {
      window.scrollTo({ top: targetScrollTop, behavior: "smooth" });
    }
  }, [props.location]);

  return (
    <div className="donateSmall-container">
      <div className="title-donateSmall">
        <h1>Join our community of monthly supporters of Land Regeneration Plans</h1>
      </div>
      <div className="donateSmall-content">
        <div className="donateSmall-content-left">
          <i className="fa fa-solid fa-tree"></i>
          <div className="text-donateSmall">
            <h3>Yellow Plan</h3>
            <span>20 Trees planted <br /></span>
            <span>every month <br /></span>
            <span>400kgs CO2 <br /></span>
            <span>Carbon balanced<br /></span>
            <span>every month <br /></span>
            <span>700.000 VND <br /></span>
            <span>Per month</span>
          </div>
          <button className="btn-donateSmall" onClick={() => handleNavigate("/product", 100)}>
            Donate now
          </button>
        </div>
        <div className="donateSmall-content-center">
          <i className="fa fa-solid fa-tree"></i>
          <div className="text-donateSmall">
            <h3>Orange Plan</h3>
            <span>10 Trees planted <br /></span>
            <span>every month<br /></span>
            <span>200kgs CO2 <br /></span>
            <span>Carbon balanced <br /></span>
            <span>every month<br /></span>
            <span>350.000 VND<br /></span>
            <span>Per month<br /></span>
          </div>
          <button className="btn-donateSmall">
            Donate now
          </button>
        </div>
        <div className="donateSmall-content-right">
          <i className="fa fa-solid fa-tree"></i>
          <div className="text-donateSmall">
            <h3>Green Plan</h3>
            <span>5 Trees planted <br /></span>
            <span>every month<br /></span>
            <span>100kgs CO2<br /></span>
            <span>Carbon balanced <br /></span>
            <span>every month<br /></span>
            <span>178.000 VND<br /></span>
            <span>Per month<br /></span>
          </div>
          <button className="btn-donateSmall">
            Donate now
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

export default withRouter(connect(mapStateToProps)(DonateSmall));
