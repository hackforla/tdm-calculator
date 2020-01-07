import React from "react";
import { Link } from "react-router-dom";

const LandingPageSectionResidentialDev = props => {
    return (
        <div className="res-dev-container">
            <div className="res-dev-column-1">
                <h3>Residential Real Estate Developer?</h3>
            </div>
            <div className="res-dev-column-2">
                <h3><Link to="#">How Mobility Plan 2035 affects you  ❯</Link></h3>
            </div>
        </div>
    )
}

export default LandingPageSectionResidentialDev;