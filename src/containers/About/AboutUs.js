import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import './AboutUs.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class AboutUs extends Component {

	render() {


		return (
			<div>
				<HomeHeader />
				
				<HomeFooter
				/>
			</div>
		);
	}

}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.user.isLoggedIn
	};
};

const mapDispatchToProps = dispatch => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
