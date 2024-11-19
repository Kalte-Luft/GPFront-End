import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'; //đa ngôn ngữ
import "./OurStory.scss";

class OurStory extends Component {

	render() {
		return (
			<div className="OurStory-container">
				<div className="core-value">
					<div className="core-value-content">
					</div>
				</div>
				<div className="our-projects">
					<div className="our-projects-content">
					</div>
					<button type ="submit" className="btn btn-our-projects">Our Projects</button>
				</div>
				<div className="OurStory-content">
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

export default connect(mapStateToProps, mapDispatchToProps)(OurStory); //bộc 2 lớp dữ liệu từ store ra ngoài, kết nối redux với react
