import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { emitter } from "../../utils/emitter";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _, { add } from "lodash";
class ModalEditCampaign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            email: "",
            phone: "",
            address: "",
            role: "",
        };
    }
    componentDidMount() {
        let campaign = this.props.currentCampaign;
        if (!_.isEmpty(campaign)) {
            this.setState({
                id: campaign.id,
                name: campaign.name,
                email: campaign.email,
                phone: campaign.phone,
                address: campaign.address,
                role: campaign.role,
            });
        }
    }
    toggle = () => {
        this.props.toggleFromParent();
    };
    handleOnChangeInput = (event, id) => {
        //good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ["name", "email", "phone", "address", "role"];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Missing parameter: " + arrInput[i]);
                break;
            }
        }
        return isValid;
    };
    handleSaveCampaign = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.editCampaign(this.state);
        }
    };
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={"modal-campaign-container"}
                size="lg"
            >
                <ModalHeader toggle={() => this.toggle()}>
                    Edit a campaign
                </ModalHeader>
                <ModalBody>
                    <div className="modal-campaign-body">
                        <div className="input-container">
                            <label>Name</label>
                            <input
                                type="text"
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "name")
                                }
                                value={this.state.name}
                                className="form-control"
                            />
                        </div>
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "email")
                                }
                                value={this.state.email}
                                className="form-control"
                            />
                        </div>
                        <div className="input-container">
                            <label>Phone</label>
                            <input
                                type="phone"
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "phone")
                                }
                                value={this.state.phone}
                                className="form-control"
                            />
                        </div>
                        <div className="input-container">
                            <label>Address</label>
                            <input
                                type="text"
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "address")
                                }
                                value={this.state.address}
                                className="form-control"
                            />
                        </div>
                        <div className="input-container">
                            <label>Role</label>
                            {/* dropdown */}
                            <select
                                className="form-control"
                                value={this.state.role}
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "role")
                                }
                            >
                                <option value="campaign">Campaign</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className=" px-3"
                        onClick={() => this.handleSaveCampaign()}
                    >
                        Save Change
                    </Button>{" "}
                    <Button
                        color="secondary"
                        className=" px-3"
                        onClick={() => this.toggle()}
                    >
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCampaign);
