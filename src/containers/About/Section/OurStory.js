import React, { useEffect, useRef } from "react";
import { connect } from "react-redux"; // Kết nối Redux
import { withRouter } from "react-router-dom"; // Điều hướng
import { FormattedMessage } from "react-intl"; // Đa ngôn ngữ
import Aoe from "aoejs"; // Import Aoejs
import "./OurStory.scss";

const OurStory = (props) => {

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
		<div className="OurStory-container">
			<div className="core-value">
				<div className="core-value-content" data-aoe="ball">
				</div>
			</div>
			<div className="our-projects">
				<div className="our-projects-content" data-aoe="ball">
				</div>
				<button className="btn btn-our-projects " data-aoe="pull" onClick={() => handleNavigate("/campaign")}>
					<FormattedMessage id="our.projects" defaultMessage="Our Projects" />
				</button>
			</div>
			<div className="OurStory-content" >
			</div>
		</div>
	);
};

// Kết nối với Redux
const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

// Sử dụng connect và withRouter
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OurStory));
