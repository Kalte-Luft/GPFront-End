import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./CampaignManage.scss";
import {
    getAllCampaigns,
    createNewCampaignService,
    deleteCampaignService,
    editCampaignService,
} from "../../services/campaignService";
import ModalCampaign from "./ModalCampaign";
import ModalEditCampaign from "./ModalEditCampaign";
import { emitter } from "../../utils/emitter";
class CampaignManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //giống với hàm khởi tạo trong OOP
            arrCampaigns: [],
            isOpenModalCampaign: false,
            isOpenModalEditCampaign: false,
            campaignEdit: {},
        };
    }
    I;
    async componentDidMount() {
        await this.getAllCampaignsFromReact();
    }
    //hàm này dùng để gọi API
    getAllCampaignsFromReact = async () => {
        let response = await getAllCampaigns("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                //dùng để re-render lại component
                arrCampaigns: response.campaigns,
            });
        }
    };
    //hàm này dùng để mở modal
    handleAddNewCampaign = () => {
        this.setState({
            isOpenModalCampaign: true,
        });
    };
    //hàm này dùng để đóng mở modal
    toggleCampaignModal = () => {
        this.setState({
            isOpenModalCampaign: !this.state.isOpenModalCampaign,
        });
    };
    //hàm này dùng để đóng mở modal
    toggleEditCampaignModal = () => {
        this.setState({
            isOpenModalEditCampaign: !this.state.isOpenModalEditCampaign,
        });
    };
    //hàm này dùng để tạo mới campaign
    createNewCampaign = async (data) => {
        try {
            let response = await createNewCampaignService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllCampaignsFromReact();
                this.setState({
                    isOpenModalCampaign: false,
                });
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
            }
        } catch (error) {
            console.log("createNewCampaign error: ", error);
        }
    };
    //hàm này dùng để xóa campaign
    handleDeleteCampaign = async (campaign) => {
        try {
            let response = await deleteCampaignService(campaign.id);
            if (response && response.errCode === 0) {
                await this.getAllCampaignsFromReact();
            } else {
                alert(response.errMessage);
            }
        } catch (error) {
            console.log("handleDeleteCampaign error: ", error);
        }
    };
    handleEditCampaign = (campaign) => {
        this.setState({
            isOpenModalEditCampaign: true,
            campaignEdit: campaign,
        });
    };
    //hàm này dùng để sửa campaign
    doEditCampaign = async (data) => {
        try {
            let response = await editCampaignService(data);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditCampaign: false,
                });
                await this.getAllCampaignsFromReact();
            } else {
                alert(response.errCode);
            }
        } catch (error) {
            console.log("doEditCampaign error: ", error);
        }
    };
    //life cycle
    // Run component
    // 1. constructor -> init state
    // 2. did mount -> set state
    // 3. render (re-render)

    render() {
        console.log("check state: ", this.state);
        let arrCampaigns = this.state.arrCampaigns;
        return (
            <div className="campaigns-container">
                <ModalCampaign
                    isOpen={this.state.isOpenModalCampaign}
                    toggleFromParent={this.toggleCampaignModal}
                    createNewCampaign={this.createNewCampaign}
                />
                {this.state.isOpenModalEditCampaign && (
                    <ModalEditCampaign
                        isOpen={this.state.isOpenModalEditCampaign}
                        toggleFromParent={this.toggleEditCampaignModal}
                        currentCampaign={this.state.campaignEdit}
                        editCampaign={this.doEditCampaign}
                    />
                )}

                <div className="title text-center">
                    Manage campaigns with Nghia & Khanh
                </div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewCampaign()}
                    >
                        <i className="fa fa-plus"></i> Add new campaign
                    </button>
                </div>
                <div className="campaigns-table mt-3 mx-2">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Province</th>
                                <th>Position</th>
                                <th>Status</th>
                                <th>Target Amount</th>
                                <th>Current Amount</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Partner</th>
                                <th>Donor Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrCampaigns &&
                                arrCampaigns.map((item, index) => {
                                    console.log("check map: ", item, index);
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.province.name}</td>
                                            <td>{item.position}</td>
                                            <td>{item.status}</td>
                                            <td>{item.target_amount}</td>
                                            <td>{item.current_amount}</td>
                                            <td>{item.start_date}</td>
                                            <td>{item.end_date}</td>
                                            <td>
                                                {item.partners.length > 0
                                                    ? item.partners.map(
                                                          (partner, index) =>
                                                              index ===
                                                              item.partners
                                                                  .length -
                                                                  1
                                                                  ? partner.name
                                                                  : `${partner.name}, `
                                                      )
                                                    : "No Partner"}
                                            </td>
                                            <td>
                                                {item.donations.length > 0
                                                    ? item.donations.length
                                                    : "No Donor"}
                                            </td>

                                            <td>
                                                <button className="btn-edit">
                                                    <i
                                                        className="fa fa-pencil-alt"
                                                        onClick={() =>
                                                            this.handleEditCampaign(
                                                                item
                                                            )
                                                        }
                                                    ></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() =>
                                                        this.handleDeleteCampaign(
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

export default connect(mapStateToProps, mapDispatchToProps)(CampaignManage);
