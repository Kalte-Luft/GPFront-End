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
            autoplay: true,
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
                                
                                src="https://giaingo.info/wp-content/uploads/2021/07/4708875_Cover_Rung-768x476.jpg"
                                alt="upcoming"
                            />
                        </div>
                        <div className="upcoming-item" >
                            <img
                                
                                src="https://th.bing.com/th/id/OIP.0sbaLUdVI3x6oL-880GktwHaE7?rs=1&pid=ImgDetMain"
                                alt="upcoming"
                            />
                        </div>
                    <div className="upcoming-item" >
                            <img
                                
                                src="https://toquoc.mediacdn.vn/280518851207290880/2022/8/15/f48a290cecf52eab77e4-1-1660532019040535652705.jpg"
                                alt="upcoming"
                            />
                        </div>
                        <div className="upcoming-item" >
                            <img
                                
                                src="https://th.bing.com/th/id/OIP.RwHZYBPb3VmPE74sUB_mhQHaEy?rs=1&pid=ImgDetMain"
                                alt="upcoming"
                            />
                        </div>
                        <div className="upcoming-item" >
                            <img
                                
                                src="https://3.bp.blogspot.com/-ModI9D8GffM/W9iE1HA9evI/AAAAAAAAhP0/-0_0rgpvCgw3j-Xl8AiWffYDCib-Sw3VACLcBGAs/s1600/tuyet-chung-1.jpg"
                                alt="upcoming"
                            />
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
