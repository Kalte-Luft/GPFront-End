import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./DonateLarge.scss";
import Aoe from "aoejs"; // Import Aoejs
import { withRouter } from "react-router-dom"; // Điều hướng


const DonateLarge = (props) => {

	useEffect(() => {
		// Khởi tạo Aoe
		const aoe = new Aoe();
		aoe.init({
			attributes: {
				dataset: "data-aoe", // Chỉ định thuộc tính `data-aoe` để áp dụng hiệu ứng
				delay: "data-aoe-delay",
				speed: "data-aoe-speed",
			},
			observerRoot: null,
			observeRootMargin: "0px",
			observeRootThreshold: [0, 0.5, 0.75, 1],
			intersectionRatio: 0.5,
			once: false,
			speed: 800,
			delay: 0,
			timingFunction: "linear",
		});

		// Clean-up để ngắt kết nối observers khi component unmount
		return () => {
			aoe.disconnectObservers();
		};
	}, []); // Chạy sau khi component render lần đầu tiên

	const handleNavigate = (path) => {
		if (props.history) {
			props.history.push(path);
		} else {
			console.error("Navigation failed: History object is not available.");
		}
	}; 

	return (
		<div className="donateLarge-container">
			<div className="donateLarge-content" data-aoe="driveInBottom">
				<div className="donateLarge-content-left">
					<div className="donateLarge-content-left-top">
						<h1>Help us build Greenpaw</h1>
					</div>
					<div className="donateLarge-content-left-center">
						<p>Supporting Greenpaw with a donation means directly contributing to the expansion of our passionate team and the development of more impactful projects. Your generous support enables us to go beyond carbon offsetting; it fortifies our foundation, allowing us to innovate, reach out, and create lasting environmental solutions. Every donation helps us to build our capacity, ensuring that we can continue our vital work in protecting ecosystems, empowering communities, and driving significant change towards a sustainable future. Join us in this mission — your donation has the power to make a real difference.</p>
					</div>
					<div className="donateLarge-content-left-under">
						<button 
						className="btn-donateLarge"
						onClick={() => handleNavigate("/campaign")}>
							JOIN NOW
						</button>
					</div>
				</div>
				<div className="donateLarge-content-right">
					<div className="parrot-image"></div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DonateLarge));
