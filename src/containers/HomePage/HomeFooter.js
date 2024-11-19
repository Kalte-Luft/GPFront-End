import React from "react";
import { connect } from "react-redux";
import "./HomeFooter.scss";

const HomeFooter = () => {
    return (
        <div className="footer-container">
            <div className="footer-content">
				<div className="logo"></div>
				<div className="menu">
					<div className="menu-item">
						<a>About</a>
						<a>Contact Us</a>
						<a>Reality</a>
						<a>Campaign</a>
						<a>Donate</a>
						<a>Terms & Conditions</a>
						<a>Cookie policy</a>
						<a>Privacy Policy</a>
					</div>
				</div>
				<div className="branch">
					<div className="branch-item">
						<a>Đà Nẵng</a>
						<a>Bình Định</a>
						<a>Huế</a>
						<a>Quảng Nam</a>
					</div>
				</div>
				<div className="mail">
					<div className="mail-title">
						<h1>Newsletter sign up</h1>
					</div>
					<div className="mail-input">
						<h1>Email:</h1>
						<input type="text" placeholder="Enter your email address"/>
					</div>
					<div className="sign-up">
						<button className="btn">Sign up</button>
					</div>
				</div>
			</div>
			<div className="hr"></div>
			<div className="copy-right">
				<p>© 2024 Reality. All rights reserved</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
