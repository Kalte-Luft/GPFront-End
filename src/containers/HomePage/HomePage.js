import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Banner from './Section/Banner';
import Infor from './Section/Infor';
import HomeFooter from './HomeFooter';
import './Footer.scss';
import './HomePage.scss';
import CustomScrollbars from '../../components/CustomScrollbars';

class HomePage extends Component {
    scrollbarsRef = createRef();

    render() {
        return (
            
                <div className='web-body' ref={this.scrollbarsRef} style={{overflowY:'scroll'}}>
                    <HomeHeader />
                    <Banner scrollbarsRef={this.scrollbarsRef} />
                    <Infor />
                    <HomeFooter />
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