import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../../utils/emitter';
import { getAllProducts } from '../../../services/productService';
import "react-markdown-editor-lite/lib/index.css";

class ModalDonation extends Component {
	//hàm này dùng để khởi tạo state hoặc bind các function
	constructor(props) {
		super(props);
		this.state = { //cài trạng thái
			user_id: "",
			user_name: "",
			total_amount: "",
			product_details: [],
			date_created: new Date(),
			qr_code: '',

		};
		this.listenToEmitter(); //lang nghe su kien tu emitter de nhan data tu component khac
	}
	//hàm này dùng để lắng nghe sự kiện từ emitter, ở đây là sự kiện clear data của modal
	listenToEmitter = () => {
		emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
			//khi nhan duoc su kien nay thi clear data
			this.setState({ //set state de clear data
				user_id: "",
				user_name: "",
				total_amount: "",
				product_details: [],
				date_created: new Date(),
				qr_code: '',
			});
		});
	};


	componentDidMount() {

	}


	//hàm này dùng để đóng mở modal
	toggle = () => {
		this.props.toggleFromParent();
	};


	//hàm này dùng để lưu giá trị của input vào state
	handleOnChangeInput = (event, id) => {  //id la key cua state can gan gia tri moi
		let copyState = { ...this.state }; //copy state ra 1 object khac de gan gia tri moi cho no
		copyState[id] = event.target.value; //gan gia tri vao copyState dua vao id cua input do
		this.setState({  //set lai state bang copyState moi
			...copyState
		})
	}

	//hàm này dùng để kiểm tra xem input có đúng không
	checkValidateInput = () => { //check xem input co rong hay khong
		let isValid = true; //khoi tao bien isValid = true 
		let arrInput = [ //khoi tao mang arrInput chua cac key cua state
			"user_id",
			"user_name",
			"total_amount",
			"product_details",
			"date_created",
			"qr_code",
		];
		for (let i = 0; i < arrInput.length; i++) { //duyet mang arrInput 
			if (!this.state[arrInput[i]]) { //neu state co gia tri rong 
				isValid = false; //isValid = false
				alert('Missing parameter: ' + arrInput[i]); //thong bao loi
				break; //thoat khoi vong lap
			}
		}
		return isValid; //tra ve isValid = true neu khong co gia tri rong
	}


	//hàm này dùng để thêm mới donation
	handleAddNewDonation = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            // Thêm contentMarkdown và contentHTML vào payload
            const donationData = {
                ...this.state,
            };
            this.props.createNewDonation(donationData); // Gọi hàm để gửi dữ liệu
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
								value={this.state.user_id}
							/>
						</div>

						<div className="input-container">
							<label>User Name:</label>
							<input
								type="text"
								onChange={(event) => { this.handleOnChangeInput(event, 'user_name') }}
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

						{/* Hiển thị bảng thông tin sản phẩm */}
						<table>
							<thead>
								<tr>
									<th>Product ID</th>
									<th>Quantity</th>
								</tr>
							</thead>
							<tbody>
								{this.state.product_details.map((product, index) => (
									<tr key={index}>
										<td>{product.product_id}</td>
										<td>{product.quantity}</td>
									</tr>
								))}
							</tbody>
						</table>

						<div className="input-container">
							<label>Total Amount:</label>
							<input
								type="text"
								onChange={(event) => { this.handleOnChangeInput(event, 'total_amount') }}
								value={this.state.total_amount}
							/>
						</div>

						<div className="input-container">
							<label>QR code:</label>
							<input
								type="text"
								onChange={(event) => { this.handleOnChangeInput(event, 'qr_code') }}
								value={this.state.qr_code}
							/>
						</div>

						<div className="input-container">
							<label>Date Created:</label>
							<input
								type="text"
								onChange={(event) => { this.handleOnChangeInput(event, 'date_created') }}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDonation);
