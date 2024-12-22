import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProductManage.scss";
import {
    getAllProducts,
    createNewProductService,
    deleteProductService,
    editProductService
} from "../../../services/productService";
import ModalProduct from "./ModalProduct";
import ModalEditProduct from "./ModalEditProduct";
import { emitter } from "../../../utils/emitter";
class ProductManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //giống với hàm khởi tạo trong OOP
            arrProducts: [],
            isOpenModalProduct: false,
            isOpenModalEditProduct: false,
            productEdit: {},
        };
    }
    //hàm này dùng để gọi API
    async componentDidMount() {
        await this.getAllProductsFromReact();
    }
    //hàm này dùng để gọi API
    getAllProductsFromReact = async () => {
        let response = await getAllProducts("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                //dùng để re-render lại component
                arrProducts: response.products,
            });
        }
    };
    //hàm này dùng để mở modal
    handleAddNewProduct = () => {
        this.setState({
            isOpenModalProduct: true,
        });
    };
    //hàm này dùng để đóng mở modal
    toggleProductModal = () => {
        this.setState({
            isOpenModalProduct: !this.state.isOpenModalProduct,
        });
    };
    //hàm này dùng để đóng mở modal
    toggleEditProductModal = () => {
        this.setState({
            isOpenModalEditProduct: !this.state.isOpenModalEditProduct,
        });
    };
    //hàm này dùng để tạo mới product
    createNewProduct = async (data) => {
        try {
            let response = await createNewProductService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllProductsFromReact();
                this.setState({
                    isOpenModalProduct: false,
                });
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
            }
        } catch (error) {
            console.log("createNewProduct error: ", error);
        }
    };
    //hàm này dùng để xóa product
    handleDeleteProduct = async (product) => {
        try {
            let response = await deleteProductService(product.id);
            if (response && response.errCode === 0) {
                await this.getAllProductsFromReact();
            } else {
                alert(response.errMessage);
            }
        } catch (error) {
            console.log("handleDeleteProduct error: ", error);
        }
    };
    handleEditProduct = (product) => {
        this.setState({
            isOpenModalEditProduct: true,
            productEdit: product,
        });
    };
    //hàm này dùng để sửa product
    doEditProduct = async (data) => {
        try {
            let response = await editProductService(data);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditProduct: false,
                });
                await this.getAllProductsFromReact();
            } else {
                alert(response.errCode);
            }
        } catch (error) {
            console.log("doEditProduct error: ", error);
        }
    };

    formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'decimal',
            maximumFractionDigits: 0,
        }).format(price);
    };
    
    //life cycle
    // Run component
    // 1. constructor -> init state
    // 2. did mount -> set state
    // 3. render (re-render)

    render() {
        let arrProducts = this.state.arrProducts;
        return (
            <div className="product-container">
                <ModalProduct
                    isOpen={this.state.isOpenModalProduct}
                    toggleFromParent={this.toggleProductModal}
                    createNewProduct={this.createNewProduct}
                />
                {this.state.isOpenModalEditProduct && (
                    <ModalEditProduct
                        isOpen={this.state.isOpenModalEditProduct}
                        toggleFromParent={this.toggleEditProductModal}
                        currentProduct={this.state.productEdit}
                        editProduct={this.doEditProduct}
                    />
                )}

                <div className="title text-center">Manage products</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewProduct()}
                    >
                        <i className="fa fa-plus"></i> Add new product
                    </button>
                </div>
                <div className="products-table mt-3 mx-2">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th style={{ width: "120px" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrProducts &&
                                arrProducts.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>{this.formatPrice(item.price)}</td>

                                            <td>{
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="image"
                                                    style={{ width: "100px" }}
                                                />
                                            }</td>

                                            <td>
                                                <button className="btn-edit">
                                                    <i
                                                        className="fa fa-pencil-alt"
                                                        onClick={() =>
                                                            this.handleEditProduct(
                                                                item
                                                            )
                                                        }
                                                    ></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() =>
                                                        this.handleDeleteProduct(
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
