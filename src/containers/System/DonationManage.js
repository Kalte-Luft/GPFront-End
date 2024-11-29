import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DonationManage.scss";
import {
	getAllDonations,
	createNewDonationService,
	deleteDonationService,
	editDonationService,
} from "../../services/donationService";
import ModalDonation from "./ModalDonation";
import ModalEditDonation from "./ModalEditDonation";
import { emitter } from "../../utils/emitter"; //import emitter
class DonationManage extends Component { //khoi tao constructor de khoi tao state
	constructor(props) {
		super(props);
		this.state = {
			productDetails: [],
			arrDonations: [], //khoi tao mang arrDonation 
			isOpenModalDonation: false, //khi an nut moi hien modal
			isOpenModalEditDonation: false, //khi an nut edit hien modal
			donationEdit: {} //khoi tao donationEdit de chua thong tin donation can edit
		};
	}

	async componentDidMount() {
		await this.getAllDonationsFromReact(); //goi ham getAllDonation de lay du lieu
	}

	getAllDonationsFromReact = async () => { //ham lay du lieu tu api
		let response = await getAllDonations('ALL');//goi ham getAllDonations tu donationService
		if (response && response.errCode === 0) { //neu response tra ve errCode = 0 
			this.setState({  //set state de render lai giao dien
				arrUsers: response.users
			})
		}
	}


	// //hàm này dùng để mở modal
	handleAddNewDonation = () => {
		this.setState({
			isOpenModalDonation: true,
		});
	};

	toggleDonationModal = () => {
		this.setState({
			isOpenModalDonation: !this.state.isOpenModalDonation, //doi trang thai cua isOpenModalUser
		})
	}

	toggleDonationEditModal = () => {
		this.setState({
			isOpenModalEditDonation: !this.state.isOpenModalEditDonation,
		})
	}

	/* life - cycle
1. run component
2. Did mount (set state)    mount = born
3. render
*/


	// hàm này dùng để tạo mới Donation
	createNewDonation = async (data) => { //ham them moi donation
		try {
			let response = await createNewDonationService(data); //goi ham createNewDonationService tu donationService
			if (response && response.errCode !== 0) { //neu response tra ve errCode khac 0
				alert(response.errMessage) //thong bao loi
			} else {
				await this.getAllDonationsFromReact(); //goi ham getAllUsers de lay du lieu
				this.setState({ //set state de render lai giao dien
					isOpenModalDonation: false //dong modal khi them user thanh cong
				})

				emitter.emit('EVENT_CLEAR_MODAL_DATA'); //emit su kien EVENT_CLEAR_MODAL_DATA de clear data
			}
		} catch (e) {
			console.log(e)
		}
	}


	//hàm này dùng để xóa Donation
	handleDeleteDonation = async (donation) => {
		try {
			let res = await deleteDonationService(donation.id); //goi ham createNewDonationService tu donationService de xoa user
			if (res && res.errCode === 0) { //neu response tra ve errCode = 0  
				await this.getAllDonationsFromReact(); //goi ham getAllUsers de lay du lieu 

			} else {
				alert(res.errMessage) //thong bao loi
			}
		} catch (e) {
			console.log(e)
		}

	}

	handleEditDonation = (donation) => {
		this.setState({
			isOpenModalEditDonation: true, //set isOpenModalUser = true de hien modal
			donationEdit: donation, //gan userEdit = user can edit
		})
	}

	// ham nay dung de edit donation
	doEditDonation = async (data) => {
		try {
			let res = await editDonationService(data); //goi ham editUserService tu userService de edit user
			if (res && res.errCode === 0) {
				this.setState({
					isOpenModalEditDonation: false //dong modal khi edit user thanh cong
				})

				await this.getAllDonationsFromReact(); //goi ham getAllUsers de lay du lieu
			} else {
				alert(res.errCode) //thong bao loi
			}
		} catch (e) {
			console.log(e)
		}
	}



	render() {
		let arrDonations = this.state.arrDonations;
		console.log("Donation has: ", arrDonations)
		return (
			<div className="donation-container">
				<ModalDonation
					isOpen={this.state.isOpenModalDonation}//truyen vao isOpenModalUser
					toggleFromParent={this.toggleDonationModal} //truyen vao ham toggleUserModal de dong modal
					createNewDonation={this.createNewDonation} //truyen vao ham createNewUser de them user moi
				/>

				{
					this.state.isOpenModalEditDonation && //neu isOpenModalEditUser = true thi hien modal
					<ModalEditDonation
						isOpen={this.state.isOpenModalEditDonation} //truyen vao isOpenModalUser
						toggleFromParent={this.toggleEditDonationModal} //truyen vao ham toggleUserModal de dong modal
						currentDonation={this.state.donationEdit}//truyen vao userEdit de hien thi thong tin user can edit
						editDonation={this.doEditDonation} //truyen vao ham createNewUser de them user moi
					/>
				}

				<div className="title text-center">Manage Donations</div>
				<div className="mx-1">
					<button
						className="btn btn-primary px-3"
						onClick={() => this.handleAddNewDonation()}
					><i className="fa fa-plus"></i>Add new donation</button>
				</div>
				<div className="donations-table mt-3 mx-1">
					<table id="customers">
						<tbody>
							<tr>
								<th>ID</th>
								<th>User ID</th>
								<th>User Name</th>
								<th>Total Amount</th>
								<th>Project Details</th>
								<th>QR Code</th>
								<th>Date Created</th>
								<th>Actions</th>
							</tr>

							{arrDonations && arrDonations.map((item, index) => {  //in vong lap dung map de duyet mang arrDonations
								return (
									<tr key={index}>
										<td>{item.id}</td>
										<td>{item.user_id.id}</td>
										<td>{item.user_id.name}</td>
										<td>{item.total_amount}</td>
										<td>
											{item.product_details && Array.isArray(item.product_details) ? (
												<ul style={{ maxHeight: "200px", overflowY: "auto", padding: "0", listStyleType: "none" }}>
													{item.product_details.map((detail, idx) => (
														<li key={idx}>
															<strong>{detail.name || "Unnamed Product"}:</strong> {detail.quantity || 0} units
														</li>
													))}
												</ul>
											) : (
												"No details"
											)}
										</td>
										<td>{new Date(item.date_created).toLocaleDateString()}</td>
										<td>{item.qr_code}</td>
										<td>
											<button className="btn-edit" onClick={() => { this.handleEditDonation(item) }}><i className="fas fa-pencil-alt"></i></button>
											<button className="btn-delete" onClick={() => { this.handleDeleteDonation(item) }}><i className="fas fa-trash"></i></button>
										</td>
									</tr>
								)
							})
							}

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

export default connect(mapStateToProps, mapDispatchToProps)(DonationManage);
