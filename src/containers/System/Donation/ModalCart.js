import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { emitter } from "../../../utils/emitter";
import { getAllProducts } from "../../../services/cartService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalCart extends Component {
	//hàm này dùng để khởi tạo state hoặc bind các function
	constructor(props) {
		super(props);
		this.state = {
			user_id: "",
			productList: [],
			quantity: "",
			status: "",
			purchase_at: new Date(),
		};
		this.listenToEmitter();
	}
	//hàm này dùng để lắng nghe sự kiện từ emitter
	listenToEmitter = () => {
		emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
			this.setState({
				user_id: "",
				productList: [],
				quantity: "",
				status: "",
				purchase_at: new Date(),
			});
		});
	}
	componentDidMount() {
		this.loadProducts();
	}
	//hàm này dùng để đóng mở modal
	toggle = () => {
		this.props.toggleFromParent();
	};
	loadProducts = async () => {
		try {
			let response = await getAllProducts("ALL");
			console.log(response)
			if (response && response.errCode === 0) {
				console.log("Setting Product List:", response.Products);
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
	//hàm này dùng để lưu giá trị của input vào state
	handleOnChangeInput = (event, id) => {
		//good code
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		this.setState({
			...copyState,
		});
	}
	//hàm này dùng để kiểm tra xem input có đúng không
	checkValidateInput = () => {
		let isValid = true;
		let arrInput = ["user_id", "product_id", "quantity", "status", "purchase_at"];
		for (let i = 0; i < arrInput.length; i++) {
			if (!this.state[arrInput[i]]) {
				isValid = false;
				alert("Missing parameter: " + arrInput[i]);
				break;
			}
		}
		return isValid;
	}

	//hàm này dùng để thêm mới Cart
	handleAddNewCart = () => {
		let isValid = this.checkValidateInput();
		if (isValid === true) {
			this.props.createNewCart(this.state);//gọi hàm createNewCart từ props, ở đây là từ mapDispatchToProps
		}
	}
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
										event,
										"product_id"
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
					<Button color="primary" className=" px-3" onClick={() => this.handleAddNewCart()}>
						Add New
					</Button>{" "}
					<Button color="secondary" className=" px-3" onClick={() => this.toggle()}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCart);
