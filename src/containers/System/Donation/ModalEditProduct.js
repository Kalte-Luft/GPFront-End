import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { emitter } from "../../../utils/emitter";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _, { add } from "lodash";
class ModalEditProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			description: "",
			price: "",
			image: "",

		};
	}
	//hàm này để lấy dữ liệu từ props truyền vào và set vào state
	componentDidMount() {
		let product = this.props.currentProduct;
		if (!_.isEmpty(product)) {
			this.setState({
				name: product.name,
				description: product.description,
				price: product.price,
				image: product.image,
			});
		}
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
	};
	handleSaveProduct = () => {
		let isValid = this.checkValidateInput();
		if (isValid === true) {
			this.props.editProduct(this.state);
		}
	};
	render() {
		return (
			<Modal
				isOpen={this.props.isOpen}
				toggle={() => this.toggle()}
				className={"modal-product-container"}
				size="lg"
			>
				<ModalHeader toggle={() => this.toggle()}>
					Edit a Product
				</ModalHeader>
				<ModalBody>
					<div className="modal-Product-body">
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
					<Button
						color="primary"
						className=" px-3"
						onClick={() => this.handleSaveProduct()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditProduct);
