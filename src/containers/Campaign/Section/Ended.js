import React, { Component } from "react";
import { connect } from "react-redux";
import "./Ended.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class Ended extends Component {
    render() {
        let settings = {
            centerMode: true,
            infinite: true,
            centerPadding: "10px",
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            speed: 1000,
            autoplaySpeed: 3000,
            pauseOnHover: false,
        };
        return (
            <div className="ended-container">
                <div className="ended-title">
                <i class="fa fa-play"></i>
                    Ended Campaigns
                </div>
                <div className="ended-content">
                    <Slider {...settings}>
                    <div className="ended-item" >
                            <img
                                
                                src="https://th.bing.com/th/id/OIP.BMOTzYT4lQnbwXkeQUtMVAAAAA?rs=1&pid=ImgDetMain"
                                alt="ended"
                            />
                            <div class="text-overlay">
                                <h1>Campaign 1</h1>
                                <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus. Donec facilisis fermentum sem, ac viv
                                </p>
                            </div>
                            <div className="filter">Read More...</div>
                        </div>
                        <div className="ended-item" >
                            <img
                                
                                src="https://th.bing.com/th/id/R.4cd07a88113a030a22b06f7df5962fce?rik=V7dMINZrym6Phg&pid=ImgRaw&r=0"
                                alt="ended"
                            />
                            <div class="text-overlay">
                                <h1>Campaign 2</h1>
                                <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus. Donec facilisis fermentum sem, ac viv
                                </p>
                            </div>
                            <div className="filter">Read More...</div>
                        </div>
                    <div className="ended-item" >
                            <img
                                
                                src="https://file1.dangcongsan.vn/data/0/images/2023/06/27/upload_673/3.png?dpi=150&quality=100&w=780"
                                alt="ended"
                            />
                            <div class="text-overlay">
                                <h1>Campaign 3</h1>
                                <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus. Donec facilisis fermentum sem, ac viv
                                </p>
                            </div>
                            <div className="filter">Read More...</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Ended);
