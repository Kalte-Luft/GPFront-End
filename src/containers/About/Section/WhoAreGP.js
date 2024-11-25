import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'; //đa ngôn ngữ
import "./WhoAreGP.scss";

class WhoAreGP extends Component {

	handleDonateClick =() => {
		window.location.href = '/donate';
	}

	render() {
		return (
			<div className="WhoAreGP">
				<div className="WhoAreGP-content">
					<div className="WhoAreGP-content-left">
						<div className='left-content'>
							<div className="paragraph-top">
								<h1>Who are Greenpaw</h1>
							</div>
							<div className="paragraph-bottom">
								<p>Greenpaw is part of Nghia and Khanh registered charity Viet-Han Project. Greenpaw is a platform for people and organisations to become carbon neutral and protect that planet’s oxygen system. Greenpaw partner with projects which work with ecological design principles to regenerate entire ecosystems to a thriving biodiverse state, whilst supporting local communities, Indigenous tribes and traditional peoples.</p>
								<button type="submit" className="btn btn-donate " onClick={this.handleDonateClick} >
									Donate
								</button>
							</div>
						</div>
					</div>
					<div className="WhoAreGP-content-right">
						<div className="right-content">

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

export default connect(mapStateToProps, mapDispatchToProps)(WhoAreGP); //bộc 2 lớp dữ liệu từ store ra ngoài, kết nối redux với react
