import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./Method.scss";
import Aoe from "aoejs";

const Method = (props) => {
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
  }, []);  // Dependency array rỗng để chạy effect sau khi render lần đầu tiên

  return (
    <div className="method-container">
      <div className="method-content">
        {/* Thêm hiệu ứng fadeInLeft cho phần tử có className="left-content" */}
        <div className="left-content" data-aoe="fadeInLeft">
          <h1>Our Unique Carbon Balancing Approach</h1>
          <h3>Project & Partner Selection</h3>
          <p>
            Greenpaw selects partners that protect established
            biodiverse forests and accelerate the healing and
            regenerative potential of nature. Your contributions
            support projects designed to provide a range of
            resilient, long-term solutions to many of the global
            challenges we face in the world today. A
            ‘whole-system approach’ is where everything on the
            land benefits.
          </p>
        </div>

        {/* Thêm hiệu ứng fadeInRight cho phần tử có className="right-content" */}
        <div className="right-content" data-aoe="fadeInRight">
          <div className="leopard-img"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Method);
