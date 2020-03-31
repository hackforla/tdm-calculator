import React from "react";
import LandingPageSectionHeroImage from "./LandingPageSectionHeroImage";
import LandingPageSectionIntroducing from "./LandingPageSectionIntroducing";
import LandingPageSectionWhyLATDM from "./LandingPageSectionWhyLATDM";
import LandingPageSectionMockUp from "./LandingPageSectionMockUp";
import LandingPageSectionResidentialDev from "./LandingPageSectionResidentialDev";
import LandingPageSectionEnd from "./LandingPageSectionEnd";

const LandingPage = () => {
  return (
    <div>
      <LandingPageSectionHeroImage />
      <LandingPageSectionIntroducing />
      <LandingPageSectionWhyLATDM />
      <LandingPageSectionMockUp />
      <LandingPageSectionResidentialDev />
      <LandingPageSectionEnd />
    </div>
  );
};

export default LandingPage;
