import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./Overview.scss";


const Overview = () => {
    return (
        <div className="overview-container">
            <div className='transparent'></div>
                <div className="overview-content"
                    style={{
                        backgroundImage: `url(https://giaingo.info/wp-content/uploads/2021/07/4708875_Cover_Rung-768x476.jpg)`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                    }}         
                >
                <div className="gradient">
                    <p>Projects & campaigns</p>
                    <h1>Forest planting campaign, greening bare hills</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Overview);