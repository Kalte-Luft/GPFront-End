import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Profile.scss";
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditName: false,
            isOpenModalEditEmail: false,
            isEditEmail: false,
            isEditAddress: false,
            isEditPhone: false,
        };
    }
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
    handleEditEmail = () => {
        this.setState({ isOpenModalEditEmail: true });
    };

    render() {
        const isEditName = this.state.isEditName;
        const isEditEmail = this.state.isEditEmail;
        const isEditAddress = this.state.isEditAddress;
        const isEditPhone = this.state.isEditPhone;
        const isOpenModalEditEmail = this.state.isOpenModalEditEmail;
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
                                        need to enter the code we sent to
                                        nghianguyenba154@gmail.com.
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
                                    <h1>Nguyen Ba Nghia</h1>
                                    <p>nghianguyenba154@gmail.com</p>
                                </div>
                            </div>
                            <div className="selection">
                                <div className="selection-content">
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
                                <div className="selection-content">
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
                                <div className="selection-content">
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
                                <div className="selection-content">
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
                        <div className="right-content">
                            <div className="right-container">
                                <div className="your-account">
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
                                                        nghianguyenba154@gmail.com
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
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="nghianguyenba154@gmail.com"
                                                />
                                                <button
                                                    className="btn btn-light"
                                                    onClick={
                                                        this.onChangeEditEmail
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                                <button className="btn btn-success">
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
                                                    <h6>Nguyen Ba Nghia</h6>
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
                                                    placeholder="Nguyen Ba Nghia"
                                                />
                                                <button
                                                    className="btn btn-light"
                                                    onClick={
                                                        this.onChangeEditName
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                                <button className="btn btn-success">
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
                                                        DH Viet Han, Ngu Hanh
                                                        Son
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
                                                    placeholder="DH Viet Han, Ngu Hanh Son"
                                                />
                                                <button
                                                    className="btn btn-light"
                                                    onClick={
                                                        this.onChangeEditAddress
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                                <button className="btn btn-success">
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
                                                    <h6>0932435059</h6>
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
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0932435059"
                                                />
                                                <button
                                                    className="btn btn-light"
                                                    onClick={
                                                        this.onChangeEditPhone
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                                <button className="btn btn-success">
                                                    Save
                                                </button>
                                            </div>
                                        )}
                                        <hr class="_PhRSQ" />
                                    </div>
                                </div>
                                <div className="security">
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
                                            GreenPaws account was created at
                                            21:32, 18/10/2024.
                                        </p>
                                        <button>Delete Account</button>
                                    </div>
                                </div>
                                <hr class="_PhRSQ" />
                                <div className="donation">
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
                                <div className="campaign">
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
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Campaign A</td>
                                                    <td>12000đ</td>
                                                    <td>
                                                        <i
                                                            class="fa fa-info-circle"
                                                            aria-hidden="true"
                                                        ></i>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Campaign B</td>
                                                    <td>13000đ</td>
                                                    <td>
                                                        <i
                                                            class="fa fa-info-circle"
                                                            aria-hidden="true"
                                                        ></i>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>Campaign C</td>
                                                    <td>14000đ</td>
                                                    <td>
                                                        <i
                                                            class="fa fa-info-circle"
                                                            aria-hidden="true"
                                                        ></i>
                                                    </td>
                                                </tr>
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
    };
};

export default connect(mapStateToProps)(Profile);
