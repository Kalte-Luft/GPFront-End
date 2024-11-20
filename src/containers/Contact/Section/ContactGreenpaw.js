import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'; //đa ngôn ngữ
import "./ContactGreenpaw.scss";

class ContactGreenpaw extends Component {
	constructor(props) {
		super(props);
	}
	// handleCalculateNowClick = () => {
	// 	alert('thành công');
	// };
	// handleContactUsBtn = () => {
	// 	window.location.href = '/contact';
	// };
	render() {
		return (
			<div className="ContactGreenpaw-container">
				<div className="transparent"></div>
				<div className="ContactGreenpaw-content">
					<div className="ContactGreenpaw-content-top">
						<div className="top-bg">
							<div className="text-contact">
								Contact Greenpaw
							</div>
						</div>
					</div>
					<div className="ContactGreenpaw-content-bottom">
						<div className="bottom-content">
							<div className="bottom-content-left">
								<div className="bottom-content-left-top ">
									<h3><span>Contact Us</span></h3>
								</div>
								<div className="bottom-content-left-middle">
									<p>We're committed to helping you in any way we can.</p>
									<p>Leave us a note and we'll get in touch with you shortly.</p>
								</div>
								<div className="bottom-content-left-under">
									<div className="col-12 form-group send-mess">
										<input type="text"
											className="form-control"
											placeholder='Name:'></input>
									</div>
									<div className="col-12 form-group send-mess">
										<input type="email"
											className="form-control"
											placeholder='Email:'></input>
									</div>
									<div className="col-12 form-group send-mess">
										<textarea type="text"
											className="form-control"
											placeholder='Message:'></textarea>
									</div>
									<button className="btn-send-mess" type="submit">Send Message</button>
								</div>
							</div>
							<div className="bottom-content-right">
								<div className="bottom-content-right-content">
									<i className="fas fa-map-marker-alt"></i>
									<p>Da Nang</p>
									<p>Binh Dinh</p>
									<p>Viet-Han</p>
									<i className="fas fa-envelope"></i>
									<p>nghianb.23itb@vku.udn.vn</p>
									<p>khanhbq.23itb@vku.udn.vn</p>
								</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactGreenpaw); //bộc 2 lớp dữ liệu từ store ra ngoài, kết nối redux với react
