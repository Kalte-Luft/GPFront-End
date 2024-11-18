import React, { Component } from "react";
import { connect } from "react-redux";
import StatusBanner from "./Section/StatusBanner";
import HomeHeader from "../HomePage/HomeHeader";
import HomeFooter from "../HomePage/HomeFooter";
import Chart from "./Section/Chart";

class Status extends Component {
  render() {
    return (
      <div>
        <HomeHeader />
        <StatusBanner />
        <div className="status-content" style={{height:'100vh'}}>
          <Chart />
        </div>
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

export default connect(mapStateToProps)(Status);
