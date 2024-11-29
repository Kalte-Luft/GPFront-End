import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DonationManage.scss";
import {
    getAllDonations,
    createNewDonationService,
    deleteDonationService,
    editDonationService,
    getAllProducts,
    getAllUsers
} from "../../../services/donationService";
import ModalDonation from "./ModalDonation";
import ModalEditDonation from "./ModalEditDonation";
import { emitter } from "../../../utils/emitter";
class DonationManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //giống với hàm khởi tạo trong OOP
            arrDonations: [],
            isOpenModalDonation: false,
            isOpenModalEditDonation: false,
            donationEdit: {},
        };
    }
    //hàm này dùng để gọi API
    async componentDidMount() {
        await this.getAllDonationsFromReact();
    }
    //hàm này dùng để gọi API
    getAllDonationsFromReact = async () => {
        let response = await getAllDonations("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                //dùng để re-render lại component
                arrDonations: response.donations,
            });
        }
    };
    //hàm này dùng để mở modal
    handleAddNewDonation = () => {
        this.setState({
            isOpenModalDonation: true,
        });
    };
    //hàm này dùng để đóng mở modal
    toggleDonationModal = () => {
        this.setState({
            isOpenModalDonation: !this.state.isOpenModalDonation,
        });
    };
    //hàm này dùng để đóng mở modal
    toggleEditDonationModal = () => {
        this.setState({
            isOpenModalEditDonation: !this.state.isOpenModalEditDonation,
        });
    };
    //hàm này dùng để tạo mới donation
    createNewDonation = async (data) => {
        try {
            let response = await createNewDonationService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllDonationsFromReact();
                this.setState({
                    isOpenModalDonation: false,
                });
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
            }
        } catch (error) {
            console.log("createNewDonation error: ", error);
        }
    };
    //hàm này dùng để xóa donation
    handleDeleteDonation = async (donation) => {
        try {
            let response = await deleteDonationService(donation.id);
            if (response && response.errCode === 0) {
                await this.getAllDonationsFromReact();
            } else {
                alert(response.errMessage);
            }
        } catch (error) {
            console.log("handleDeleteDonation error: ", error);
        }
    };
    handleEditDonation = (donation) => {
        this.setState({
            isOpenModalEditDonation: true,
            donationEdit: donation,
        });
    };
    //hàm này dùng để sửa donation
    doEditDonation = async (data) => {
        try {
            let response = await editDonationService(data);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditDonation: false,
                });
                await this.getAllDonationsFromReact();
            } else {
                alert(response.errCode);
            }
        } catch (error) {
            console.log("doEditDonation error: ", error);
        }
    };
    //life cycle
    // Run component
    // 1. constructor -> init state
    // 2. did mount -> set state
    // 3. render (re-render)

    render() {
        console.log("check state: ", this.state);
        let arrDonations = this.state.arrDonations;
        return (
            <div className="donations-container">
                <ModalDonation
                    isOpen={this.state.isOpenModalDonation}
                    toggleFromParent={this.toggleDonationModal}
                    createNewDonation={this.createNewDonation}
                />
                {this.state.isOpenModalEditDonation && (
                    <ModalEditDonation
                        isOpen={this.state.isOpenModalEditDonation}
                        toggleFromParent={this.toggleEditDonationModal}
                        currentDonation={this.state.donationEdit}
                        editDonation={this.doEditDonation}
                    />
                )}

                <div className="title text-center">Manage donations with Nghia & Khanh</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewDonation()}
                    >
                        <i className="fa fa-plus"></i> Add new donation
                    </button>
                </div>
                <div className="donations-table mt-3 mx-2">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User ID</th>
                                <th>User</th>
                                <th>Product</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrDonations &&
                                arrDonations.map((item, index) => {
                                    console.log("check map: ", item, index);
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>

                                            <td>
                                                <button className="btn-edit">
                                                    <i
                                                        className="fa fa-pencil-alt"
                                                        onClick={() =>
                                                            this.handleEditDonation(
                                                                item
                                                            )
                                                        }
                                                    ></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() =>
                                                        this.handleDeleteDonation(
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

export default connect(mapStateToProps, mapDispatchToProps)(DonationManage);
