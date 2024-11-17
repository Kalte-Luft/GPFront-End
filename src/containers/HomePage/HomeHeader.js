import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import VN from "../../assets/images/VN.svg";
import UK from "../../assets/images/UK.svg";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";
class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };
    render() {
        return (
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <div className="header-logo"></div>
                    </div>
                    <div className="center-content">
                        <button className="btn">
                            <span><FormattedMessage id="home-header.home" /></span>
                        </button>
                        <button className="btn">
                            <span> About </span>
                        </button>
                        <button className="btn">
                            <span><FormattedMessage id="home-header.reality" /></span>
                        </button>
                        <button className="btn">
                            <span><FormattedMessage id="home-header.campaign" /></span>
                        </button>
                        {/* <button className="btn">
                            <span><FormattedMessage id="home-header.fund" /></span>
                        </button> */}
                           <button className="btn">
                            <span>Contact us</span>
                        </button>
                    </div>
                    <div className="right-content">
                        <button className ="btn btn-right">
                            Donate
                        </button>
                        <div className="dropdown">
                            <button className="dropbtn">
                                <i className="fas fa-globe"></i>
                                <i className="fas fa-caret-down"></i>
                            </button>
                            <div className="dropdown-content">
                                <a className="VN" href="#" onClick={()=> this.changeLanguage(LANGUAGES.VI)}>
                                <img src={VN} alt="Vietnam Flag" style={{ width: '16px', marginRight: '5px' }} />
                                    Tiếng Việt
                                </a>
                                <a className="EN" href="#" onClick={()=> this.changeLanguage(LANGUAGES.EN)}>
                                <img src={UK} alt="United Kingdom Flag" style={{ width: '16px', marginRight: '5px' }} />
                                    English
                                </a>
                            </div>                           
                        </div>
                        <button className="btn login-btn-right">
                            <i className="fas fa-user"></i>
                            <span><FormattedMessage id="home-header.login"/></span>
                        </button>
                        </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
