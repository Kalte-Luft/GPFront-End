import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import HomeFooter from './HomeFooter';
import './AboutUs.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class AboutUs extends Component {

	render() {
		let settings = {
			dots: false, //chấm chấm dưới slide 
			infinite: true, //lặp vô hạn
			speed: 500,
			slidesToShow: 4, //số lượng slide hiển thị
			slidesTosScroll: 1, //số lượng slide chuyển khi click
		}


		return (
			<div>
				<HomeHeader />
				<Specialty
					settings={settings}
				/>
				<MedicalFacility
					settings={settings}
				/>
				<OutStandingDoctor
					settings={settings}
				/>
				<HandBook
					settings={settings}
				/>
				<About
				/>
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
