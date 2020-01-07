import React from "react";
import macbook from "../images/mock-MacBook.png";
import planning from "../images/planning.svg";
import checklist from "../images/checklist.svg";
import computer from "../images/computer.svg";
import handshake from "../images/handshake.svg";

const LandingPageSectionMockUp = props => {
    return (
        <div className="mock-up-container">
            <div className="big-container">
                <img src={macbook} alt="mock-macbook" />
            </div>
            <div className="big-container">
                <div className="text-container">
                    <div className="small-container">
                        <p><strong>Better for the Environment</strong>
                        <br/>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
                        <div className="mock-up-icon">
                            <img src={planning} alt="planning-icon" width="35px" />
                        </div>
                    </div>

                    <div className="small-container">
                        <p><strong>Reduce Risks</strong>
                        <br/>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
                        <div className="mock-up-icon">
                            <img src={checklist} alt="checklist-icon" width="35px" />
                        </div>
                    </div>

                    <div className="small-container">
                        <p><strong>Reduce Congestion</strong>
                        <br/>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
                        <div className="mock-up-icon">
                            <img src={computer} alt="computer-icon" width="35px" />
                        </div>
                    </div>

                    <div className="small-container">
                        <p><strong>Improve Transportation Network</strong>
                        <br/>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
                        <div className="mock-up-icon">
                            <img src={handshake} alt="handshake-icon" width="35px" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPageSectionMockUp;