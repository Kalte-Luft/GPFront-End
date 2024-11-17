import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./EthicalStandards.scss";
import Aoe from "aoejs";

const EthicalStandards = (props) => {
    // Hook useEffect thay thế componentDidMount
    useEffect(() => {
        // Tạo instance Aoe và khởi tạo
        const aoe = new Aoe();
        aoe.init({
            attributes: {
                dataset: "data-aoe", // Chỉ định thuộc tính `data-aoe` để áp dụng hiệu ứng
                delay: "data-aoe-delay",
                speed: "data-aoe-speed",
            },
            observerRoot: null,
            observeRootMargin: "0px",
            observeRootThreshold: [0, 0.5, 0.75, 1],
            intersectionRatio: 0.5,
            once: false,
            speed: 1000,
            delay: 0,
            timingFunction: "linear",
        });

        // Clean-up khi component bị unmount hoặc khi effect thay đổi
        return () => {
            aoe.disconnectObservers();
        };
    }, []); // Dependency array rỗng để chạy effect sau khi render lần đầu tiên

    return (
        <div className="ethical-standards-container">
            <div className="ethical-standards-content">
                {/* Thêm hiệu ứng fadeInLeft cho phần tử có className="left-content" */}
                <div className="left-content" data-aoe="fadeInLeft">
                    <h1>High Ethical Standards</h1>
                    <h3>Open & Transparent</h3>
                    <p>
                        Greenpaw openly and transparently operate our services
                        to a high ethical standard, and feedback impact reports
                        to show you exactly how important your investment into
                        the future of the earth is helping protect or regenerate
                        our natural lands to the thriving state they should be
                        in.
                    </p>
                </div>

                {/* Thêm hiệu ứng fadeInRight cho phần tử có className="right-content" */}
                <div className="right-content" data-aoe="fadeInRight">
                    <div className="girl-img"></div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EthicalStandards);
