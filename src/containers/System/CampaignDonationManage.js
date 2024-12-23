import React, { Component } from "react";
import { connect } from "react-redux";
import "./CampaignDonationManage.scss";
import {
    getAllCampaignDonations,
    createNewCampaignDonationService,
    deleteCampaignDonationService,
    editCampaignDonationService
} from "../../services/campaignDonationService";
import ModalCampaignDonation from "./ModalCampaignDonation";
import ModalEditCampaignDonation from "./ModalEditCampaignDonation";
import { emitter } from "../../utils/emitter";
class CampaignDonationManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //giống với hàm khởi tạo trong OOP
            arrCampaignDonations: [],
            isOpenModalCampaignDonation: false,
            isOpenModalEditCampaignDonation: false,
            campaignDonationEdit: {},
        };
    }
    //hàm này dùng để gọi API
    async componentDidMount() {
        await this.getAllCampaignDonationsFromReact();
    }
    //hàm này dùng để gọi API
    getAllCampaignDonationsFromReact = async () => {
        let response = await getAllCampaignDonations("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                //dùng để re-render lại component
                arrCampaignDonations: response.campaignDonations,
            });
        }
    };
    //hàm này dùng để mở modal
    handleAddNewCampaignDonation = () => {
        this.setState({
            isOpenModalCampaignDonation: true,
        });
    };
    //hàm này dùng để đóng mở modal
    toggleCampaignDonationModal = () => {
        this.setState({
            isOpenModalCampaignDonation: !this.state.isOpenModalCampaignDonation,
        });
    };
    //hàm này dùng để đóng mở modal
    toggleEditCampaignDonationModal = () => {
        this.setState({
            isOpenModalEditCampaignDonation: !this.state.isOpenModalEditCampaignDonation,
        });
    };
    //hàm này dùng để tạo mới campaignDonation
    createNewCampaignDonation = async (data) => {
        try {
            let response = await createNewCampaignDonationService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllCampaignDonationsFromReact();
                this.setState({
                    isOpenModalCampaignDonation: false,
                });
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
            }
        } catch (error) {
            console.log("createNewCampaignDonation error: ", error);
        }
    };
    //hàm này dùng để xóa campaignDonation
    handleDeleteCampaignDonation = async (campaignDonation) => {
        try {
            let response = await deleteCampaignDonationService(campaignDonation.id);
            if (response && response.errCode === 0) {
                await this.getAllCampaignDonationsFromReact();
            } else {
                alert(response.errMessage);
            }
        } catch (error) {
            console.log("handleDeleteCampaignDonation error: ", error);
        }
    };
    handleEditCampaignDonation = (campaignDonation) => {
        this.setState({
            isOpenModalEditCampaignDonation: true,
            campaignDonationEdit: campaignDonation,
        });
    };
    //hàm này dùng để sửa campaignDonation
    doEditCampaignDonation = async (data) => {
        try {
            let response = await editCampaignDonationService(data);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditCampaignDonation: false,
                });
                await this.getAllCampaignDonationsFromReact();
            }else {
                alert(response.errCode);
            }
        } catch (error) {
            console.log("doEditCampaignDonation error: ", error);
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
        console.log("check state: ", this.state);
        let arrCampaignDonations = this.state.arrCampaignDonations;
        return (
            <div className="campaign-donations-container">
                <ModalCampaignDonation
                    isOpen={this.state.isOpenModalCampaignDonation}
                    toggleFromParent={this.toggleCampaignDonationModal}
                    createNewCampaignDonation={this.createNewCampaignDonation}
                />
                {this.state.isOpenModalEditCampaignDonation && (
                    <ModalEditCampaignDonation
                        isOpen={this.state.isOpenModalEditCampaignDonation}
                        toggleFromParent={this.toggleEditCampaignDonationModal}
                        currentCampaignDonation={this.state.campaignDonationEdit}
                        editCampaignDonation = {this.doEditCampaignDonation}
                    />
                )}

                <div className="title text-center">Manage Campaign Donations</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewCampaignDonation()}
                    >
                        <i className="fa fa-plus"></i> Add new Donation
                    </button>
                </div>
                <div className="campaign-donations-table mt-3 mx-2">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User Email</th>
                                <th>Campaign</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrCampaignDonations &&
                                arrCampaignDonations.map((item, index) => {
                                    console.log("check map: ", item, index);
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.user.email}</td>
                                            <td>{item.campaign.title}</td>
                                            <td>{this.formatPrice(item.amount)}</td>
                                            <td>
                                                <button className="btn-edit">
                                                    <i
                                                        className="fa fa-pencil-alt"
                                                        onClick={() =>
                                                            this.handleEditCampaignDonation(
                                                                item
                                                            )
                                                        }
                                                    ></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() =>
                                                        this.handleDeleteCampaignDonation(
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

export default connect(mapStateToProps, mapDispatchToProps)(CampaignDonationManage);
