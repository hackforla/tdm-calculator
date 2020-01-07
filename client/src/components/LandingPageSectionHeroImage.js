import React from "react";
import HeroImage from "../images/hero-image-shea-rouda-tk4qYI9Mm5A-unsplash.png";

const LandingPageSectionHeroImage = () => {
    return (
        <div className="landing-page-hero-image-container">
            <img src={HeroImage} alt="hero-image" />
            <div className="landing-page-hero-image-text">
                <h1 style={{ fontWeight: 900, fontSize: 90 }}>LA TDM</h1>
                <h2 style={{ fontSize: 60 }}>Better for your project.</h2>
                <h2 style={{ fontSize: 60 }}>Better for LA.</h2>
                <button className="green-btn">Start Your Project</button>
            </div>
        </div>
    )
}

export default LandingPageSectionHeroImage;