import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./Donate.scss";
import Aoe from "aoejs"; // Import Aoejs
import { withRouter } from "react-router-dom";

//chuyen trang khi click vao button
const Donate = (props) => {

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
			speed: 1000,
			delay: 0,
			timingFunction: "linear",
		});

		// Clean-up để ngắt kết nối observers khi component unmount
		return () => {
			aoe.disconnectObservers();
		};
	}, []); // Chạy sau khi component render lần đầu tiên

	const handleNavigate = (path, targetScrollTop1) => {
		if (props.history) {
			props.history.push(path, { targetScrollTop1 });
		} else {
			console.error("Navigation failed: History object is not available.");
		}
	};

	return (
		<div className="donate-container">
			<div className="navi"></div>
			<div className="banner-donate">
				<div className="colorbg-donate"  data-aoe="fadeIn">
					<div className="colorbg-donate-content">
						<div className="text">
							<h1>
								<span>Offset your carbon,</span>
								<span>Invest in people,</span>
								<span>Invest in nature.</span>
							</h1>
							<p>
								Invest in Cuc Phuong national park to regenerate land and sustain communities, where your offsetting contribution directly nurtures the planet and empowers its people towards a thriving future.
							</p>
							<button className="btn-offset-now" onClick={() => handleNavigate("/product", 1)}>
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

export default withRouter(connect(mapStateToProps)(Donate));
