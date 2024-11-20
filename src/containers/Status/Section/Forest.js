import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./Forest.scss";
import Aoe from "aoejs"; // Import Aoejs
import ReactECharts from "echarts-for-react";

const Forest = () => {
    const years = ["2019", "2020", "2021", "2022", "2023"];
    const forestArea = [14.6, 14.67, 14.74, 14.79, 14.86]; // Đơn vị: triệu ha

    // Cấu hình biểu đồ ECharts
    const option = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },
        xAxis: {
            type: "category",
            data: years,
            axisLabel: {
                rotate: 0, // Không xoay nhãn
            },
        },
        yAxis: {
            type: "value",
            name: "Acreage (million ha)",
            min: 14.5, // Giá trị bắt đầu trục Y
            max: 15, // Giá trị kết thúc trục Y
            axisLabel: {
                formatter: "{value} million ha",
            },
        },

        series: [
            {
                name: "Forest area",
                type: "bar",
                data: forestArea,
                barWidth: "50%", // Độ rộng cột
                itemStyle: {
                    color: "#359381", // Màu cột
                    borderRadius: [3, 9, 0, 0], // Bo tròn góc trên
                },
                label: {
                    show: true,
                    position: "top",
                    formatter: "{c} million ha", // Định dạng hiển thị giá trị trên cột
                },
            },
        ],
    };
    // Hook useEffect để khởi tạo Aoejs
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
            speed: 800,
            delay: 0,
            timingFunction: "linear",
        });

        // Clean-up để ngắt kết nối observers khi component unmount
        return () => {
            aoe.disconnectObservers();
        };
    }, []); // Chạy sau khi component render lần đầu tiên
    return (
        <div className="forest-container">
            <div className="forest-content">
                <div className="filter">
                    <div className="content">
                        <div className="left-content" data-aoe="driveInLeft">
                            <h1>Forest</h1>
                            <p>
                                The illegal deforestation, logging, and
                                encroachment on forest land for cultivation
                                continue to occur in many areas, especially in
                                mountainous and remote regions.
                            </p>
                            <p>
                                The forest area in Vietnam increased from 14.6
                                million hectares in 2019 to 14.86 million
                                hectares in 2023. However, this figure is still
                                low compared to the target of 16.2 million
                                hectares by 2030.
                            </p>
                        </div>
                        <div className="right-content " data-aoe="driveInRight">
                            <h1>
                                Changes in forest area over the past 5 years
                            </h1>
                            <ReactECharts
                                option={option}
                                style={{ height: "400px", width: "100%" }}
                            />
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Forest);
