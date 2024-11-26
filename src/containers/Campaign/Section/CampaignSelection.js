import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./CampaignSelection.scss";
import danang from "../../../assets/images/danang.webp";
import Aoe from "aoejs"; // Import Aoejs
import InteractiveMap from "./InteractiveMap";


const CampaignSelection = () => {

    return (
        <div className="campaign-selection-container">
            <div className="space" />
            <div className="campaign-selection-content">
                <div className="left-content">
                    <InteractiveMap />
                </div>
                <div className="right-content">
                    <div className="banner-img">
                        <img src={danang} alt="Da Nang" />
                    </div>
                    <div className="infor">
                        <div className="infor-title">
                            <h1>Overview - Da Nang</h1>
                            <div className="dividing-line" />
                        </div>
                        <div className="infor-content-1">
                            <div className="total-campaign">
                                <div className="total-campaign-title">
                                    <h1>Total Campaign</h1>
                                </div>
                                <div className="total-campaign-number">16</div>
                            </div>
                            <div className="total-money">
                                <div className="total-money-title">
                                    <h1>Total Donation Amount</h1>
                                </div>
                                <div className="total-money-number">
                                    212.000.000 đ
                                </div>
                            </div>
                        </div>
                        <div className="infor-content-2">
                            <div className="active-campaigns">
                                <div className="dividing-line" />
                                <div className="active-campaigns-title">
                                    Ended Campaign
                                </div>
                                <div className="active-campaigns-number">3</div>
                            </div>
                            <div className="completed-campaigns">
                                <div className="dividing-line" />
                                <div className="completed-campaigns-title">
                                    Ongoing Campaign
                                </div>
                                <div className="completed-campaigns-number">8</div>
                            </div>
                            <div className="past-campaigns">
                                <div className="dividing-line" />
                                <div className="past-campaigns-title">
                                    Upcoming Campaign
                                </div>
                                <div className="past-campaigns-number">5</div>
                            </div>
                        </div>
                    </div>
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

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignSelection);
