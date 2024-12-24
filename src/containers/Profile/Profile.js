import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios";
import * as actions from "../../store/actions";
import { withRouter } from "react-router-dom";
import HomeHeader from "../HomePage/HomeHeader";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Profile.scss";
import {editUserService, getAllUsers, deleteUserService} from "../../services/userService";
import { getCampaignDonationsByUser } from "../../services/campaignDonationService";
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCampaignDonations: [],
            arrUsers: [],
            user_id: this.props.userInfo ? this.props.userInfo.id : "",
            isEditName: false,
            isOpenModalEditEmail: false,
            isEditEmail: false,
            isEditAddress: false,
            isEditPhone: false,
            phone: "",
            email: "",
            name: "",
            address: "",
        };
        this.yourAccountRef = React.createRef();
        this.securityRef = React.createRef();
        this.donationRef = React.createRef();
        this.campaignRef = React.createRef();
        this.scrollbarsRef = React.createRef();
    }
    
    async componentDidMount() {
        await this.getAllCampaignDonationsFromReact();
        await this.getAllUsersFromReact();
        if (this.scrollbarsRef.current) {
            this.scrollbarsRef.current.addEventListener(
                "scroll",
                this.handleScroll
            );
        }
    }
    getAllCampaignDonationsFromReact = async () => {
        let response = await getCampaignDonationsByUser(this.state.user_id);
        if (response && response.errCode === 0) {
            this.setState({
                //dùng để re-render lại component
                arrCampaignDonations: response.campaignDonations,
            });
        }
    };
    getAllUsersFromReact = async () => {
        let response = await getAllUsers(this.state.user_id);
        if (response && response.errCode === 0) {
            this.setState({
                //dùng để re-render lại component
                arrUsers: response.users,
            });
        }
    }

    componentWillUnmount() {
        if (this.scrollbarsRef.current) {
            this.scrollbarsRef.current.removeEventListener(
                "scroll",
                this.handleScroll
            );
        }
    }
    //set style cho nút khi cuộn
    handleScroll = () => {
        const your_account = document.querySelector(".your-account-btn");
        const security = document.querySelector(".security-btn");
        const donation = document.querySelector(".donation-btn");
        const campaign = document.querySelector(".campaign-btn");
        const scrollbarsRef = this.scrollbarsRef.current.scrollTop;
        const scrollbarsRefBottom =
            this.scrollbarsRef.current.scrollHeight -
            this.scrollbarsRef.current.clientHeight;
        //console.log("vi tri thằng scrollbarsRef: ",scrollbarsRef);
        if (scrollbarsRef >= 0 && scrollbarsRef < 670) {
            your_account.style.backgroundColor = "rgba(205, 159, 255, 0.219)";
        } else {
            your_account.style.backgroundColor = "transparent";
        }
        if (scrollbarsRef > 670 && scrollbarsRef < 1003) {
            security.style.backgroundColor = "rgba(205, 159, 255, 0.219)";
        } else {
            security.style.backgroundColor = "transparent";
        }
        if (scrollbarsRef > 1003 && scrollbarsRef < 1007.5) {
            donation.style.backgroundColor = "rgba(205, 159, 255, 0.219)";
        } else {
            donation.style.backgroundColor = "transparent";
        }
        if (scrollbarsRef > 1007.5 && scrollbarsRef < scrollbarsRefBottom) {
            campaign.style.backgroundColor = "rgba(205, 159, 255, 0.219)";
        } else {
            campaign.style.backgroundColor = "transparent";
        }
    };
    scrollToSection = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    onChangeEditName = () => {
        this.setState({ isEditName: !this.state.isEditName });
    };
    onChangeEditEmail = () => {
        this.setState({ isEditEmail: !this.state.isEditEmail });
    };
    onChangeEditAddress = () => {
        this.setState({ isEditAddress: !this.state.isEditAddress });
    };
    onChangeEditPhone = () => {
        this.setState({ isEditPhone: !this.state.isEditPhone });
    };
    toggle = () => {
        this.setState({
            isOpenModalEditEmail: !this.state.isOpenModalEditEmail,
        });
    };
    handleNavigate = (path) => {
        this.props.history.push(path);
    }

    handleEditEmail = () => {
        this.setState({ isOpenModalEditEmail: true });
    };
    handleOnChangeInput = (event, id) => {
        //good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };
    checkValidateName = () => {
        if (!this.state.name) {
            alert("Name is required");
            return false;
        }
        return true;
    };

    checkValidateEmail = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this.state.email || !emailPattern.test(this.state.email)) {
            alert("Invalid email format");
            return false;
        }
        return true;
    };

    checkValidatePhone = () => {
        const phonePattern = /^[0-9]{10}$/;
        if (!this.state.phone || !phonePattern.test(this.state.phone)) {
            alert("Invalid phone number");
            return false;
        }
        return true;
    };

    checkValidateAddress = () => {
        if (!this.state.address) {
            alert("Address is required");
            return false;
        }
        return true;
    };
    handleSaveName = async() => {
        if (this.checkValidateName()) {
            try {
                let response = await editUserService({
                    id: this.state.user_id,
                    name: this.state.name,
                });
                if (response && response.errCode === 0) {
                    this.setState({
                        isEditName: false,
                    });
                    await this.getAllUsersFromReact();
                }
            } catch (error) {
                console.log("handleSaveName error: ", error);          
            }
        }
    };

    handleSaveEmail = () => {
        if (this.checkValidateEmail()) {
            // Call API to save email
            console.log("Email saved:", this.state.email);
        }
    };

    handleSavePhone = async() => {
        if (this.checkValidatePhone()) {
            try {
                let response = await editUserService({
                    id: this.state.user_id,
                    phone: this.state.phone,
                });
                if (response && response.errCode === 0) {
                    this.setState({
                        isEditPhone: false,
                    });
                    await this.getAllUsersFromReact();
                }
            } catch (error) {
                console.log("handleSavePhone error: ", error);
            }
        }
    };

    handleSaveAddress = async() => {
        if (this.checkValidateAddress()) {
            try {
                let response = await editUserService({
                    id: this.state.user_id,
                    address: this.state.address,
                });
                if (response && response.errCode === 0) {
                    this.setState({
                        isEditAddress: false,
                    });
                    await this.getAllUsersFromReact();
                }
            } catch (error) {
                console.log("handleSaveAddress error: ", error);
            }
        }
    };

    handleDeleteUser = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account? All data that belongs to this account will be deleted as well.");
        if (confirmDelete) {
            try {
                let response = await deleteUserService(this.state.user_id);
                if (response && response.errCode === 0) {
                    await this.getAllUsersFromReact();
                    this.props.processLogout();
                } else {
                    alert(response.errMessage);
                }
                
            } catch (error) {
                console.log("handleDeleteUser error: ", error);
            }
        }
    };
    
    render() {
        const isEditName = this.state.isEditName;
        const isEditEmail = this.state.isEditEmail;
        const isEditAddress = this.state.isEditAddress;
        const isEditPhone = this.state.isEditPhone;
        const isOpenModalEditEmail = this.state.isOpenModalEditEmail;
        const arrUsers = this.state.arrUsers;
        const createdAt =
        arrUsers && arrUsers.createdAt ? arrUsers.createdAt : "";
        const date = new Date(createdAt);
        const formattedDateTime = `${date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })} ${date.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false, // Định dạng 24 giờ
        })}`;
        let arrCampaignDonations = this.state.arrCampaignDonations;
        return (
            <div>
                {isOpenModalEditEmail && (
                    <Modal
                        isOpen={isOpenModalEditEmail} //này là biến boolean để check xem modal có mở hay không
                        toggle={() => this.toggle()} //này là hàm để đóng mở modal
                        className={"modal-email-container"}
                        size="ml"
                    >
                        <ModalHeader toggle={() => this.toggle()}>
                            We have sent you the code
                        </ModalHeader>
                        <ModalBody>
                            <div className="modal-email-body">
                                <div className="input-container">
                                    <label>
                                        Before changing your account, you will
                                        need to enter the code we sent to{" "}
                                        {arrUsers && arrUsers.email
                                            ? arrUsers.email
                                            : ""}
                                    </label>
                                    <label
                                        style={{
                                            marginTop: "10px",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Enter the code
                                    </label>
                                    <input
                                        type="text"
                                        onChange={(event) =>
                                            this.handleOnChangeInput(
                                                event,
                                                "name"
                                            )
                                        }
                                        className="form-control"
                                    />
                                    <label
                                        style={{
                                            marginTop: "10px",
                                            color: "rgb(38, 38, 38)",
                                        }}
                                    >
                                        Didn't receive code? Resend in 22
                                        seconds
                                    </label>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                className=" px-3"
                                onClick={() =>
                                    this.onChangeEditEmail() + this.toggle()
                                }
                            >
                                Submit
                            </Button>
                        </ModalFooter>
                    </Modal>
                )}
                <HomeHeader />
                <div className="your-account-container">
                    <div className="space" />
                    <div className="your-account-content">
                        <div className="left-content">
                            <div className="overview">
                                <div className="profile-img">
                                    <img src="https://scv.udn.vn/anh/2021/1354-2021m012d022_15_2_2.jpg"></img>
                                </div>
                                <div className="overview-info">
                                    <h1>
                                        {arrUsers && arrUsers.name
                                            ? arrUsers.name
                                            : ""}
                                    </h1>
                                    <p>
                                        {arrUsers && arrUsers.email
                                            ? arrUsers.email
                                            : ""}
                                    </p>
                                </div>
                            </div>
                            <div className="selection">
                                <div
                                    className="selection-content your-account-btn"
                                    onClick={() =>
                                        this.scrollToSection(
                                            this.yourAccountRef
                                        )
                                    }
                                >
                                    <div className="icon">
                                        <i
                                            class="fa fa-user"
                                            aria-hidden="true"
                                        ></i>
                                    </div>
                                    <div className="selection-item">
                                        <p>Your account</p>
                                    </div>
                                </div>
                                <div
                                    className="selection-content security-btn"
                                    onClick={() =>
                                        this.scrollToSection(this.securityRef)
                                    }
                                >
                                    <div className="icon">
                                        <i
                                            class="fa fa-lock"
                                            aria-hidden="true"
                                        ></i>
                                    </div>
                                    <div className="selection-item">
                                        <p>Account and security</p>
                                    </div>
                                </div>
                                <div
                                    className="selection-content donation-btn"
                                    onClick={() =>
                                        this.scrollToSection(this.donationRef)
                                    }
                                >
                                    <div className="icon">
                                        <i
                                            class="fa fa-shopping-cart"
                                            aria-hidden="true"
                                        ></i>
                                    </div>
                                    <div className="selection-item">
                                        <p>Donation history</p>
                                    </div>
                                </div>
                                <div
                                    className="selection-content campaign-btn"
                                    onClick={() =>
                                        this.scrollToSection(this.campaignRef)
                                    }
                                >
                                    <div className="icon">
                                        <i
                                            class="fa fa-credit-card"
                                            aria-hidden="true"
                                        ></i>
                                    </div>
                                    <div className="selection-item">
                                        <p>Campaign donation history</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-content" ref={this.scrollbarsRef}>
                            <div className="right-container">
                                <div
                                    className="your-account"
                                    ref={this.yourAccountRef}
                                >
                                    <div className="your-account-header">
                                        <h1>Your account</h1>
                                    </div>
                                    <div className="profile-image">
                                        <h5>Profile image</h5>
                                        <div className="profile-image-content">
                                            <div className="profile-img">
                                                <img src="https://scv.udn.vn/anh/2021/1354-2021m012d022_15_2_2.jpg"></img>
                                            </div>
                                            <div className="interact-btn">
                                                <button className="delete-image">
                                                    Delete image
                                                </button>
                                                <button className="change-image">
                                                    Change image
                                                </button>
                                            </div>
                                        </div>
                                        <hr class="_PhRSQ" />
                                    </div>
                                    <div
                                        className="profile-image"
                                        style={{ height: "100px" }}
                                    >
                                        <h5>Email</h5>
                                        {!isEditEmail ? (
                                            <div className="profile-image-content">
                                                <div className="profile-img">
                                                    <h6>
                                                        {arrUsers &&
                                                        arrUsers.email
                                                            ? arrUsers.email
                                                            : ""}
                                                    </h6>
                                                </div>
                                                <div className="interact-btn">
                                                    <button
                                                        className="change-image"
                                                        onClick={() =>
                                                            this.toggle()
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="edit-name">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder={
                                                        arrUsers &&
                                                        arrUsers.email
                                                            ? arrUsers.email
                                                            : ""
                                                    }
                                                    value={this.state.email}
                                                    onChange={(event) => this.handleOnChangeInput(event, "email")}
                                                />
                                                <button
                                                    className="btn btn-light"
                                                    onClick={
                                                        this.onChangeEditEmail
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                                <button className="btn btn-success" onClick={this.handleSaveEmail}>
                                                    Save
                                                </button>
                                            </div>
                                        )}
                                        <hr class="_PhRSQ" />
                                    </div>
                                    <div
                                        className="profile-image"
                                        style={{ height: "100px" }}
                                    >
                                        <h5>Name</h5>
                                        {!isEditName ? (
                                            <div className="profile-image-content">
                                                <div className="profile-img">
                                                    <h6>
                                                        {arrUsers &&
                                                        arrUsers.name
                                                            ? arrUsers.name
                                                            : ""}
                                                    </h6>
                                                </div>
                                                <div className="interact-btn">
                                                    <button
                                                        className="change-image"
                                                        onClick={
                                                            this
                                                                .onChangeEditName
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="edit-name">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder={
                                                        arrUsers &&
                                                        arrUsers.name
                                                            ? arrUsers.name
                                                            : ""
                                                    }
                                                    value={this.state.name}
                                                    onChange={(event) => this.handleOnChangeInput(event, "name")}
                                                />
                                                <button
                                                    className="btn btn-light"
                                                    onClick={
                                                        this.onChangeEditName
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                                <button className="btn btn-success" onClick={this.handleSaveName}>
                                                    Save
                                                </button>
                                            </div>
                                        )}
                                        <hr class="_PhRSQ" />
                                    </div>
                                    <div
                                        className="profile-image"
                                        style={{ height: "100px" }}
                                    >
                                        <h5>Address</h5>
                                        {!isEditAddress ? (
                                            <div className="profile-image-content">
                                                <div className="profile-img">
                                                    <h6>
                                                        {arrUsers &&
                                                        arrUsers.address
                                                            ? arrUsers.address
                                                            : ""}
                                                    </h6>
                                                </div>
                                                <div className="interact-btn">
                                                    <button
                                                        className="change-image"
                                                        onClick={
                                                            this
                                                                .onChangeEditAddress
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="edit-name">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder={
                                                        arrUsers &&
                                                        arrUsers.address
                                                            ? arrUsers.address
                                                            : ""
                                                    }
                                                    value={this.state.address}
                                                    onChange={(event) => this.handleOnChangeInput(event, "address")}
                                                />
                                                <button
                                                    className="btn btn-light"
                                                    onClick={
                                                        this.onChangeEditAddress
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                                <button className="btn btn-success" onClick={this.handleSaveAddress}>
                                                    Save
                                                </button>
                                            </div>
                                        )}
                                        <hr class="_PhRSQ" />
                                    </div>
                                    <div
                                        className="profile-image"
                                        style={{ height: "100px" }}
                                    >
                                        <h5>Phone</h5>
                                        {!isEditPhone ? (
                                            <div className="profile-image-content">
                                                <div className="profile-img">
                                                    <h6>
                                                        {arrUsers &&
                                                        arrUsers.phone
                                                            ? arrUsers.phone
                                                            : ""}
                                                    </h6>
                                                </div>
                                                <div className="interact-btn">
                                                    <button
                                                        className="change-image"
                                                        onClick={
                                                            this
                                                                .onChangeEditPhone
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="edit-name">
                                                <input
                                                    type="phone"
                                                    className="form-control"
                                                    placeholder={
                                                        arrUsers &&
                                                        arrUsers.phone
                                                            ? arrUsers.phone
                                                            : ""
                                                    }
                                                    value={this.state.phone}
                                                    onChange={(event) => this.handleOnChangeInput(event, "phone")}
                                                />
                                                <button
                                                    className="btn btn-light"
                                                    onClick={
                                                        this.onChangeEditPhone
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                                <button className="btn btn-success" onClick={this.handleSavePhone}>
                                                    Save
                                                </button>
                                            </div>
                                        )}
                                        <hr class="_PhRSQ" />
                                    </div>
                                </div>
                                <div
                                    className="security"
                                    ref={this.securityRef}
                                >
                                    <h1>Account and Security</h1>
                                    <div className="change-password">
                                        <div className="change-password-content">
                                            <h5>Change your password</h5>
                                            <div className="change-password-box">
                                                <div className="icon-box">
                                                    <i
                                                        class="fa fa-lock"
                                                        aria-hidden="true"
                                                    ></i>
                                                </div>
                                                <div className="right">
                                                    <h1>Password</h1>
                                                    <p>
                                                        To add a password to
                                                        your account for the
                                                        first time, you'll need
                                                        to use{" "}
                                                        <a>
                                                            the password reset
                                                            page
                                                        </a>{" "}
                                                        so we can verify your
                                                        identity.
                                                    </p>
                                                </div>
                                            </div>
                                            <hr class="_PhRSQ" />
                                        </div>
                                    </div>
                                    <div className="delete-account">
                                        <h5>Delete Your Account</h5>
                                        <p>
                                            Once you delete your account, you
                                            won't be able to access your designs
                                            or log in to GreenPaws anymore. Your
                                            GreenPaws account was created at{" "}
                                            {formattedDateTime}.
                                        </p>
                                        <button onClick={this.handleDeleteUser}>Delete Account</button>
                                    </div>
                                </div>
                                <hr class="_PhRSQ" />
                                <div
                                    className="donation"
                                    ref={this.donationRef}
                                >
                                    <div className="donation-title">
                                        <h1>Donation History</h1>
                                    </div>
                                    <div className="product">
                                        <div className="product-img">
                                            <img src="https://scv.udn.vn/anh/2021/1354-2021m012d022_15_2_2.jpg"></img>
                                        </div>
                                        <div className="product-info">
                                            <h1>
                                                1 Tree Planted in Cuc Phuong
                                                National Park
                                            </h1>
                                            <p>x15</p>
                                        </div>
                                        <div className="total-price">
                                            <h1>đ150.000</h1>
                                        </div>
                                    </div>
                                    <div className="repurchase-btn">
                                        <button>Repurchase</button>
                                    </div>
                                    <div className="product">
                                        <div className="product-img">
                                            <img src="https://scv.udn.vn/anh/2020/8166-2020m07d06_16_52_50.jpg"></img>
                                        </div>
                                        <div className="product-info">
                                            <h1>
                                                Yellow Plan: 18 Trees Planted
                                                Every Month
                                            </h1>
                                            <p>x3</p>
                                        </div>
                                        <div className="total-price">
                                            <h1>đ100.000</h1>
                                        </div>
                                    </div>
                                    <div className="repurchase-btn">
                                        <button>Repurchase</button>
                                    </div>
                                </div>
                                <hr class="_PhRSQ" />
                                <div
                                    className="campaign"
                                    ref={this.campaignRef}
                                >
                                    <div className="campaign-title">
                                        <h1>Campaign Donation History</h1>
                                    </div>
                                    <div className="search">
                                        <div className="input-container">
                                            <label>Position</label>
                                            <input
                                                type="text"
                                                placeholder="Search by transaction code"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="campaign-content">
                                        <table class="table  table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">
                                                        Transaction code
                                                    </th>
                                                    <th scope="col">
                                                        Campaign
                                                    </th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Active</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {arrCampaignDonations &&
                                                    arrCampaignDonations.map(
                                                        (item, index) => {
                                                            
                                                            return (
                                                                <tr key={index}>
                                                                    <th scope="row">
                                                                        {item.id}
                                                                    </th>
                                                                    <td>
                                                                        {item.campaign.title}
                                                                    </td>
                                                                    <td>
                                                                        {item.amount}đ
                                                                    </td>
                                                                    <td>
                                                                        <i
                                                                            class="fa fa-info-circle"
                                                                            aria-hidden="true"
                                                                            onClick={() =>
                                                                                this.handleNavigate("/detail/" + item.campaign_id)
                                                                            }
                                                                        ></i>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));