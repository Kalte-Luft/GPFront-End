import React, { Component } from "react";
import { connect } from "react-redux";
import "./CartManage.scss";
import {
    getAllCarts,
    createNewCartService,
    deleteCartService,
    editCartService
} from "../../../services/cartService";
import ModalCart from "./ModalCart";
import ModalEditCart from "./ModalEditCart";
import { emitter } from "../../../utils/emitter";
class CartManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //giống với hàm khởi tạo trong OOP
            arrCarts: [],
            isOpenModalCart: false,
            isOpenModalEditCart: false,
            cartEdit: {},
        };
    }
    //hàm này dùng để gọi API
    async componentDidMount() {
        await this.getAllCartsFromReact();
    }
    //hàm này dùng để gọi API
    getAllCartsFromReact = async () => {
        let response = await getAllCarts("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                //dùng để re-render lại component
                arrCarts: response.carts,
            });
        }
    };
    //hàm này dùng để mở modal
    handleAddNewCart = () => {
        this.setState({
            isOpenModalCart: true,
        });
    };
    //hàm này dùng để đóng mở modal
    toggleCartModal = () => {
        this.setState({
            isOpenModalCart: !this.state.isOpenModalCart,
        });
    };
    //hàm này dùng để đóng mở modal
    toggleEditCartModal = () => {
        this.setState({
            isOpenModalEditCart: !this.state.isOpenModalEditCart,
        });
    };
    //hàm này dùng để tạo mới Cart
    createNewCart = async (data) => {
        try {
            let response = await createNewCartService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllCartsFromReact();
                this.setState({
                    isOpenModalCart: false,
                });
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
            }
        } catch (error) {
            console.log("createNewCart error: ", error);
        }
    };
    //hàm này dùng để xóa Cart
    handleDeleteCart = async (cart) => {
        try {
            let response = await deleteCartService(cart.id);
            if (response && response.errCode === 0) {
                await this.getAllCartsFromReact();
            } else {
                alert(response.errMessage);
            }
        } catch (error) {
            console.log("handleDeleteCart error: ", error);
        }
    };
    handleEditCart = (cart) => {
        this.setState({
            isOpenModalEditCart: true,
            cartEdit: cart,
        });
    };
    //hàm này dùng để sửa Cart
    doEditCart = async (data) => {
        try {
            let response = await editCartService(data);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditCart: false,
                });
                await this.getAllCartsFromReact();
            } else {
                alert(response.errCode);
            }
        } catch (error) {
            console.log("doEditCart error: ", error);
        }
    };

    formatPrice = (amount) => {
        if (!amount) return "0";
        // Tính tổng số tiền (cộng thêm 10%)
        const finalAmount = amount ; 
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0,
        }).format(finalAmount);  // Định dạng dưới dạng tiền tệ
    };

    //life cycle
    // Run component
    // 1. constructor -> init state
    // 2. did mount -> set state
    // 3. render (re-render)

    render() {
        let arrCarts = this.state.arrCarts;
        return (
            <div className="cart-container">
                <ModalCart
                    isOpen={this.state.isOpenModalCart}
                    toggleFromParent={this.toggleCartModal}
                    createNewCart={this.createNewCart}
                />
                {this.state.isOpenModalEditCart && (
                    <ModalEditCart
                        isOpen={this.state.isOpenModalEditCart}
                        toggleFromParent={this.toggleEditCartModal}
                        currentCart={this.state.cartEdit}
                        editCart={this.doEditCart}
                    />
                )}

                <div className="title text-center">Manage Carts</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewCart()}
                    >
                        <i className="fa fa-plus"></i> Add new Cart
                    </button>
                </div>
                <div className="carts-table mt-3 mx-2">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Cart ID</th>
                                <th>User ID</th>
                                <th>User</th>
                                <th>Product ID</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>                              
                            </tr>
                        </thead>
                        <tbody>
                            {arrCarts &&
                                arrCarts.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.user_id}</td>
                                            <td>{item.user.name}</td>
                                            <td>{item.product_id}</td>
                                            <td>{item.quantity}</td>
                                            <td>{this.formatPrice(item.total)}</td>
                                            <td>{item.status}</td>

                                            <td>
                                                <button className="btn-edit">
                                                    <i
                                                        className="fa fa-pencil-alt"
                                                        onClick={() =>
                                                            this.handleEditCart(
                                                                item
                                                            )
                                                        }
                                                    ></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() =>
                                                        this.handleDeleteCart(
                                                            item
                                                        )
                                                    }
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CartManage);
