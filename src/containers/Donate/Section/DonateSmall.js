import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./DonateSmall.scss";
import Aoe from "aoejs"; // Import Aoejs


const DonateSmall = () => {

	return (
		<div className="donateSmall-container">
			<div className="title-donateSmall">
				<h1>Join our community of monthly supporters
					of Land Regeneration Plans</h1>
			</div>
			<div className="donateSmall-content">
				<div className="donateSmall-content-left">
					<i className=" fa fa-solid fa-tree"></i>
					<div className="text-donateSmall">
						<h3>Yellow Plan</h3>
						<span>20 Trees planted <br></br> </span>
						<span>every month <br></br></span>
						<span>400kgs CO2 <br></br></span>
						<span>Carbon balanced<br></br> </span>
						<span>every month <br></br></span>
						<span>700.000 VND <br></br></span>
						<span>Per month</span>
					</div>
					<button className="btn-donateSmall">
						Donate now
					</button>
				</div>
				<div className="donateSmall-content-center">
					<i className="fa fa-solid fa-tree"></i>
					<div className="text-donateSmall">
						<h3>Orange Plan</h3>
						<span>10 Trees planted <br></br></span>
						<span>	every month<br></br></span>
						<span>200kgs CO2 <br></br></span>
						<span>Carbon balanced <br></br></span>
						<span>every month<br></br></span>
						<span>350.000 VND<br></br></span>
						<span>Per month<br></br></span>
					</div>
					<button className="btn-donateSmall">
						Donate now
					</button>
				</div>
				<div className="donateSmall-content-right">
					<i className=" fa fa-solid fa-tree"></i>
					<div className="text-donateSmall">
						<h3>Yellow Plan</h3>
						<span>5 Trees planted <br></br></span>
						<span>every month<br></br></span>
						<span>100 kgs CO2<br></br></span>
						<span>Carbon balanced <br></br></span>
						<span>every month<br></br></span>
						<span>178.000 VND<br></br></span>
						<span>Per month<br></br></span>
					</div>
					<button className="btn-donateSmall">
						Donate now
					</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(DonateSmall);
