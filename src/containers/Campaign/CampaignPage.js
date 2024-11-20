import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import HomeFooter from "../HomePage/HomeFooter";
import CampaignSelection from "./Section/CampaignSelection";

class Campaign extends Component {
  render() {
    return (
      <div>
        <HomeHeader />
        <CampaignSelection />
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

export default connect(mapStateToProps)(Campaign);
