import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
class HomeHeader extends Component {
    render() {
        return (
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <div className="menu-icon">
                            <i className="fas fa-bars"></i>
                        </div>
                        <div className="header-logo"></div>
                    </div>
                    <div className="center-content">
                        <div className="search-box">
                            <i className="fas fa-search"></i>
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm, danh mục ..."
                            />
                        </div>
                    </div>
                    <div className="right-content">
                        <button className="btn login-btn">
                            <i className="fas fa-user"></i>
                            <span>Đăng nhập</span>
                        </button>
                        <button className="btn cart-btn">
                            <i className="fas fa-shopping-cart"></i>
                            <span>Giỏ hàng</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
