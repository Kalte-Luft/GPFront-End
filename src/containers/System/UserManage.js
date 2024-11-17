import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import './UserManage.scss'; //import css
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService'; //ham call api

import { emitter } from '../../utils/emitter'; //import emitter
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component { //khoi tao component UserManage

    constructor(props) { //khoi tao constructor de khoi tao state
        super(props);
        this.state = {
            arrUsers: [], //khoi tao mang arrUsers 
            isOpenModalUser: false, //khi an nut moi hien modal
            isOpenModalEditUser: false, //khi an nut edit hien modal
            userEdit: {} //khoi tao userEdit de chua thong tin user can edit
        }
    }


    async componentDidMount() {  //goi api khi component duoc render
        await this.getAllUsersFromReact(); //goi ham getAllUsers de lay du lieu
    }

    getAllUsersFromReact = async () => { //ham lay du lieu tu api
        let response = await getAllUsers('ALL');//goi ham getAllUsers tu userService
        if (response && response.errCode === 0) { //neu response tra ve errCode = 0 
            this.setState({  //set state de render lai giao dien
                arrUsers: response.users
            })
        }
    }


    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true, //set isOpenModalUser = true de hien modal
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser, //doi trang thai cua isOpenModalUser
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    /* life - cycle
    1. run component
    2. Did mount (set state)    mount = born
    3. render
    */

    createNewUser = async (data) => { //ham them user moi
        try {
            let response = await createNewUserService(data); //goi ham createNewUserService tu userService
            if (response && response.errCode !== 0) { //neu response tra ve errCode khac 0
                alert(response.errMessage) //thong bao loi
            } else {
                await this.getAllUsers(); //goi ham getAllUsers de lay du lieu
                this.setState({ //set state de render lai giao dien
                    isOpenModalUser: false //dong modal khi them user thanh cong
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA'); //emit su kien EVENT_CLEAR_MODAL_DATA de clear data
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteUser = async (user) => {   //ham xoa user
        try {
            let res = await (user.id); //goi ham deleteUserService tu userService de xoa user
            if (res && res.errCode === 0) { //neu response tra ve errCode = 0  
                await this.getAllUsersFromReact(); //goi ham getAllUsers de lay du lieu 

            } else {
                alert(res.errMessage) //thong bao loi
            }
        } catch (e) {
            console.log(e)
        }

    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true, //set isOpenModalUser = true de hien modal
            userEdit: user, //gan userEdit = user can edit
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user); //goi ham editUserService tu userService de edit user
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false //dong modal khi edit user thanh cong
                })

                await this.getAllUsersFromReact(); //goi ham getAllUsers de lay du lieu
            } else {
                alert(res.errCode) //thong bao loi
            }

        } catch (e) {
            console.log(e)
        }

    }


    render() {
        let arrUsers = this.state.arrUsers;
        console.log(arrUsers) //in ra mang arrUsers de kiem tra
        return (
            <div className="users-container" >
                <ModalUser
                    isOpen={this.state.isOpenModalUser} //truyen vao isOpenModalUser
                    toggleFromParent={this.toggleUserModal} //truyen vao ham toggleUserModal de dong modal
                    createNewUser={this.createNewUser} //truyen vao ham createNewUser de them user moi
                />

                {
                    this.state.isOpenModalEditUser && //neu isOpenModalEditUser = true thi hien modal
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser} //truyen vao isOpenModalUser
                        toggleFromParent={this.toggleUserEditModal} //truyen vao ham toggleUserModal de dong modal
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser} //truyen vao ham createNewUser de them user moi
                    />
                }
                <div className="title text-center">Manage users by Khanh</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    ><i className="fas fa-plus"></i>Add new users</button>
                </div>
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>

                            {arrUsers && arrUsers.map((item, index) => {  //in vong lap dung map
                                console.log('Khanh check map ', item, index)
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className="btn-edit" onClick={() => { this.handleEditUser(item) }}><i className="fas fa-pencil-alt"></i></button>
                                            <button className="btn-delete" onClick={() => { this.handleDeleteUser(item) }}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
