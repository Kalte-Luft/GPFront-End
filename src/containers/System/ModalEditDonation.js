import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProducts } from "../../services/donationService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _, { add } from "lodash";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ModalEditDonation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: "",
			user_name: "",
			total_amount: "",
			product_details: [],
			date_created: new Date(),
			qr_code: '',
		};
	}

	//hàm này dùng để lấy dữ liệu từ props truyền vào và set vào state
	componentDidMount() {
		let donation = this.props.currentDonation;
		if (!_.isEmpty(donation)) {
			this.setState({
				...donation,
				date_created: new Date(donation.date_created)
					.toISOString()
					.split("T")[0],
			});
		}
	}

	toggle = () => {
		this.props.toggleFromParent();
	};

	handleOnChangeInput = (event, id) => {  //id la key cua state can gan gia tri moi
		let copyState = { ...this.state }; //copy state ra 1 object khac de gan gia tri moi cho no
		copyState[id] = event.target.value; //gan gia tri vao copyState dua vao id cua input do
		this.setState({  //set lai state bang copyState moi
			...copyState
		})
	}

	checkValidateInput = () => {
		let isValid = true;  //khoi tao bien isValid = true 
		let arrInput = [
			"user_id",
			"user_name",
			"total_amount",
			"product_details",
			"date_created",
			"qr_code",
		]; //tao 1 mang chua cac key cua state
		for (let i = 0; i < arrInput.length; i++) { //duyet mang arrInput 
			if (!this.state[arrInput[i]]) { //neu state co gia tri rong 
				isValid = false; //isValid = false
				alert('Missing parameter: ' + arrInput[i]); //thong bao loi
				break; //thoat khoi vong lap
			}
		}
		return isValid; //tra ve isValid = true neu khong co gia tri rong
	}

	handleSaveDonation = () => {
		let isValid = this.checkValidateInput();
		if (isValid === true) {
			this.props.editDonation(this.state);
		}
	};

	addProductDetail = () => {
		this.setState(prevState => ({
			product_details: [
				...prevState.product_details,
				{ product_id: "", quantity: 1 } // Khởi tạo với giá trị mặc định
			]
		}));
	};

	removeProductDetail = (index) => {
		const updatedProductDetails = this.state.product_details.filter((_, i) => i !== index);
		this.setState({ product_details: updatedProductDetails });
	};

	handleProductDetailsChange = (index, field, value) => {
		const updatedProductDetails = [...this.state.product_details];
		updatedProductDetails[index][field] = value;
		this.setState({ product_details: updatedProductDetails });
	};

	render() {

		return (
			<Modal
				isOpen={this.props.isOpen}
				toggle={() => this.toggle()}
				className={"modal-donation-container"}
				size="xl"
			>
				<ModalHeader toggle={() => this.toggle()}>Create a new Donation</ModalHeader>
				<ModalBody>
					<div className="modal-donation-body">
						<div className="input-container">
							<label>User ID:</label>
							<input
								type="text"
								onChange={(event) => { this.handleOnChangeInput(event, 'user_id') }}
								value={this.state.user_id} //gan gia tri cua state email cho input do
							/>
						</div>

						<div className="input-container">
							<label>User Name:</label>
							<input
								type="text"
								onChange={(event) => { this.handleOnChangeInput(event, 'user_name') }} //goi ham handleOnChangeInput de gan gia tri moi cho state password
								value={this.state.user_name}
							/>
						</div>

						<div className="form-group">
							<label>Product Details</label>
							<div>
								{this.state.product_details.map((product, index) => (
									<div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
										<input
											type="text"
											placeholder="Product ID"
											value={product.product_id}
											onChange={(e) => this.handleProductDetailsChange(index, "product_id", e.target.value)}
										/>
										<input
											type="number"
											placeholder="Quantity"
											value={product.quantity}
											onChange={(e) => this.handleProductDetailsChange(index, "quantity", e.target.value)}
										/>
										<button onClick={() => this.removeProductDetail(index)}>Remove</button>
									</div>
								))}
								<button onClick={this.addProductDetail}>Add Product</button>
							</div>
						</div>


						<div className="input-container">
							<label>Total Amount:</label>
							<input
								type="text"
								onChange={(event) => { this.handleOnChangeInput(event, 'total_amount') }} //goi ham handleOnChangeInput de gan gia tri moi cho state firstName
								value={this.state.total_amount}
							/>
						</div>

						<div className="input-container">
							<label>QR code:</label>
							<input
								type="text"
								onChange={(event) => { this.handleOnChangeInput(event, 'qr_code') }} //goi ham handleOnChangeInput de gan gia tri moi cho state firstName
								value={this.state.qr_code}
							/>
						</div>

						<div className="input-container">
							<label>Date Created:</label>
							<input
								type="text"
								onChange={(event) => { this.handleOnChangeInput(event, 'date_created') }} //goi ham handleOnChangeInput de gan gia tri moi cho state firstName
								value={this.state.date_created}
							/>
						</div>
					</div>

				</ModalBody>
				<ModalFooter>
					<Button
						color="primary"
						className="px-3"
						onClick={() => { this.handleAddNewDonation() }}> Add new </Button>{' '}
					<Button
						color="secondary"
						className="px-3"
						onClick={() => { this.toggle() }}> Close </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditDonation);
