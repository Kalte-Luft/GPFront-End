import React, { Component } from "react";
import { connect } from "react-redux";
import "./PartnerManage.scss";
import {
    getAllPartners,
    createNewPartnerService,
    deletePartnerService,
    editPartnerService
} from "../../services/partnerService";
import ModalPartner from "./ModalPartner";
import ModalEditPartner from "./ModalEditPartner";
import { emitter } from "../../utils/emitter";
class PartnerManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //giống với hàm khởi tạo trong OOP
            arrPartners: [],
            isOpenModalPartner: false,
            isOpenModalEditPartner: false,
            partnerEdit: {},
        };
    }
    //hàm này dùng để gọi API
    async componentDidMount() {
        await this.getAllPartnersFromReact();
    }
    //hàm này dùng để gọi API
    getAllPartnersFromReact = async () => {
        let response = await getAllPartners("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                //dùng để re-render lại component
                arrPartners: response.partners,
            });
        }
    };
    //hàm này dùng để mở modal
    handleAddNewPartner = () => {
        this.setState({
            isOpenModalPartner: true,
        });
    };
    //hàm này dùng để đóng mở modal
    togglePartnerModal = () => {
        this.setState({
            isOpenModalPartner: !this.state.isOpenModalPartner,
        });
    };
    //hàm này dùng để đóng mở modal
    toggleEditPartnerModal = () => {
        this.setState({
            isOpenModalEditPartner: !this.state.isOpenModalEditPartner,
        });
    };
    //hàm này dùng để tạo mới partner
    createNewPartner = async (data) => {
        try {
            let response = await createNewPartnerService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllPartnersFromReact();
                this.setState({
                    isOpenModalPartner: false,
                });
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
            }
        } catch (error) {
            console.log("createNewPartner error: ", error);
        }
    };
    //hàm này dùng để xóa partner
    handleDeletePartner = async (partner) => {
        try {
            let response = await deletePartnerService(partner.id);
            if (response && response.errCode === 0) {
                await this.getAllPartnersFromReact();
            } else {
                alert(response.errMessage);
            }
        } catch (error) {
            console.log("handleDeletePartner error: ", error);
        }
    };
    handleEditPartner = (partner) => {
        this.setState({
            isOpenModalEditPartner: true,
            partnerEdit: partner,
        });
    };
    //hàm này dùng để sửa partner
    doEditPartner = async (data) => {
        try {
            let response = await editPartnerService(data);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditPartner: false,
                });
                await this.getAllPartnersFromReact();
            }else {
                alert(response.errCode);
            }
        } catch (error) {
            console.log("doEditPartner error: ", error);
        }
    };
    //life cycle
    // Run component
    // 1. constructor -> init state
    // 2. did mount -> set state
    // 3. render (re-render)

    render() {
        let arrPartners = this.state.arrPartners;
        return (
            <div className="partner-container">
                <ModalPartner
                    isOpen={this.state.isOpenModalPartner}
                    toggleFromParent={this.togglePartnerModal}
                    createNewPartner={this.createNewPartner}
                />
                {this.state.isOpenModalEditPartner && (
                    <ModalEditPartner
                        isOpen={this.state.isOpenModalEditPartner}
                        toggleFromParent={this.toggleEditPartnerModal}
                        currentPartner={this.state.partnerEdit}
                        editPartner = {this.doEditPartner}
                    />
                )} 

                <div className="title text-center">Manage partners</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewPartner()}
                    >
                        <i className="fa fa-plus"></i> Add new partner
                    </button>
                </div>
                <div className="partners-table mt-3 mx-2">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Logo</th>
                                <th>Name</th>
                                <th>Campaign Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrPartners &&
                                arrPartners.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{
                                                <img
                                                    src={item.logo}
                                                    alt={item.name}
                                                    className="logo"
                                                    style={{ width: "100px" }}
                                                />
                                            }</td>
                                            <td>{item.name}</td>
                                            <td>{item.campaign.title}</td>
                                            <td>
                                                <button className="btn-edit">
                                                    <i
                                                        className="fa fa-pencil-alt"
                                                        onClick={() =>
                                                            this.handleEditPartner(
                                                                item
                                                            )
                                                        }
                                                    ></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() =>
                                                        this.handleDeletePartner(
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

export default connect(mapStateToProps, mapDispatchToProps)(PartnerManage);
