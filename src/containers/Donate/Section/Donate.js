import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./Donate.scss";
import Aoe from "aoejs"; // Import Aoejs


const Donate = () => {

	return (
		<div className="donate-container">
			<div className="navi"></div>
			<div className="banner-donate">
				<div className="colorbg-donate">
					<div className="colorbg-donate-content">
						<div className="text">
							<h1>
								<span>Offset your carbon,</span>
								<span>Invest in people,</span>
								<span>Invest in nature.</span>
							</h1>
							<p>
								Invest in our Kalunga project to regenerate land and sustain communities, where your offsetting contribution directly nurtures the planet and empowers its people towards a thriving future.
							</p>
							<button className ="btn-offset-now" >
								Offset Now
							</button>
						</div>
					</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Donate);
