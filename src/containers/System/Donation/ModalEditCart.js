import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _, { add } from "lodash";
import { getAllProducts } from "../../../services/productService";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ModalEditCart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: "",
			productList: [],
			quantity: "",
			status: "",
			purchased_at: new Date(),
		};
	}
	//hàm này dùng để lấy dữ liệu từ props truyền vào và set vào state
	componentDidMount() {
		let cart = this.props.currentCart;
		if (!_.isEmpty(cart)) {
			this.setState({
				...cart,
				purchased_at: new Date(cart.purchased_at)
					.toISOString()
					.split("T")[0],
				status: cart.status,
				
			});
		}
		this.loadProducts();
	}
	toggle = () => {
		this.props.toggleFromParent();
	};
	handleOnChangeInput = (event, id) => {
		//good code
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		this.setState({
			...copyState,
		});
	};
	loadProducts = async () => {
		try {
			let response = await getAllProducts("ALL");
			console.log(response)
			if (response && response.errCode === 0) {
				this.setState({
					productList: response.products || [], // Đảm bảo luôn gán giá trị mảng
				});
				console.log(this.state.productList)

			} else {
				console.error(
					"Failed to fetch Products: ",
					response.errMessage
				);
			}
		} catch (error) {
			console.error("Error while fetching Products: ", error);
		}
	};


	checkValidateInput = () => {
		let isValid = true;
		let arrInput = [
			"user_id",
			"product_id",
			"quantity",
			"purchased_at",
			"status",			
		];
		for (let i = 0; i < arrInput.length; i++) {
			if (!this.state[arrInput[i]]) {
				isValid = false;
				alert("Missing parameter: " + arrInput[i]);
				break;
			}
		}
		return isValid;
	};
	handleSaveCart = () => {
		let isValid = this.checkValidateInput();
		if (isValid === true) {
			this.props.editCart(this.state);
		}
	};
	render() {
		return (
			<Modal
				isOpen={this.props.isOpen}
				toggle={() => this.toggle()}
				className={"modal-cart-container"}
				size="xl"
			>
				<ModalHeader toggle={() => this.toggle()}>
					Create a new Cart
				</ModalHeader>
				<ModalBody>
					<div className="modal-cart-body">
						<div className="input-container">
							<label>User ID</label>
							<input type="text"
								onChange={(event) => this.handleOnChangeInput(event, "user_id")}
								value={this.state.user_id}
								className="form-control"
							/>
						</div>
						<div className="input-container">
							<label>Product</label>
							<select
								className="form-control"
								onChange={(event) =>
									this.handleOnChangeInput(
										event,"product_id"
									)
								}
								value={this.state.product_id}
							>
								<option value="">Select a Product</option>
								{this.state.productList.map((product) => (
									<option
										key={product.id}
										value={product.id}
									>
										{product.name}
									</option>
								))}
							</select>
						</div>
						<div className="input-container">
							<label>quantity</label>
							<input type="text"
								onChange={(event) => this.handleOnChangeInput(event, "quantity")}
								value={this.state.quantity}
								className="form-control" />
						</div>
						<div className="input-container">
                            <label>Purchased At</label>
                            <input
                                type="date"
                                className="form-control"
								value={this.state.purchased_at}
                                onChange={(event) =>
                                    this.handleOnChangeInput(
                                        event,
                                        "purchased_at"
                                    )
                                }
                            />
                        </div>
						<div className="input-container">
							<label>Status</label>
							<select
								className="form-control"
								value={this.state.status}
								onChange={(event) =>
									this.handleOnChangeInput(event, "status")
								}
							>
								<option value="">Select status</option>
								<option value="pending">Pending </option>
								<option value="purchased">Purchased</option>
							</select>
						</div>
						
					</div>
				</ModalBody>
				<ModalFooter>
                    <Button
                        color="primary"
                        className=" px-3"
                        onClick={() => this.handleSaveCart()}
                    >
                        Save Change
                    </Button>{" "}
                    <Button
                        color="secondary"
                        className=" px-3"
                        onClick={() => this.toggle()}
                    >
                        Close
                    </Button>
                </ModalFooter>
			</Modal>);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCart);
