import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./DonateLarge.scss";
import Aoe from "aoejs"; // Import Aoejs


const DonateLarge = () => {

	return (
		<div className="donateLarge-container">
			<div className="donateLarge-content">
				<div className="donateLarge-content-left">
					<div className="donateLarge-content-left-top">
						<h1>Help us build Greenpaw</h1>
					</div>
					<div className="donateLarge-content-left-center">
						<p>Supporting Greenpaw with a donation means directly contributing to the expansion of our passionate team and the development of more impactful projects. Your generous support enables us to go beyond carbon offsetting; it fortifies our foundation, allowing us to innovate, reach out, and create lasting environmental solutions. Every donation helps us to build our capacity, ensuring that we can continue our vital work in protecting ecosystems, empowering communities, and driving significant change towards a sustainable future. Join us in this mission — your donation has the power to make a real difference.</p>
					</div>
					<div className="donateLarge-content-left-under">
						<button className="btn-donateLarge">
							Donate Now
						</button>
					</div>
				</div>
				<div className="donateLarge-content-right">
<div className ="parrot-image"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DonateLarge);
