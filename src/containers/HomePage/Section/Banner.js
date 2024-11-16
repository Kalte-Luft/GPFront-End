import React, { Component, createRef } from "react";
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
import CustomScrollbars from "../../../components/CustomScrollbars";

class Banner extends Component {
    textRef = createRef();
    leafRef = createRef();
    hill1Ref = createRef();
    hill4Ref = createRef();
    hill5Ref = createRef();

    componentDidMount() {
        if (this.props.scrollbarsRef.current) {
            this.props.scrollbarsRef.current.view.addEventListener("scroll", this.handleScroll);
            console.log("Scroll event listener added to CustomScrollbars");
        }
    }

    componentWillUnmount() {
        if (this.props.scrollbarsRef.current) {
            this.props.scrollbarsRef.current.view.removeEventListener("scroll", this.handleScroll);
            console.log("Scroll event listener removed from CustomScrollbars");
        }
    }

    handleScroll = () => {
        const value = this.props.scrollbarsRef.current.view.scrollTop;
        console.log("ScrollY Value:", value);

        if (this.textRef.current) {
            console.log("Updating text marginTop");
            this.textRef.current.style.marginTop = value * 2.5 + "px";
        }
        if (this.leafRef.current) {
            console.log("Updating leaf top");
            this.leafRef.current.style.top = value * -1.5 + "px";
        }
        if (this.hill5Ref.current) {
            console.log("Updating hill5 left");
            this.hill5Ref.current.style.left = value * 1.5 + "px";
        }
        if (this.hill4Ref.current) {
            console.log("Updating hill4 left");
            this.hill4Ref.current.style.left = value * -1.5 + "px";
        }
        if (this.hill1Ref.current) {
            console.log("Updating hill1 top");
            this.hill1Ref.current.style.top = value * 1 + "px";
        }
    };

    render() {
        return (
            //  <CustomScrollbars style={{height:'100vh',width: '100%'}}> 
            <div className="banner-container" >
                <div className="banner-content" >
                    <img ref={this.hill1Ref} src={hill1} id="hill1" alt="hill1" />
                    <img src={hill2} id="hill2" alt="hill2" />
                    <img src={hill3} id="hill3" alt="hill3" />
                    <img ref={this.hill4Ref} src={hill4} id="hill4" alt="hill4" />
                    <img ref={this.hill5Ref} src={hill5} id="hill5" alt="hill5" />
                    <img src={tree} id="tree" alt="tree" />
                    <h2 className="text" ref={this.textRef} id="text">GreenPaws</h2>
                    <img ref={this.leafRef} src={leaf} id="leaf" alt="leaf" />
                    <img src={plant} id="plant" alt="plant" />
                </div>
                <div className="sec">
                    <h2>Scrolling Effect</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
                        libero fugiat ut omnis mollitia inventore cum earum ipsum nesciunt sed quis
                        facere amet, sequi consectetur eius quidem quo ratione similique eveniet laborum.
                    </p>
                </div>
            </div>
            // </CustomScrollbars>
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
