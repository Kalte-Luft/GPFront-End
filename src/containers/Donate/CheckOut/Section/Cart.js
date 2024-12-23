import React, { Component } from "react";
import { connect } from "react-redux";
import "./Cart.scss";
import { withRouter } from "react-router-dom";

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			CheckOut: [],
		};
	}
	handleNavigate = (path) => {
		this.props.history.push(path);
	};
	render() {
		return (
			<div className="Cart-container">
				<div className="banner"></div>
				<div className="cart_content">
					<div className="left_content">
						<div className="left_content_inner">
							<div className="page_title">
								<h1>Shopping Cart</h1>
							</div>
							<div className="cart_item">
								<div className="cart_item_inner">
									<div className="cart_item_content">
										<div className="cart_item_img">
										</div>
										<div className="cart_item_wrap">
											<div className="cart_item_wrap_top">
												<div className="name_item">
													<p>Yellow Plan: 18 Trees Planted One Time</p>
												</div>
												<div className="remove_item">
													<span className="item-name">
														<button
															className="remove_button">
															<i class="fa fa-times" aria-hidden="true"></i>
														</button>
													</span>
												</div>
											</div>
											<div className="cart_item_wrap_bottom">
												<div className="cart_item_quantity">
													<div className="cart_item_quantity_inner">
														<span className="seclect_quantity">
															Quantity: 1
														</span>
														<div className="arrow_column">
															<div className="arrow">▲</div>
															<div className="arrow">▼</div>
														</div>
													</div>
												</div>
												<div className="cart_item_price">
													<div className="cart_item_price_inner">
														180,000 VND
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<hr></hr>
							<table className="summary">
								<tbody className="summary_body">
									<tr className="summary_row_item">
										<td className="summary_row_item_title">Subtotal</td>
										<td className="summary_row_item_price">250.000</td>
									</tr>
									<tr className="summary_row_tip">
										<td className="summary_row_tip_title">Tip</td>
										<td className="summary_row_tip_price">0</td>
									</tr>
								</tbody>
								<tbody className="summary_body">
									<tr className="summary_row_total">
										<td className="summary_row_total_title">Total</td>
										<td className="summary_row_total_price"><span className="summary_total">250,000</span></td>
									</tr>
								</tbody>
							</table>
							<div className="shopping_continue">
								<div className="shopping_continue_inner">
									Looking for more trees to plant?
									<p> Continue choosing</p>
								</div>
							</div>
						</div>			
					</div>
					<div className="center-content">
					</div>
					<div className="right_content">
						<div className="right_content_inner">
							<div className="right_title">
								<h1>Checkout</h1>
							</div>
							<div className="right_email">
								<div className="right_email_text"><p>Enter your email address. This address will be used to send you order status updates.</p> </div>
								<div className="email_container">
									<input
										type="email"
										className="email_input"
										placeholder="Enter your email"
										required
									/>
								</div>
							</div>
							<div className="right_checkout_needAgreement">
								<div className="right_checkout_button">
									<button className="checkout_button">Checkout</button>
								</div>
								<div className="right_checkout_needAgreement_text">
									<i className="fas fa-lock"></i>
									<p>All data is transmitted encrypted via a secure TLS connection.</p>
								</div>
							</div>

							<div className="right_next">
								<hr></hr>
								<div className="next_top">
									<h3>Payment information</h3>
									<p>Choose a payment method and enter your payment details.</p>
								</div>
								<div className="next_bottom">
									<h3>Order confirmation</h3>
									<p>Place your order and receive a confirmation email.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		);
	}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
