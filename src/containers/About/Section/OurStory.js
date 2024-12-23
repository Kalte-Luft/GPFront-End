import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'; //đa ngôn ngữ
import "./OurStory.scss";
import { withRouter } from 'react-router-dom';
class OurStory extends Component {

	handleNavigate = (path) => {
        if (this.props.history) {
            this.props.history.push(path);
        } else {
            console.error("Navigation failed: History object is not available.");
        }
    }; 
	render() {
		return (
			<div className="OurStory-container">
				<div className="core-value">
					<div className="core-value-content">
					</div>
				</div>
				<div className="our-projects">
					<div className="our-projects-content">
					</div>
					<button className="btn btn-our-projects" onClick={() => this.handleNavigate('/campaign')}>Our Projects</button>
				</div>
				<div className="OurStory-content">
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OurStory)); //bộc 2 lớp dữ liệu từ store ra ngoài, kết nối redux với react
