import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./OrangePlan.scss";
import Aoe from "aoejs"; // Import Aoejs
import { withRouter } from "react-router-dom";

const OrangePlan = (props) => {
  const orangePlanRef = useRef(null); // Ref to target section

  //hàm chuyển trang
   useEffect(() => {
	console.log(props);
	 const targetScrollTop2 = props.location?.state.targetScrollTop2 || 0;
	 if (orangePlanRef.current && targetScrollTop2) {
		orangePlanRef.current.scrollIntoView({ behavior: "auto" });
	 }
	if (props.location?.state?.targetScrollTop2) {
		props.history.replace({
		  ...props.location,
		  state: {
			...props.location.state,
			targetScrollTop2: 0,
		  },
		});
	  }
	}, [props.location,props.history]);
	
	 
	return (
		<div className="OrangePlan-container" ref={orangePlanRef}>
			<div className="OrangePlan-content">
				<div className="OrangePlan-content-left">
					<div className="OrangePlan-image">
					</div>
				</div>
				<div className="OrangePlan-content-right">
					<div className="title-OrangePlan">
						<h1>Orange Plan</h1>
						<p>360.000VND</p>
					</div>
					<div className="buy-product-OrangePlan">
						<div className="bg">
							<h3>Would you like to buy this product?</h3>
							<p>Once you subscribe, we will place a new order with this product.
								You will be automatically charged 360.000VND or each order.
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
							<p> Join the Orange Plan membership and plant 12 trees each month, 
								amplifying your positive environmental impact. 
								Each tree sequesters 20 kg of CO2, allowing you to balance <strong>240 kg of CO2 </strong>monthly. 
								Your ongoing contribution helps restore vital ecosystems, protect biodiversity, and actively combat climate change. 
								By becoming a Orange Plan member, you're supporting sustainable growth and ensuring a greener planet for future generations. 
								Make a lasting difference today—one tree at a time!</p>
							<p><strong>Plant 7 trees every month</strong></p>
							<p><strong>140kgs of CO2 balanced every month</strong></p>
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

export default withRouter(connect(mapStateToProps)(OrangePlan));
