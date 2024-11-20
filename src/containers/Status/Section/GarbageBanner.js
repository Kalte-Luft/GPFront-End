import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./GarbageBanner.scss";
import Aoe from "aoejs";

const GarbageBanner = (props) => {
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
        <div className="garbage-banner-container">
            <div className="garbage-banner-content">
                <div className="left-content" data-aoe="popInBottom">
                    <h1>Waste</h1>

                    <p>
                        Waste, especially plastic and non-degradable materials,
                        is causing severe impacts on wildlife worldwide. Animals
                        often get entangled in or ingest waste, leading to a
                        high risk of mortality.
                    </p>
                    <p>
                        In addition, waste also pollutes the animals' habitats,
                        affecting the natural ecosystems they rely on.
                    </p>
                </div>
                <div className="right-content" data-aoe="popInBottom">
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

export default connect(mapStateToProps, mapDispatchToProps)(GarbageBanner);
