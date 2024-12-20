import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import Overview from "./Section/Overview";
import Detail from "./Section/Detail";
import Value from "./Section/Value";
import JoinCampain from "./Section/JoinCampain";

class DetailCampaign extends Component {
    render() {
        return (
            <div>
                <HomeHeader />
                <Overview />
                <Value />
                <Detail />
                <JoinCampain />
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

export default connect(mapStateToProps)(DetailCampaign);
