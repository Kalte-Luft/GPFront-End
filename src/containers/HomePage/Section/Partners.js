import React from "react";
import { connect } from "react-redux";
import "./Partners.scss";

const Partners = () => {
    return (
        <div className="partners-container">
            <div className="partners-title ">
                <h1>Our Partners</h1>
                <p>Supporting Climate Action</p>
            </div>
            <div className="partners">
                ...
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

export default connect(mapStateToProps, mapDispatchToProps)(Partners);
