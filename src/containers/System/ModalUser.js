import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from "../../utils/emitter";

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = { //cài trạng thái
            email: '',
            passWord: '',
            firstName: '',
            lastName: '',
            address: '',

        }

        this.listenToEmitter(); //lang nghe su kien tu emitter de nhan data tu component khac
    }

    listenToEmitter() { //lang nghe su kien tu emitter
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => { //lang nghe su kien EVENT_CLEAR_MODAL_DATA
            //khi nhan duoc su kien nay thi clear data
            this.setState({ //set state de clear data
                email: '',
                passWord: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })

    }

    componentDidMount() {

    }

    toggle = () => {
        this.props.toggleFromParent(); //goi ham toggleFromParent tu props
    }

    handleOnChangeInput = (event, id) => {  //id la key cua state can gan gia tri moi
        let copyState = { ...this.state }; //copy state ra 1 object khac de gan gia tri moi cho no
        copyState[id] = event.target.value; //gan gia tri vao copyState dua vao id cua input do
        this.setState({  //set lai state bang copyState moi
            ...copyState
        })
    }

    checkValidateInput = () => { //check xem input co rong hay khong
        let isValid = true;  //khoi tao bien isValid = true 
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']; //tao 1 mang chua cac key cua state
        for (let i = 0; i < arrInput.length; i++) { //duyet mang arrInput 
            if (!this.state[arrInput[i]]) { //neu state co gia tri rong 
                isValid = false; //isValid = false
                alert('Missing parameter: ' + arrInput[i]); //thong bao loi
                break; //thoat khoi vong lap
            }
        }
        return isValid; //tra ve isValid = true neu khong co gia tri rong
    }

    handleAddNewUser = () => { //ham them user moi 
        let isValid = this.checkValidateInput(); //goi ham checkValidateInput de kiem tra input
        if (isValid === true) { //neu isValid = true     
            this.props.createNewUser(this.state); //goi ham createNewUser tu props  de them user moi
        }
    }


    render() {

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className='modal-user-container'
                size="lg"
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email:</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, 'email') }} //goi ham handleOnChangeInput de gan gia tri moi cho state email
                                value={this.state.email} //gan gia tri cua state email cho input do
                            />
                        </div>

                        <div className="input-container">
                            <label>Password:</label>
                            <input
                                type="password"
                                onChange={(event) => { this.handleOnChangeInput(event, 'password') }} //goi ham handleOnChangeInput de gan gia tri moi cho state password
                                value={this.state.password}
                            />
                        </div>

                        <div className="input-container">
                            <label>First Name:</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }} //goi ham handleOnChangeInput de gan gia tri moi cho state firstName
                                value={this.state.firstName}
                            />
                        </div>

                        <div className="input-container">
                            <label>Last Name:</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }} //goi ham handleOnChangeInput de gan gia tri moi cho state lastName
                                value={this.state.lastName} //gan gia tri cua state lastName cho input do
                            />
                        </div>

                        <div className="input-container max-width-input ">
                            <label>Address</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, 'address') }} //goi ham handleOnChangeInput de gan gia tri moi cho state address
                                value={this.state.address} //gan gia tri cua state address cho input do
                            />
                        </div>

                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => { this.handleAddNewUser() }}> Add new </Button>{' '}
                    <Button
                        color="secondary"
                        className="px-3"
                        onClick={() => { this.toggle() }}> Close </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
