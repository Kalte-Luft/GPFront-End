import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'; //đa ngôn ngữ
import "./StartYourCacbon.scss";

class StartYourCacbon extends Component {
	constructor(props) {
		super(props);
	}
	handleCalculateNowClick = () => {
		alert('thành công');
	};
	handleContactUsBtn = () => {
		window.location.href = '/contact';
	};
	render() {
		return (
			<div className="StartYourCacbon-container">
				<div className="StartYourCacbon-content">
					<div className="StartYourCacbon-content-top">
						<div className="StartYourCacbon-content-top-content" >
							<p>Start your carbon offsetting process now</p>
						</div>
					</div>
					<div className="StartYourCacbon-content-bottom">
						<div className="StartYourCacbon-content-bottom-content">
							<div className="StartYourCacbon-content-bottom-content-left">
								<div className="icon"></div>
								<div className=" start-title">
									<p>Calculate your footprint now</p>
								</div>
								<div className="paragraph">
									<span>Use our calculator to work out yours, your business or your families carbon footprint.</span>
								</div>
								<button className="calculate-now" onClick={this.handleCalculateNowClick}>
									Caculate Now
								</button>
							</div>
							<div className="StartYourCacbon-content-bottom-content-center">
								<div className="icon"></div>
								<div className=" start-title">
									<p>Monthly Carbon Plans</p>
								</div>
								<div className="paragraph">
									<p>Want to balance your carbon
										emissions by paying monthly for yourself, business or family?</p>
								</div>
								<button className="see-plan" >
									See Plan
								</button>
							</div>
							<div className="StartYourCacbon-content-bottom-content-right">
								<div className="icon"></div>
								<div className=" start-title">
									<p>Need an expert?</p>
								</div>
								<div className="paragraph">
									<p>Our support team is here to any questions you have. You’ll always find the help you need.</p>
								</div>
								<button className="contact-us" onClick={this.handleContactUsBtn} >
									Contact Us
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => { //lấy biến thông qua state
	return {
		isLoggedIn: state.user.isLoggedIn,
		language: state.app.language,
	};
};

const mapDispatchToProps = dispatch => { //fire action event của redux
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(StartYourCacbon); //bộc 2 lớp dữ liệu từ store ra ngoài, kết nối redux với react
