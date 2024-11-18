import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./Join.scss";
import Aoe from 'aoejs';  // Import Aoejs

const Join = (props) => {
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
    <div className="join-container">
      <div className="join-img-bgr">
        <div className="join-content">
          {/* Thêm data-aoe cho hiệu ứng fadeIn */}
          <h1 className="title-1" data-aoe="fadeIn">
            Protecting earth's existing Edens
          </h1>
          {/* Thêm data-aoe cho hiệu ứng fadeInRight */}
          <h1 className="title-2" data-aoe="fadeIn">
            Regenerating landscapes to thrive
          </h1>
          <p className="description" data-aoe="fadeIn">
            It’s vitally important that we humans collectively
            protect our planet’s life support systems, turn
            carbon into breathable oxygen, and facilitate land
            regeneration to support biodiversity, helping local
            communities thrive. Together, we can help the earth
            heal.
          </p>
          <button className="btn" data-aoe="fadeIn">
            <span>Discover Now</span>
          </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Join);
