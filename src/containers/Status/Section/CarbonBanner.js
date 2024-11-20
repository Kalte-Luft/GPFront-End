import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./CarbonBanner.scss";
import Aoe from "aoejs"; // Import Aoejs

const CarbonBanner = () => {
    useEffect(() => {
        // Khởi tạo Aoe
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
            speed: 1500,
            delay: 0,
            timingFunction: "linear",
        });

        // Clean-up để ngắt kết nối observers khi component unmount
        return () => {
            aoe.disconnectObservers();
        };
    }, []); // Chạy sau khi component render lần đầu tiên

    return (
        <div className="carbon-banner-container">
            <div className="carbon-banner">
                <h1 data-aoe="fadeIn">
                    The amount of carbon emissions in Vietnam
                </h1>
                <p data-aoe="fadeIn">
                    In recent years, alongside rapid industrialization and
                    urbanization, Vietnam has been reported to be among the
                    countries with the fastest-growing greenhouse gas emissions
                    in Southeast Asia. The main sources of emissions include the
                    industrial, energy, transportation, and agricultural
                    sectors, with the use of fossil fuels such as coal, oil, and
                    natural gas still accounting for a significant proportion.
                </p>
                <p data-aoe="fadeIn">
                    Although Vietnam has committed to achieving carbon
                    neutrality by 2050 at the COP26 Conference, significant
                    challenges remain in transitioning to renewable energy
                    sources, improving energy efficiency, and reducing emissions
                    in production.
                </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(CarbonBanner);
