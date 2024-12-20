import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProvinces } from "../../services/campaignService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ModalEditCampaign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            provinceList: [],
            position: "",
            position_map: "",
            description: "",
            status: "",
            target_amount: "",
            image: "",
            contentHTML: "",
            contentMarkdown: "",
            start_date: new Date(),
            end_date: new Date(),
        };
    }
    //hàm này dùng để lấy dữ liệu từ props truyền vào và set vào state
    componentDidMount() {
        let campaign = this.props.currentCampaign;
        if (!_.isEmpty(campaign)) {
            this.setState({
                ...campaign,
                start_date: new Date(campaign.start_date)
                    .toISOString()
                    .split("T")[0],
                end_date: new Date(campaign.end_date)
                    .toISOString()
                    .split("T")[0],
                contentMarkdown: campaign.contentMarkdown || "", // Cập nhật Markdown
                contentHTML: campaign.contentHTML || "", // Cập nhật HTML
            });
        }
        this.loadProvinces();
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
    loadProvinces = async () => {
        try {
            let response = await getAllProvinces("ALL"); // Gọi API
            console.log("Response: ", response);
            if (response && response.errCode === 0) {
                this.setState({
                    provinceList: response.Provinces || [], // Đảm bảo luôn gán giá trị mảng
                });
                console.log("Data: ", response.Provinces);
            } else {
                console.error(
                    "Failed to fetch provinces: ",
                    response.errMessage
                );
            }
        } catch (error) {
            console.error("Error while fetching provinces: ", error);
        }
    };
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        });
    };

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            "title",
            "description",
            "position",
            "position_map",
            "status",
            "target_amount",
            "image",
            "contentMarkdown",
            "contentHTML",
            "start_date",
            "end_date",
        ];
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
                size="xl"
            >
                <ModalHeader toggle={() => this.toggle()}>
                    Edit a campaign
                </ModalHeader>
                <ModalBody>
                    <div className="modal-campaign-body">
                        <div className="input-container">
                            <label>Title</label>
                            <input
                                type="text"
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "title")
                                }
                                value={this.state.title}
                                className="form-control"
                            />
                        </div>

                        <div className="input-container">
                            <label>Province</label>
                            <select
                                className="form-control"
                                onChange={(event) =>
                                    this.handleOnChangeInput(
                                        event,
                                        "province_id"
                                    )
                                }
                                value={this.state.province_id}
                            >
                                <option value="">Select a Province</option>
                                {this.state.provinceList.map((province) => (
                                    <option
                                        key={province.id}
                                        value={province.id}
                                    >
                                        {province.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-container">
                            <label>Status</label>
                            <select
                                className="form-control"
                                value={this.state.status}
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "status")
                                }
                            >
                                <option value="">Select status</option>
                                <option value="ongoing">Ongoing </option>
                                <option value="upcoming">Upcoming</option>
                                <option value="ended">Ended</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label>Position</label>
                            <input
                                type="text"
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "position")
                                }
                                value={this.state.position}
                                className="form-control"
                            />
                        </div>
                        <div className="input-container">
                            <label>Google Map</label>
                            <input
                                type="text"
                                onChange={(event) =>
                                    this.handleOnChangeInput(
                                        event,
                                        "position_map"
                                    )
                                }
                                value={this.state.position_map}
                                className="form-control"
                            />
                        </div>
                        <div className="input-container">
                            <label>Target Amount</label>
                            <input
                                type="text"
                                onChange={(event) =>
                                    this.handleOnChangeInput(
                                        event,
                                        "target_amount"
                                    )
                                }
                                value={this.state.target_amount}
                                className="form-control"
                            />
                        </div>
                        
                        <div className="input-container">
                            <label>Start Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={this.state.start_date}
                                onChange={(event) =>
                                    this.handleOnChangeInput(
                                        event,
                                        "start_date"
                                    )
                                }
                            />
                        </div>
                        <div className="input-container">
                            <label>End Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={this.state.end_date}
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "end_date")
                                }
                            />
                        </div>
                        <div className="input-container">
                            <label>Image Link</label>
                            <input
                                type="text"
                                onChange={(event) =>
                                    this.handleOnChangeInput(event, "image")
                                }
                                value={this.state.image}
                                className="form-control"
                            />
                        </div>
                        <div className="input-container">
                            <label>Description</label>
                            <textarea
                                onChange={(event) =>
                                    this.handleOnChangeInput(
                                        event,
                                        "description"
                                    )
                                }
                                value={this.state.description}
                                className="form-control"
                                rows="4"
                            />
                        </div>
                        
                        <MdEditor
                            value={this.state.contentMarkdown} // Hiển thị nội dung Markdown từ state
                            style={{ height: "500px", width: "100%" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                        />
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
