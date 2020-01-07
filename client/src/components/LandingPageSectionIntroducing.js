import React from "react";
import planning from "../images/planning.svg";
import checklist from "../images/checklist.svg";
import computer from "../images/computer.svg";
import handshake from "../images/handshake.svg";
import construction from "../images/construction.svg";

const LandingPageSectionIntroducing = props => {
    return (
        <div className="landing-page-container">
            <div className="landing-page-center-text">
                <h2>Introducing</h2>
                <h1>LA TDM</h1>
                <p>Lorem ipsum dolor sit <strong>amet</strong>, consectetur adipiscing <strong>elit</strong>, sed do <strong>eiusmod</strong> tempor incididunt ut <strong>labore</strong> et dolore magna aliqua. Tellus id <strong>interdum</strong> velit laoreet id.</p>
            </div>
            <div className="intro-icon-container">
                <div className="intro-icon-item">
                    <img src={planning} alt="planning-icon" />
                </div>
                <div className="intro-icon-item">
                    <img src={checklist} alt="checklist-icon" />
                </div>
                <div className="intro-icon-item">
                    <img src={computer} alt="computer-icon" />
                </div>
                <div className="intro-icon-item">
                    <img src={handshake} alt="handshake-icon" />
                </div>
                <div className="intro-icon-item">
                    <img src={construction} alt="construction-icon" />
                </div>
            </div>
        </div>
    )
}

export default LandingPageSectionIntroducing;