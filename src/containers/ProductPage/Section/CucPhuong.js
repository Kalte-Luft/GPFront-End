import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./CucPhuong.scss";
import { withRouter } from "react-router-dom";
import { getAllProducts } from "../../../services/productService";
import { createNewCartService, getCartByUser ,editCartService} from "../../../services/cartService";
import AlertContainer from "../../../components/AlertContainer";


const CucPhuong = (props) => {
	const CucPhuongRef = useRef(null); // Ref to target section
	const alertRef = useRef(null);
	const [arrCheckout, setArrCheckout] = useState(null); //setArrCheckout is a function to update the state of arrCheckout, //arrCheckout is a state to store the data of the product
	const [quantity, setQuantity] = useState(1); //setQuantity is a function to update the state of quantity, //quantity is a state to store the quantity of the product
	const [userId, setUserId] = useState(props.userInfo ? props.userInfo.id : null);//setUserId is a function to update the state of userId, //userId is a state to store the id of the user //useState is a hook to declare a state variable
	const [productId, setProductId] = useState(4);

	//dùng để scroll đến vị trí cần thiết khi chuyển trang
	useEffect(() => {
		const targetScrollTop4 = props.location?.state.targetScrollTop4 || 0;
		if (CucPhuongRef.current && targetScrollTop4) {
			CucPhuongRef.current.scrollIntoView({ behavior: "auto" });
		}
		if (props.location?.state?.targetScrollTop4) {
			props.history.replace({
				...props.location,
				state: {
					...props.location.state,
					targetScrollTop4: 0,
				},
			});
		}
	}, [props.location, props.history]);


	const handleNavigate = (path) => {
		props.history.push(path);
	};


	useEffect(() => {
		handleGetAllProducts();
	}, []);

	const handleGetAllProducts = async () => {
		let response = await getAllProducts("4");
		if (response && response.errCode === 0) { //errCode is a key to check the status of the response === 0 means success
			setArrCheckout(response.products);
		}
	}

	const handleAddNewCart = async () => {
		try {
			// Lấy danh sách giỏ hàng của người dùng
			const cartResponse = await getCartByUser(userId);
			if (cartResponse.errCode !== 0) {
				alert("Failed to retrieve cart data");
				return;
			}
	
			const carts = cartResponse.carts || [];
			const existingCart = carts.find(
				(cart) => cart.user_id === userId && cart.product_id === productId
			);
	
			if (existingCart) {
				// Nếu sản phẩm đã tồn tại, gọi API update (editCartService)
				const updatedQuantity = parseInt(existingCart.quantity, 10) + parseInt(quantity, 10);
				const updateData = {
					id: existingCart.id,
					product_id: productId,
					quantity: updatedQuantity,
				};
				const updateResponse = await editCartService(updateData);
				if (updateResponse.errCode !== 0) {
					alert(updateResponse.errMessage);
				} else {
					showAlert("Quantity updated successfully", "success");
				}
			} else {
				// Nếu sản phẩm chưa tồn tại, thêm mới
				const newCartData = {
					user_id: userId,
					product_id: productId,
					quantity: quantity,
				};
				const addResponse = await createNewCartService(newCartData);
				if (addResponse.errCode !== 0) {
					alert(addResponse.errMessage);
				} else {
					showAlert("Added new product to cart successfully", "success");
				}
			}
		} catch (error) {
			console.error("handleAddNewCart error:", error);
		}
	};
	

	const handleOnChange = (e) => {
		setQuantity(e.target.value);
	}

	const showAlert = (message, type) => {
		if (alertRef.current) {
			alertRef.current.showAlert(message, type);
		}
	};


	return (
		<div className="cucPhuong-container" ref={CucPhuongRef}>
			<div className="cucPhuong-content">
				<div className="cucPhuong-content-left">
					<div className="cucPhuong-image"></div>
				</div>
				<div className="cucPhuong-content-right">
					<div className="title-cucphuong">
						<h1>Cuc Phuong National Park</h1>
						<p>250.000VND</p>
					</div>
					<div className="buy-product-cucphuong">
						<div className="bg">
							<h3>Would you like to buy this product?</h3>
							<p>
								Once you subscribe, we will place a new order
								with this product. You will be automatically
								charged 250.000VND or each order. You can easily
								manage your subscription or cancel it anytime
								with no additional charges.
							</p>

							<span>1 item in the bag</span>
						</div>
						<div className="product-content">
							<div className="product-content-qty">
								<label>
									<span>Quantity:</span>
								</label>
							</div>
							<div className="qty">
								<input
									type="number"
									id="quantity"
									className="quantity"
									min="1" max="100"
									placeholder="1"
									value={quantity || ""}
									onChange={handleOnChange}
								/>
							</div>
						</div>
						<div className="product-purchase-controll">
							<div className="btn-action">
								<button
									className="add-btn"
									onClick={handleAddNewCart}
								>Add to bag</button>

								<button
									className="go-to-check-btn"
									onClick={() => handleNavigate("/checkout")}
								>
									Go to Checkout
								</button>
							</div>
						</div>
						<div className="description">
							<p>
								{arrCheckout?.description}
							</p>
							<p><strong>Plant 10 trees every month</strong></p>
							<p><strong>200kgs of CO2 balanced every month</strong>
							</p>
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
			<AlertContainer ref={alertRef} />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		language: state.app.language,
		userInfo: state.user.userInfo, //userInfo is a key to get the user information
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default withRouter(connect(mapStateToProps)(CucPhuong));
