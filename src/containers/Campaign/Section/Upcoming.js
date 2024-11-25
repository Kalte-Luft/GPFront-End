import React, { Component } from "react";
import { connect } from "react-redux";
import "./Upcoming.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class UpComing extends Component {
    render() {
        let settings = {
            centerMode: true,
            infinite: true,
            centerPadding: "10px",
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: false,
            speed: 1000,
            autoplaySpeed: 3000,
            pauseOnHover: false,
        };
        return (
            <div className="upcoming-container">
                <div className="upcoming-title">
                <i class="fa fa-play"></i>
                    Upcoming Campaigns
                </div>
                <div className="upcoming-content">
                    <Slider {...settings}>
                    <div className="upcoming-item" >
                            <img
                                
                                src="https://hnm.1cdn.vn/2022/08/26/hanoimoi.com.vn-uploads-images-tuandiep-2022-08-26-_can-bo-trung-tam-cuu-ho-don.jpg"
                                alt="upcoming"
                            />
                            <div class="text-overlay">
                            <h1>Campaign G</h1>
                            <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus. Donec facilisis fermentum sem, ac viv
                            </p>
                        </div>
                        <div className="filter">Read more...</div>
                        </div>
                        <div className="upcoming-item" >
                            <img
                                
                                src="https://th.bing.com/th/id/OIP.0sbaLUdVI3x6oL-880GktwHaE7?rs=1&pid=ImgDetMain"
                                alt="upcoming"
                            />
                            <div class="text-overlay">
                                <h1>Campaign H</h1>
                                <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus. Donec facilisis fermentum sem, ac viv
                                </p>
                            </div>
                            <div className="filter">Read more...</div>
                        </div>
                    <div className="upcoming-item" >
                            <img
                                
                                src="https://recmiennam.com/wp-content/uploads/2018/03/hinh-nen-desktop-12.jpg"
                                alt="upcoming"
                            />
                            <div class="text-overlay">
                                <h1>Campaign I</h1>
                                <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus. Donec facilisis fermentum sem, ac viv
                                </p>
                            </div>
                            <div className="filter">Read more...</div>
                        </div>
                        <div className="upcoming-item" >
                            <img
                                
                                src="https://th.bing.com/th/id/OIP.RwHZYBPb3VmPE74sUB_mhQHaEy?rs=1&pid=ImgDetMain"
                                alt="upcoming"
                            />
                            <div class="text-overlay">
                                <h1>Campaign K</h1>
                                <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus. Donec facilisis fermentum sem, ac viv
                                </p>
                            </div>
                            <div className="filter">Read more...</div>
                        </div>
                        <div className="upcoming-item" >
                            <img
                                
                                src="https://3.bp.blogspot.com/-ModI9D8GffM/W9iE1HA9evI/AAAAAAAAhP0/-0_0rgpvCgw3j-Xl8AiWffYDCib-Sw3VACLcBGAs/s1600/tuyet-chung-1.jpg"
                                alt="upcoming"
                            />
                            <div class="text-overlay">
                                <h1>Campaign L</h1>
                                <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus. Donec facilisis fermentum sem, ac viv
                                </p>
                            </div>
                            <div className="filter">Read more...</div>
                        </div>                      
                    </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(UpComing);
