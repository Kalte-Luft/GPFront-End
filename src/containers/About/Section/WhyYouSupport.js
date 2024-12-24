import React, { useEffect, useRef } from "react";
import { connect } from "react-redux"; // Kết nối Redux
import Aoe from "aoejs"; // Import Aoejs
import "./WhyYouSupport.scss";

const WhyYouSupport = (props) => {

	useEffect(() => {
				// Khởi tạo Aoe
				const aoe = new Aoe();
				aoe.init({
					attributes: {
						dataset: "data-aoe", // Chỉ định thuộc tính `data-aoe` để áp dụng hiệu ứng
						delay: "data-aoe-delay",
						speed: "data-aoe-speed",
					},
					observerRoot: null,
					observeRootMargin: "0px",
					observeRootThreshold: [0, 0.5, 0.75, 1],
					intersectionRatio: 0.5,
					once: false,
					speed: 800,
					delay: 0,
					timingFunction: "linear",
				});
		
				// Clean-up để ngắt kết nối observers khi component unmount
				return () => {
					aoe.disconnectObservers();
				};
			}, []); // Chạy sau khi component render lần đầu tiên

    return (
        <div className="WhyYouSupport"data-aoe="ball">
            <div className="WhyYouSupport-container" >
                <div className="WhyYouSupport-bg">
                    <div className="content-top">
                        <h3>Why You Should Support</h3>
                        <div className="logo"></div>
                    </div>
                    <div className="content-down">
                        <p>
                            Navigating the urgent global climate challenge, Greenpaw stands out by embracing a holistic regeneration strategy. Beyond traditional carbon offsetting,
                            we incorporate advanced sequestration metrics with initiatives that foster food security, robust rewilding, and socio-economic stability.
                            Our meticulous grading system spans comprehensive areas, from carbon emissions mitigation to biodiversity conservation and community enrichment. <br />
                            Every project within Greenpaw's regeneration portfolio undergoes this rigorous environmental and social impact assessment,
                            underscoring our commitment to a more sustainable, transparent, and ecologically restorative future;
                            positioning us as pioneers in the realm of transformative sustainability and community upliftment.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WhyYouSupport);
