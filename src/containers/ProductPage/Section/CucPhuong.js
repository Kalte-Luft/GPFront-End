import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "./CucPhuong.scss";
import { withRouter } from "react-router-dom";
import { getAllProducts } from "../../../services/productService";
import { createNewCartService } from "../../../services/cartService";
import AlertContainer from "../../../components/AlertContainer";
const CucPhuong = (props) => {
    const CucPhuongRef = useRef(null); // Ref to target section
    const alertRef = useRef(null);
    const [arrCheckout, setArrCheckout] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [userId, setUserId] = useState(props.userInfo ? props.userInfo.id : null);
    const [productId , setProductId] = useState(4);
    //dùng để scroll đến vị trí cần thiết khi chuyển trang
    useEffect(() => {
        const targetScrollTop1 = props.location?.state.targetScrollTop1 || 0;
        if (CucPhuongRef.current && targetScrollTop1) {
            CucPhuongRef.current.scrollIntoView({ behavior: "auto" });
        }
        if (props.location?.state?.targetScrollTop1) {
            props.history.replace({
                ...props.location,
                state: {
                    ...props.location.state,
                    targetScrollTop1: 0,
                },
            });
        }
        
    }, [props.location, props.history]);

    

    useEffect(() => {
        handleGetAllProducts();
    }, []);

    const handleNavigate = (path) => {
        props.history.push(path);
    };

    const handleGetAllProducts = async() => {
        let response = await getAllProducts("4");
        if (response && response.errCode === 0) {        
            setArrCheckout(response.products);
        }
    }
    const handleAddNewCart = async() => {
        let data = {
            user_id: userId,
            product_id: productId,
            quantity: quantity,
        }
        console.log("data", data);
        try {
            let response = await createNewCartService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            }else{
                showAlert("Add new cart success", "success");
            }
        } catch (error) {
            console.log("handleAddNewCart error", error);
        }
    }
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
                                    min="1"
                                    max="100"
                                    placeholder="1"
                                    value={quantity || ""}
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>
                        <div className="product-purchase-controll">
                            <div className="btn-action">
                                <button className="add-btn"
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
                            <p>
                                <strong>Plant 10 trees every month</strong>
                            </p>
                            <p>
                                <strong>
                                    200kgs of CO2 balanced every month
                                </strong>
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
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps)(CucPhuong));
