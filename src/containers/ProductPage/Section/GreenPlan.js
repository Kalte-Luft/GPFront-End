import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./GreenPlan.scss";
import Aoe from "aoejs"; // Import Aoejs


const GreenPlan = () => {

	return (
		<div className="GreenPlan-container">
			<div className="GreenPlan-content">
				<div className="GreenPlan-content-left">
					<div className="GreenPlan-image">
					</div>
				</div>
				<div className="GreenPlan-content-right">
					<div className="title-GreenPlan">
						<h1>Green Plan</h1>
						<p>180.000VND</p>
					</div>
					<div className="buy-product-GreenPlan">
						<div className="bg">
							<h3>Would you like to buy this product?</h3>
							<p>Once you subscribe, we will place a new order with this product.
								You will be automatically charged 180.000VND or each order.
								You can easily manage your subscription or cancel it anytime with no additional charges.</p>

							<span>1 item in the bag</span>
						</div>
						<div className="product-content">
							<div className="product-content-qty">
								<label><span>Quantity:</span></label>
							</div>
							<div className="qty">
								<input type="number" id="quantity" className="quantity" min="1" max="100" placeholder="1" />
							</div>
						</div>
						<div className="product-purchase-controll">
							<div className="btn-action">
								<button className="add-btn">Add to bag</button>

								<button className="go-to-check-btn">Go to Checkout</button>
							</div>
						</div>
						<div className="description">
							<p> Join the Yellow Plan membership and plant 18 trees each month, 
								amplifying your positive environmental impact. 
								Each tree sequesters 20 kg of CO2, allowing you to balance <strong>120 kg of CO2 </strong>monthly. 
								Your ongoing contribution helps restore vital ecosystems, protect biodiversity, and actively combat climate change. 
								By becoming a Yellow Plan member, you're supporting sustainable growth and ensuring a greener planet for future generations. 
								Make a lasting difference today—one tree at a time!</p>
							<p><strong>Plant 5 trees every month</strong></p>
							<p><strong>7kgs of CO2 balanced every month</strong></p>
						</div>
						<div className="product-share">
							<h3>Share this product with your friends</h3>
							<div className="share-content">
								<i class="fab fa-facebook"></i>
								<i class="fab fa-telegram"></i>
								<i class="fab fa-instagram"></i>
							</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GreenPlan);
