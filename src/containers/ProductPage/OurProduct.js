import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import HomeFooter from "../HomePage/HomeFooter";
import Product from "./Section/Product";

class OurProduct extends Component {
	render() {
		return (
			<div>
				<HomeHeader
				/>

				<Product 
				/>


				<HomeFooter
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
	};
};

export default connect(mapStateToProps)(OurProduct);
