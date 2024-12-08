import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./Product.scss";
import Aoe from "aoejs"; // Import Aoejs


const Product = () => {

	return (
			<div className="Product-container">
				<div className="navi"></div>
				<div className="find-cart">
					<div className="find">
						<div className="search">
							<i className="fas fa-search"></i>
							<input
								type="text"
								placeholder='Finding product'></input>
						</div>
					</div>
					<div className="cart">
						<i class="fas fa-shopping-cart"></i>
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);
