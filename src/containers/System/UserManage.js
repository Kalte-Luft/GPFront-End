import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
import { createNewUserService } from "../../services/userService";
import ModalUser from "./ModalUser";
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //giống với hàm khởi tạo trong OOP
            arrUsers: [],
            isOpenModalUser: false,
        };
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }
    getAllUsersFromReact = async () => {
        let response = await getAllUsers("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                //dùng để re-render lại component
                arrUsers: response.users,
            });
        }
    };
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    };
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false,
                });
            }
        } catch (error) {
            console.log("createNewUser error: ", error);
        }
    };
    //life cycle
    // Run component
    // 1. constructor -> init state
    // 2. did mount -> set state
    // 3. render (re-reander)

    render() {
        console.log("check state: ", this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                <div className="title text-center">Manage users with Nghia</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fa fa-plus"></i> Add new user
                    </button>
                </div>
                <div className="users-table mt-3 mx-2">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers &&
                                arrUsers.map((item, index) => {
                                    console.log("check map: ", item, index);
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn-edit">
                                                    <i className="fa fa-pencil-alt"></i>
                                                </button>
                                                <button className="btn-delete">
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
