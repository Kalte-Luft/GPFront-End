import React,{ useEffect }  from "react";
import { connect } from "react-redux";
import "./Approach.scss";
import Aoe from 'aoejs';  // Import Aoejs
const Approach = () => {
    useEffect(() => {
        const aoe = new Aoe();
        aoe.init({
          attributes: {
            dataset: "data-aoe", 
            delay: "data-aoe-delay",
            speed: "data-aoe-speed",
          },
          observerRoot: null,
          observeRootMargin: "0px",
          observeRootThreshold: [0, 0.5, 0.75, 1],
          intersectionRatio: 0.5,
          once: false,
          speed: 600,
          delay: 0,
          timingFunction: "linear",
        });
    
        return () => {
          aoe.disconnectObservers();
        };
      }, []); 
    return (
        <div className="approach-container" data-aoe="fadeInBottom">
            <div className="approach-content" >
                <div className="filter">
                    <div className="left-content">
                        <h1>Whole-System Approach</h1>
                    </div>
                    <div className="right-content">
                        <ul>
                            <li>Creation of oxygen for the planet</li>
                            <li>Planting trees, plants and shrubs</li>
                            <li>Locking in carbon</li>
                            <li>Improving soil quality</li>
                            <li>Maximising and cleaning water systems</li>
                            <li>Creating edible foods</li>
                            <li>Protect biodiversity</li>
                            <li>
                                Strengthen local communities and support land
                                stewards.
                            </li>
                        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Approach);
