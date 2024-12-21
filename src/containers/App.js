import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated} from '../hoc/authentication';
import { path } from '../utils'
import Home from '../routes/Home';
import Login from './Auth/Login';
import System from '../routes/System';
import { CustomToastCloseButton } from '../components/CustomToast';
import HomePage from './HomePage/HomePage.js'; 
import CustomScrollbars from '../components/CustomScrollbars.js';
import AboutUs from './About/AboutUs.js';
import ContactUs from './Contact/ContactUs.js';
import Status from './Status/StatusPage.js';
import Campaign from './Campaign/CampaignPage.js';
import DonateUs from './Donate/DonateUs.js'
import Signup from './Auth/Signup.js';
import OurProduct from './ProductPage/OurProduct.js';
import DetailCampaign from './Campaign/DetailCampaign/DetailCampaign.js';
import BadRequest from './ErrorDocs/404.js';
import CheckOut from './Donate/CheckOut/CheckOut.js';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                {/* lưu lại data sau đăng nhập trên front-end*/}
                <BrowserRouter history={history}>
                    <div className="main-container" style={{fontFamily: "futura bt"}}>
                        {/* nếu logging r thì render tới header */}

                        <div className="content-container">
                            <CustomScrollbars style ={{height: '100vh', width: '100%'}}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} /> {/*hàm bọc để check xem người dùng đã đăng nhập hay ch*/}
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.SIGNUP} component={Signup} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.ABOUT_US} component={AboutUs} />
                                    <Route path={path.CONTACT_US} component={ContactUs} />
                                    <Route path={path.STATUS} component={Status} />
                                    <Route path={path.CAMPAIGN} component={Campaign} />
                                    <Route path={path.DONATE} component={DonateUs} />
                                    <Route path={path.PRODUCT} component={OurProduct}/>
                                    <Route path={path.DETAIL_CAMPAIGN} component={DetailCampaign}/>
                                    <Route path={path.CHECKOUT} component={CheckOut} />  
                                    <Route path={path.ERROR} component={BadRequest} />  
                                  
                                </Switch>
                            </CustomScrollbars>
                        </div>

                        <ToastContainer  //thong bao
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        />
                    </div>
                </BrowserRouter>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        isAdmin: state.user.isAdmin
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);