import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { emitter } from "../../../utils/emitter";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalProduct extends Component {
	//hàm này dùng để khởi tạo state hoặc bind các function
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			description: "",
			price: "",
			image: "",
		};
		this.listenToEmitter();
	}
	//hàm này dùng để lắng nghe sự kiện từ emitter
	listenToEmitter = () => {
		emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
			this.setState({
				name: "",
				description: "",
				price: "",
				image: "",
			});
		});
	}
	componentDidMount() { }
	//hàm này dùng để đóng mở modal
	toggle = () => {
		this.props.toggleFromParent();
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
		let arrInput = ["name", "description", "price", "image"];
		for (let i = 0; i < arrInput.length; i++) {
			if (!this.state[arrInput[i]]) {
				isValid = false;
				alert("Missing parameter: " + arrInput[i]);
				break;
			}
		}
		return isValid;
	}
	//hàm này dùng để thêm mới Product
	handleAddNewProduct = () => {
		let isValid = this.checkValidateInput();
		if (isValid === true) {
			this.props.createNewProduct(this.state);//gọi hàm createNewProduct từ props, ở đây là từ mapDispatchToProps
		}
	}
	render() {
		return (
			<Modal
				isOpen={this.props.isOpen}
				toggle={() => this.toggle()}
				className={"modal-product-container"}
				size="xl"
			>
				<ModalHeader toggle={() => this.toggle()}>
					Create a new Product
				</ModalHeader>
				<ModalBody>
					<div className="modal-product-body">
						<div className="input-container">
							<label>Name</label>
							<input type="text"
								onChange={(event) => this.handleOnChangeInput(event, "name")}
								value={this.state.name}
								className="form-control" />
						</div>
						<div className="input-container">
							<label>Description</label>
							<input type="text"
								onChange={(event) => this.handleOnChangeInput(event, "description")}
								value={this.state.description}
								className="form-control" />
						</div>
						<div className="input-container">
							<label>Price</label>
							<input type="text"
								onChange={(event) => this.handleOnChangeInput(event, "price")}
								value={this.state.price}
								className="form-control" />
						</div>
						<div className="input-container">
							<label>Image Link</label>
							<input
								type="text"
								onChange={(event) =>
									this.handleOnChangeInput(
										event,
										"image"
									)
								}
								value={this.state.image}
								className="form-control"
							/>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" className=" px-3" onClick={() => this.handleAddNewProduct()}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalProduct);
