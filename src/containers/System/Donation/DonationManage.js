import React, { Component } from "react";
import { connect } from "react-redux";
import "./DonationManage.scss";
import {
    getAllDonations,
    deleteDonationService,
} from "../../../services/donationService";
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
        console.log("check response: ", response);
        if (response && response.errCode === 0) {
            this.setState({
                //dùng để re-render lại component
                arrDonations: response.donations,
            });
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
        let arrDonations = this.state.arrDonations;
        return (
            <div className="donation-container">
                <div className="title text-center">Manage donations with Nghia & Khanh</div>
                <div className="donations-table mt-5 mx-3">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Donation ID</th>
                                <th>User ID</th>
                                <th>User</th>
                                <th>Total amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrDonations &&
                                arrDonations.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.user_id}</td>
                                            <td>{item.user.name}</td> 
                                            <td>{this.formatPrice(item.total_amount)}</td>

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
