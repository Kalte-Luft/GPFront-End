import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'; //đa ngôn ngữ
import "./VisionMission.scss";

class VisionMission extends Component {

	render() {
		return (
			<div className="VisionMission">
				<div className="Vision">
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
				<div className="Mission">
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

export default connect(mapStateToProps, mapDispatchToProps)(VisionMission); //bộc 2 lớp dữ liệu từ store ra ngoài, kết nối redux với react
