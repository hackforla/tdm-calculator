import React from "react";
import LandingPageSectionHeroImage from "../components/LandingPageSectionHeroImage";
import LandingPageSectionIntroducing from "../components/LandingPageSectionIntroducing";
import LandingPageSectionWhyLATDM from "../components/LandingPageSectionWhyLATDM";
import LandingPageSectionMockUp from "../components/LandingPageSectionMockUp";
import LandingPageSectionResidentialDev from "../components/LandingPageSectionResidentialDev";
import LandingPageSectionEnd from "../components/LandingPageSectionEnd";

const LandingPage = props => {
    return (
        <div>
            <LandingPageSectionHeroImage />
            <LandingPageSectionIntroducing />
            <LandingPageSectionWhyLATDM />
            <LandingPageSectionMockUp />
            <LandingPageSectionResidentialDev />
            <LandingPageSectionEnd />
        </div>
    )
}

export default LandingPage;