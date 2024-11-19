import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./CarbonBanner.scss";
import Aoe from 'aoejs';  // Import Aoejs


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
            <div className="carbon-banner" >
                <h1 data-aoe="fadeIn">Lượng carbon thải ra tại Việt Nam</h1>
                <p data-aoe="fadeIn">
                    Trong những năm gần đây, song song với quá trình công nghiệp
                    hóa và đô thị hóa mạnh mẽ. Theo các báo cáo, Việt Nam hiện
                    nằm trong nhóm các quốc gia có tốc độ tăng trưởng phát thải
                    khí nhà kính nhanh nhất khu vực Đông Nam Á. Ngành công
                    nghiệp, năng lượng, giao thông vận tải và nông nghiệp là
                    những nguồn phát thải chính, với việc sử dụng nhiên liệu hóa
                    thạch như than đá, dầu mỏ và khí đốt vẫn chiếm tỷ lệ lớn.
                </p>
                <p data-aoe="fadeIn">
                    Mặc dù Việt Nam đã cam kết đạt mục tiêu trung hòa carbon vào
                    năm 2050 tại Hội nghị COP26, nhưng thách thức trong việc
                    chuyển đổi sang các nguồn năng lượng tái tạo, cải thiện hiệu
                    suất năng lượng và giảm khí thải trong sản xuất vẫn còn rất
                    lớn.
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
