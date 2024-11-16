import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Banner from './Section/Banner';
import './HomePage.scss';
import CustomScrollbars from '../../components/CustomScrollbars';

class HomePage extends Component {
    scrollbarsRef = createRef();

    render() {
        return (
            
                <div className='web-body' ref={this.scrollbarsRef}  style={{ overflowY: "scroll", height: "100vh" }}>
                    <HomeHeader />
                    <Banner scrollbarsRef={this.scrollbarsRef} />
                </div>
        
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);