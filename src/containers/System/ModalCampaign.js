import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { emitter } from "../../utils/emitter";
import { getAllProvinces } from "../../services/campaignService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ModalCampaign extends Component {
    //hàm này dùng để khởi tạo state hoặc bind các function
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
            current_amount: "",
            contentHTML: "",
            contentMarkdown: "",
            image: "",
            start_date: new Date(),
            end_date: new Date(),
        };
        this.listenToEmitter();
    }
    //hàm này dùng để lắng nghe sự kiện từ emitter, ở đây là sự kiện clear data của modal
    listenToEmitter = () => {
        emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
            this.setState({
                title: "",
                provinceList: [],
                position: "",
                position_map: "",
                description: "",
                status: "",
                target_amount: "",
                current_amount: "",
                contentHTML: "",
                contentMarkdown: "",
                image: "",
                start_date: new Date(),
                end_date: new Date(),
            });
        });
    };
    componentDidMount() {
        this.loadProvinces();
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        });
    }
    
    //hàm này dùng để đóng mở modal
    toggle = () => {
        this.props.toggleFromParent();
    };

    // Hàm tải danh sách tỉnh từ API
    loadProvinces = async () => {
        try {
            let response = await getAllProvinces("ALL"); // Gọi API
            console.log("Response: ", response);
            if (response && response.errCode === 0) {
                this.setState({
                    provinceList: response.Provinces || [], // Đảm bảo luôn gán giá trị mảng
                });
                
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

    //hàm này dùng để lưu giá trị của input vào state
    handleOnChangeInput = (event, id) => {
        //good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
            
    };

    //hàm này dùng để kiểm tra xem input có đúng không
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            "title",
            "province_id",
            "position",
            "position_map",
            "description",
            "status",
            "target_amount",
            "current_amount",
            "contentMarkdown",
            "contentHTML",
            "image",
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
    //hàm này dùng để thêm mới campaign
    handleAddNewCampaign = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            // Thêm contentMarkdown và contentHTML vào payload
            const campaignData = {
                ...this.state, // Lấy toàn bộ state, bao gồm contentMarkdown và contentHTML
                contentMarkdown: this.state.contentMarkdown,
                contentHTML: this.state.contentHTML,
            };
            this.props.createNewCampaign(campaignData); // Gọi hàm để gửi dữ liệu
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
                    Create a new campaign
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
                            <label>Current Amount</label>
                            <input
                                type="text"
                                onChange={(event) =>
                                    this.handleOnChangeInput(
                                        event,
                                        "current_amount"
                                    )
                                }
                                value={this.state.current_amount}
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
                                    this.handleOnChangeInput(
                                        event,
                                        "image"
                                    )
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
                        
                        <div className="input-container" style={{width:"100%"}}>
                        <label>Detail Content</label>    
                        <MdEditor
                            style={{ height: "500px", width: "100%" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                        />
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className=" px-3"
                        onClick={() => this.handleAddNewCampaign()}
                    >
                        Add New
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCampaign);
