import React, { Component } from "react";
import { connect } from "react-redux";
import "./Banner.scss";
import hill1 from "../../../assets/images/hill1.png";
import hill2 from "../../../assets/images/hill2.png";
import hill3 from "../../../assets/images/hill3.png";
import hill4 from "../../../assets/images/hill4.png";
import hill5 from "../../../assets/images/hill5.png";
import tree from "../../../assets/images/tree.png";
import leaf from "../../../assets/images/leaf.png";
import plant from "../../../assets/images/plant.png";
import deer from "../../../assets/images/deer.png";
class Banner extends Component {
    render() {
        return (
            <div className="banner-container">
                <div className="banner-content">
                    <img src={hill1} id="hill1" />
                    <img src={hill2} id="hill2" />
                    <img src={hill3} id="hill3" />
                    <img src={hill4} id="hill4" />
                    <img src={hill5} id="hill5" />
                    <img src={tree}  id="tree" />
                    <h2 className="text">GreenPaws</h2>
                    <img src={leaf} id="leaf" />
                    <img src={plant}  id="plant" />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
