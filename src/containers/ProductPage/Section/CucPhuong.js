import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./CucPhuong.scss";
import Aoe from "aoejs"; // Import Aoejs
import { withRouter } from "react-router-dom";

const CucPhuong = (props) => {
  const CucPhuongRef = useRef(null); // Ref to target section

  //dùng để scroll đến vị trí cần thiết khi chuyển trang
  useEffect(() => {
	console.log(props);
	const targetScrollTop1 = props.location?.state.targetScrollTop1 || 0;
	if (CucPhuongRef.current && targetScrollTop1) {
		CucPhuongRef.current.scrollIntoView({ behavior: "auto" });
	}
	
  }, [props.location]);

	return (
		<div className="cucPhuong-container" ref={CucPhuongRef}>
			<div className="cucPhuong-content">
				<div className="cucPhuong-content-left">
					<div className="cucPhuong-image">
					</div>
				</div>
				<div className="cucPhuong-content-right">
					<div className="title-cucphuong">
						<h1>Cuc Phuong National Park</h1>
						<p>250.000VND</p>
					</div>
					<div className="buy-product-cucphuong">
						<div className="bg">
							<h3>Would you like to buy this product?</h3>
							<p>Once you subscribe, we will place a new order with this product.
								You will be automatically charged 250.000VND or each order.
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
							<p> Join the Cuc Phuong National Forest and donate 8 tree,
								amplifying your positive impact on the environment.
								Each tree absorbs 10 kg of CO2, allowing you to balance <strong>180 kg of CO2</strong> per month.
								Your continued contribution helps restore vital ecosystems, protect biodiversity and actively combat climate change.
								By becoming a Cuc Phuong National Forest member, you are supporting sustainable growth and ensuring a greener planet for future generations.
								Make a lasting difference today—one tree at a time!</p>
							<p><strong>Plant 10 trees every month</strong></p>
							<p><strong>200kgs of CO2 balanced every month</strong></p>
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

export default withRouter(connect(mapStateToProps)(CucPhuong));
