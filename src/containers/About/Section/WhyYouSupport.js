import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'; //đa ngôn ngữ
import "./WhyYouSupport.scss";

class WhyYouSupport extends Component {

	render() {
		return (
			<div className="WhyYouSupport">
				<div className="WhyYouSupport-container">
				<div className="WhyYouSupport-bg">
					<div className="content-top">
					
							<h3>Why You Should Support</h3>
							<div className="logo"></div>
						</div>
						<div className="content-down">
							<p>Navigating the urgent global climate challenge, Greenpaw stands out by embracing a holistic regeneration strategy. Beyond traditional carbon offsetting,
								we incorporate advanced sequestration metrics with initiatives that foster food security, robust rewilding, and socio-economic stability.
								Our meticulous grading system spans comprehensive areas, from carbon emissions mitigation to biodiversity conservation and community enrichment. <br></br>
								Every project within Greenpaws' regeneration portfolio undergoes this rigorous environmental and social impact assessment,
								underscoring our commitment to a more sustainable, transparent, and ecologically restorative future;
								positioning us as pioneers in the realm of transformative sustainability and community upliftment.
							</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(WhyYouSupport); //bộc 2 lớp dữ liệu từ store ra ngoài, kết nối redux với react
