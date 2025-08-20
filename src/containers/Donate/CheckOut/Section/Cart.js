import React, { Component } from "react";
import { connect } from "react-redux";
import "./Cart.scss";
import { withRouter } from "react-router-dom";
import { getCartByUser, deleteCartService, editCartService } from "../../../../services/cartService";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { createNewDonationService } from "../../../../services/donationService";
import AlertContainer from "../../../../components/AlertContainer";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.userInfo ? this.props.userInfo.id : "",
            arrCarts: [], //gồm image, name, quantity, total
            total_amount: "",
            status_purchased: "purchased",
            isOpenModalQR: false,
        };
		// tạo ref
		this.alertRef = React.createRef();
    }
    handleNavigate = (path) => {
        this.props.history.push(path);
    };

    formatPrice = (amount) => {
        if (!amount) return "0";
        // Tính tổng số tiền (cộng thêm 10%)
        const finalAmount = amount;
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 0,
        }).format(finalAmount); // Định dạng dưới dạng tiền tệ
    };

    async componentDidMount() {
        await this.getAllCartsFromReact();
        this.setState({
            total_amount: this.calculateTotalAmount(),
        });
        console.log("state", this.state);
    }

    //hàm này dùng để gọi API
    getAllCartsFromReact = async () => {
        let response = await getCartByUser(this.state.user_id, "pending");
        if (response && response.errCode === 0) {
            this.setState({
                //dùng để re-render lại component
                arrCarts: response.carts,
            });
        }
    };

	showAlert = (message, type) => {
		if (this.alertRef.current) {
			this.alertRef.current.showAlert(message, type);
		}
	};

    handleDeleteCart = async (cart) => {
        try {
            let response = await deleteCartService(cart.id);
            if (response && response.errCode === 0) {
                await this.getAllCartsFromReact();
            } else {
                alert(response.errMessage);
            }
        } catch (e) {
            console.log("handleDeleteDonation error: ", e);
        }
    };

    calculateSubtotal = () => {
        const { arrCarts } = this.state;
        let subtotal = 0;
        if (arrCarts && arrCarts.length > 0) {
            subtotal = arrCarts.reduce((acc, item) => {
                //acc là giá trị tích lũy, item là phần tử hiện tại
                const itemTotal = parseFloat(item.total) || 0; // Chuyển đổi thành số, dùng 0 nếu không hợp lệ
                return acc + itemTotal;
            }, 0);
        }
        return subtotal;
    };

    // Tính tổng số tiền (cộng thêm 10%)
    calculateTotalAmount = () => {
        const { arrCarts } = this.state;
        let total_amount = 0;
        if (arrCarts && arrCarts.length > 0) {
            total_amount = arrCarts.reduce((acc, item) => {
                const itemTotal = parseFloat(item.total) || 0;
                return acc + itemTotal;
            }, 0);
        }

        const result = total_amount * 1.1;
        return result;
    };

    toggle = () => {
        this.setState({
            isOpenModalQR: !this.state.isOpenModalQR,
        });
    };

    handleAddNewDonation = async () => {
        const { total_amount, user_id, arrCarts } = this.state;
        console.log("biến truyền vào để tạo donation", { total_amount, user_id });
        try {
            let response = await createNewDonationService({
                total_amount: total_amount,
                user_id: user_id,
            });
            if (response && response.errCode === 0) {
                console.log("Donation created successfully. Updating all carts...");

                try {
                    // Sử dụng Promise.all để thực hiện các lời gọi API đồng thời
                    const updatePromises = arrCarts.map((cart) =>
                        editCartService({
                            id: cart.id,
                            product_id: cart.product_id,
                            quantity: cart.quantity,
                            user_id: cart.user_id,
                            status: "purchased",
                        })
                    );

                    // Chờ tất cả lời gọi API hoàn thành
                    await Promise.all(updatePromises);

                    console.log("All carts updated successfully.");
                } catch (error) {
                    console.error("Error updating carts:", error);
                }
                await this.getAllCartsFromReact();
                this.showAlert("Donation created successfully", "success");
            }
        } catch (error) {
            console.log("handleAddNewCampaignDonation error: ", error);
        }
    };
    render() {
        const { userInfo } = this.props; // Lấy thông tin người dùng từ props
        const userEmail = userInfo ? userInfo.email : ""; // Nếu có userInfo thì lấy email, nếu không thì để trống
        let arrCarts = this.state.arrCarts;
        let isOpenModalQR = this.state.isOpenModalQR;
        return (
            <React.Fragment>
                {isOpenModalQR && (
                    <Modal
                        isOpen={isOpenModalQR} //này là biến boolean để check xem modal có mở hay không
                        toggle={() => this.toggle()} //này là hàm để đóng mở modal
                        className={"modal-email-container"}
                        size="ml"
                    >
                        <ModalHeader toggle={() => this.toggle()}>Please pay to continue</ModalHeader>
                        <ModalBody>
                            <div className="modal-email-body">
                                <div className="input-container">
                                    <label>Before changing your account, you will need to enter the code we sent to </label>
                                    <label
                                        style={{
                                            marginTop: "10px",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Enter the code
                                    </label>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>
                )}
                <div className="Cart-container">
                    <div className="banner"></div>
                    <div className="cart_content">
                        <div className="left_content">
                            <div className="left_content_inner">
                                <div className="page_title">
                                    <h1>Shopping Cart</h1>
                                </div>
                                <div className="cart_item">
                                    {arrCarts.length > 0 ? (
                                        arrCarts &&
                                        arrCarts.map((item) => (
                                            <div className="cart_item_inner">
                                                <div className="cart_item_content">
                                                    <div className="cart_item_img">
                                                        {item.product.image && (
                                                            <img
                                                                src={item.product.image}
                                                                alt={item.product.name}
                                                                style={{
                                                                    width: "70px",
                                                                    height: "70px",
                                                                    marginRight: "11px",
                                                                    borderRadius: "5px",
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="cart_item_wrap">
                                                        <div className="cart_item_wrap_top">
                                                            <div className="name_item">
                                                                <p>{item.product.name}</p>
                                                            </div>
                                                            <div className="remove_item">
                                                                <span className="item-name">
                                                                    <button className="remove_button" onClick={() => this.handleDeleteCart(item)}>
                                                                        <i class="fa fa-times" aria-hidden="true"></i>
                                                                    </button>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="cart_item_wrap_bottom">
                                                            <div className="cart_item_quantity">
                                                                <div className="cart_item_quantity_inner">
                                                                    <span className="seclect_quantity">Quantity: {item.quantity}</span>
                                                                    <div className="arrow_column">
                                                                        <div className="arrow">▲</div>
                                                                        <div className="arrow">▼</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="cart_item_price">
                                                                <div className="cart_item_price_inner">{this.formatPrice(item.total)}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Your cart is empty.</p>
                                    )}
                                </div>
                                <hr></hr>
                                <table className="summary">
                                    <tbody className="summary_body">
                                        <tr className="summary_row_item">
                                            <td className="summary_row_item_title">Subtotal</td>
                                            <td className="summary_row_item_price">{this.formatPrice(this.calculateSubtotal())}</td>
                                        </tr>
                                        <tr className="summary_row_tip">
                                            <td className="summary_row_tip_title">Tip</td>
                                            <td className="summary_row_tip_price">10%</td>
                                        </tr>
                                    </tbody>
                                    <tbody className="summary_body">
                                        <tr className="summary_row_total">
                                            <td className="summary_row_total_title">Total</td>
                                            <td className="summary_row_total_price">
                                                <span className="summary_total">{this.formatPrice(this.calculateTotalAmount())}</span>
                                            </td>
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
                        <div className="center-content"></div>
                        <div className="right_content">
                            <div className="right_content_inner">
                                <div className="right_title">
                                    <h1>Checkout</h1>
                                </div>
                                <div className="right_email">
                                    <div className="right_email_text">
                                        <p>This address will be used to send you order status updates.</p>{" "}
                                    </div>
                                    <div className="email_container">
                                        <input
                                            type="email"
                                            className="email_input"
                                            placeholder="Enter your email"
                                            required
                                            value={userEmail} // Gán giá trị email của người dùng
                                            readOnly // Giúp ngừng chỉnh sửa nếu không muốn người dùng sửa email
                                        />
                                    </div>
                                </div>
                                <div className="right_checkout_needAgreement">
                                    <div className="right_checkout_button">
                                        <button className="checkout_button" onClick={() => this.handleAddNewDonation()}>
                                            Checkout
                                        </button>
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
				<AlertContainer ref={this.alertRef} />
            </React.Fragment>
        );
    }
}

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
