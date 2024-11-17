import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Banner from './Section/Banner';
import Join from './Section/Join';
import Method from './Section/Method';
import HomeFooter from './HomeFooter';
import './HomePage.scss';
import Approach from './Section/Approach';
import EthicalStandards from './Section/EthicalStandards';
import Reality from './Section/Reality';
import Partners from './Section/Partners';
import Calculator from './Section/Calculator';
class HomePage extends Component {
    scrollbarsRef = createRef();

    render() {
        return (
            
                <div className='web-body' ref={this.scrollbarsRef} style={{overflowY:'scroll'}}>
                    <HomeHeader />
                    <Banner scrollbarsRef={this.scrollbarsRef} />
                    <Join/>
                    <Method/>
                    <Approach/>
                    <EthicalStandards/>
                    <Reality/>
                    <Partners/>
                    <Calculator/>
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