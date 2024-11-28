import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./Value.scss";


const Value = () => {
    const number = 20000000;
    const formattedNumber = number.toLocaleString('de-DE');
    
    return (
        <div className="value-container">
            <div className="left-content">
                <div className="hr"/>
                <div className="total-value">
                    <h1>Total value</h1>
                    <p>{formattedNumber} ₫</p>
                </div>
                <div className="hr"/>
            </div>
            <div className="right-content">
                <div className="hr"/>
                <div className="top-right">
                    <h1>Donation progress</h1>
                    <p>14000000₫/20000000₫</p>
                    <div className="progress">
                        <div className="progress-bar" style={{width: "70%"}}></div>
                    </div>
                </div>
                <div className="bottom-right">
                    <div className="remain">
                        <h1>Donation Percentage</h1>
                        <p>70%</p>
                    </div>
                    <div className="remain">
                        <h1>Remaining Percentage</h1>
                        <p>30%</p>
                    </div>
                    <div className="remain">
                        <h1>Remaining Days</h1>
                        <p>20 days</p>
                    </div>
                </div>
                <div className="hr"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Value);