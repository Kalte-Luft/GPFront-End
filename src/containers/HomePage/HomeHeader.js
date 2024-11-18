import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
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
    handleNavigate = (path) => {
        this.props.history.push(path);
    };
    
    render() {
        return (
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <div className="header-logo"></div>
                    </div>
                    <div className="center-content">
                        <button className="btn" onClick={() => this.handleNavigate('/')}>
                            <span><FormattedMessage id="home-header.home" /></span>
                        </button>
                        <button className="btn" onClick={() => this.handleNavigate('/about')}>
                            <span> About </span>
                        </button>
                        <button className="btn">
                            <span><FormattedMessage id="home-header.reality" /></span>
                        </button>
                        <button className="btn">
                            <span><FormattedMessage id="home-header.campaign" /></span>
                        </button>
                           <button className="btn" onClick={() => this.handleNavigate('/contact')}>
                            <span>Contact us</span>
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
                    </div>
                    <div className="right-content">
                        <button className ="btn btn-right">
                            Donate
                        </button>
                        
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));


