import React from "react";
import SideBar from "./Sidebar";
import clsx from "clsx";
import { createUseStyles } from "react-jss";

import { version } from "../../package.json";

const useStyles = createUseStyles({
  root: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column"
  },
  tdmWizard: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "row"
  },
  aboutText: {
    maxWidth: "500px",
    minWidth: 300,
    padding: "0 2em"
  },
  scroll: {
    "&::-webkit-scrollbar": {
      webkitappearance: "none",
      width: "7px"
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "4px",
      backgroundColor: "rgba(0, 0, 0, .5)",
      webkitBoxShadow: "0 0 1px rgba(255, 255, 255, .5)"
    },
    overflowY: "scroll",
    width: "600px",
    height: "600px"
  },
  header: {
    fontFamily: "Calibri Bold",
    fontWeight: "normal",
    fontSize: "25px",
    lineHeight: "1.25em",
    color: "#0F2940",
    textAlign: "center"
  },
  bold: {
    textShadow: "1px 0 0 currentColor"
  },
  "@media (max-width: 768px)": {
    aboutText: {
      padding: "0"
    }
  },
  link: {
    textDecoration: "underline",
    color: "blue"
  },
  greyText: {
    color: "grey"
  }
});

const TermsAndConditions = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={clsx("tdm-wizard", classes.tdmWizard)}>
        <SideBar />
        <div className="tdm-wizard-content-container">
          <h1 className={classes.header}>Terms and Conditions</h1>
          <br />
          <div className={(classes.aboutText, classes.scroll)}>
            <p className={classes.greyText}>
              PLEASE READ THIS AGREEMENT CAREFULLY BEFORE USING THIS WEB SITE.
              BY USING THIS WEB SITE, YOU ARE CONSENTING TO BE OBLIGATED AND
              BECOME A PARTY TO THIS AGREEMENT. IF YOU DO NOT AGREE TO THE TERMS
              AND CONDITIONS BELOW YOU SHOULD NOT ACCESS OR USE THIS WEB SITE
            </p>
            <p>
              The Los Angeles Department of Transportation (LADOT), in
              partnership with the Department of City Planning and Hack for LA
              (a project of Code for America), has developed the City of Los
              Angeles Transportation Demand Management (TDM) Calculator (TDM
              Calculator) to provide the public with an understanding of the TDM
              Ordinance. Currently available for review: Council File
              <span> </span>
              <a
                className={classes.link}
                href="https://cityclerk.lacity.org/lacityclerkconnect/index.cfm?fa=ccfi.viewrecord&cfnumber=15-0719-S19"
              >
                15-0719-S19
              </a>{" "}
              / the Los Angeles Department of City Planning website (CPC Case
              No. to be provided))). The TDM Ordinance proposes to revise
              regulations that require eligible land use development projects to
              adopt TDM strategies with the goal to reduce the reliance on
              drive-alone trips in the City of Los Angeles. The term “City” as
              used below shall refer to the City of Los Angeles. The terms
              “City” and “Hack for LA” as used below shall include their
              respective affiliates, sub-consultants, employees, volunteers, and
              representatives.
            </p>
            <p>
              This digital review tool, the TDM Calculator, has been provided to
              You, the User, as a public service to assess different scenarios
              that land use development would need to comply with if the City
              were to adopt the TDM Ordinance. LADOT is pleased to be able to
              provide this information to the public. LADOT believes that the
              public is most effectively served when they are provided access to
              the technical tools that inform the public policy-making process
              that governs private and public land-use investments. However, in
              using the TDM Calculator, You agree to be bound by this TDM
              Calculator User Agreement (this Agreement).{" "}
            </p>
            <p>
              <span className={classes.bold}>Limited License to Use.</span> This
              Agreement gives You a limited, non-transferable, non-assignable,
              and non-exclusive license to use the TDM Calculator on a computer
              system owned, leased, or otherwise controlled by You in Your own
              facilities, as set out below and provided that You know and follow
              the terms of this Agreement. Your failure to follow the terms of
              this Agreement shall automatically terminate this license and Your
              right to use the TDM Calculator.{" "}
            </p>
            <p>
              <span className={classes.bold}>Warranty Disclaimer.</span> LADOT
              worked with the Department of City Planning and Hack for LA to
              develop the TDM Calculator’s parameters, including potential TDM
              strategies, and program point targets that could apply to land use
              development. However, since the TDM Ordinance is a draft
              regulation and not current law, it could further change, or be
              adopted in whole, or in part, denied, or abandoned, the
              information herein should not be interpreted to be binding on land
              use development regulation outcomes that inform investment
              decisions. Due to the dynamic nature of the information contained
              within the TDM Calculator and the reliance upon information from
              outside sources, the City does not guarantee the accuracy or
              reliability of the information transmitted from this web site. The
              TDM Calculator, OUTPUTS AND ASSOCIATED DATA ARE PROVIDED “as is”
              WITHOUT WARRANTY OF ANY KIND, whether expressed, implied,
              statutory or otherwise including but not limited to, warranties of
              title or the implied warranties of merchantability and fitness for
              a particular purpose. Neither the City nor Hack for LA are
              responsible for any special, indirect, incidental, or
              consequential damages that may arise from the use of, or the
              inability to use, the data and/or the materials contained on the
              data whether the materials contained on the data are provided by
              the City or a third party.
            </p>
            <p>
              LADOT is neither responsible nor liable for any viruses or other
              contamination of your system nor for any delays, inaccuracies,
              errors or omissions arising out of your use of the TDM Calculator
              or with respect to the material contained within the TDM
              Calculator.
            </p>
            <p>
              <span className={classes.bold}>Limitation of Liability.</span> It
              is understood that the TDM Calculator is provided without charge.
              Neither the City nor Hack for LA can be responsible or liable for
              any information derived from its use, nor liable for any viruses
              or other contamination of your system nor for any delays,
              inaccuracies, incompleteness, errors, or omissions arising out of
              your use of the TDM Calculator or with respect to the material
              contained in the TDM Calculator. You understand and agree that
              Your sole remedy against the City or Hack for LA for loss or
              damage caused by any defect or failure of the TDM Calculator,
              regardless of the form of action, whether in contract, tort,
              including negligence, strict liability, or otherwise, shall be the
              repair or replacement of the TDM Calculator to the extent feasible
              as determined solely by the City. In no event shall the City or
              Hack for LA be responsible to You or anyone else for, or have
              liability for any special, indirect, incidental, or consequential
              damages (including, without limitation, damages for loss of
              business profits or changes to businesses costs) or lost data or
              downtime, however caused, and on any theory of liability from the
              use of, or the inability to use, the TDM Calculator, whether the
              data, and/or formulas contained in the TDM Calculator are provided
              by the City or Hack for LA, or another third party, even if the
              City has been advised of the possibility of such damages.{" "}
            </p>
            <p>
              This Agreement and License shall be governed by the laws of the
              State of California without regard to their conflicts of law
              provisions and shall be effective as of the date that You are
              making use of the TDM Calculator. Any action brought to enforce
              the Agreement and/or in connection with this website shall be
              brought in either the state or federal courts in the County of Los
              Angeles County, State of California.
            </p>
            <p>
              By using the TDM Calculator, You hereby waive and release all
              claims, responsibilities, liabilities, actions, damages, costs,
              and losses, known and unknown, against the City and Hack for LA
              for Your use of the TDM Calculator.{" "}
            </p>
            <p>
              Before making decisions using the information provided in this
              application, contact City LADOT staff at{" "}
              <a className={classes.link} href="https://www.lacity.org/">
                ladot.tdm@lacity.org
              </a>{" "}
              to confirm the validity of the data provided.
            </p>
          </div>
          <br />
          <p>{`Release #: ${version}`}</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
