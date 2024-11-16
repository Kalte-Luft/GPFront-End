import React, { Component, createRef } from "react";
import { connect } from "react-redux";


class Banner extends Component {

    render() {
        return (
            //  <CustomScrollbars style={{height:'100vh',width: '100%'}}> 
            <div className="infor-container" style={{height:'100vh'}}>
                                             
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
