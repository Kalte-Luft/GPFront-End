import React, { useEffect, useRef } from "react";
import { connect } from "react-redux"; // Kết nối Redux
import { FormattedMessage } from "react-intl"; // Đa ngôn ngữ
import Aoe from "aoejs"; // Import Aoejs
import "./VisionMission.scss";

const VisionMission = (props) => {

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


	return (
		<div className="VisionMission">
			<div className="Vision" data-aoe="ball">
				<div className="Vision-content">
					<div className="Vision-content-bg">
						<div className="graphic">
						</div>
						<div className="paragraph">
							<h1>Vision</h1>
							<p>Reviving earth, sustaining all life forms</p>
						</div>
					</div>
				</div>
			</div>
			<div className="Mission" data-aoe="ball">
				<div className="Mission-content">
					<div className="Mission-content-bg">
						<div className="graphic">
						</div>
						<div className="paragraph">
							<h1>Mission</h1>
							<span>Greenpaw is dedicated to accelerating Earth's natural regeneration and protecting ancient ecosystems through strategic partnerships, innovative solutions, and empowering local communities for a sustainable and biodiverse future.</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VisionMission);
