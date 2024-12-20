import React, { Component } from "react";
import { connect } from "react-redux";
import { emitter } from "../../utils/emitter";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalUser extends Component {
    //hàm này dùng để khởi tạo state hoặc bind các function
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            phone: "",
            name: "",
            address: "",
        };
        this.listenToEmitter();
    }
    //hàm này dùng để lắng nghe sự kiện từ emitter
    listenToEmitter = () => {
        emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
            this.setState({
                email: "",
                password: "",
                phone: "",
                name: "",
                address: "",
            });
        });
    }
    componentDidMount() { }
    //hàm này dùng để đóng mở modal
    toggle = () => {
        this.props.toggleFromParent();
    };
    //hàm này dùng để lưu giá trị của input vào state
    handleOnChangeInput = (event, id) => {
        //good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    }
    //hàm này dùng để kiểm tra xem input có đúng không
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ["email", "password", "phone", "name", "address"];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Missing parameter: " + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    //hàm này dùng để thêm mới user
    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.createNewUser(this.state);//gọi hàm createNewUser từ props, ở đây là từ mapDispatchToProps
        }
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={"modal-user-container"}
                size = "xl"
            >
                <ModalHeader toggle={() => this.toggle()}>
                    Create a new user
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input type="text" 
                            onChange={(event) => this.handleOnChangeInput(event, "email")}
                            value={this.state.email}
                            className="form-control" />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password" 
                            onChange={(event) => this.handleOnChangeInput(event, "password")}
                            value={this.state.password}
                            className="form-control" />
                        </div>
                        <div className="input-container">
                            <label>Phone</label>
                            <input type="phone" 
                            onChange={(event) => this.handleOnChangeInput(event, "phone")}
                            value={this.state.phone}
                            className="form-control" />
                        </div>
                        <div className="input-container">
                            <label>Name</label>
                            <input type="text" 
                            onChange={(event) => this.handleOnChangeInput(event, "name")}
                            value={this.state.name}
                            className="form-control" />
                        </div>
                        <div className="input-container">
                            <label>Address</label>
                            <input type="text" 
                            onChange={(event) => this.handleOnChangeInput(event, "address")}
                            value={this.state.address}
                            className="form-control" />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className=" px-3" onClick={() => this.handleAddNewUser()}>
                        Add New
                    </Button>{" "}
                    <Button color="secondary" className=" px-3" onClick={() => this.toggle()}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
