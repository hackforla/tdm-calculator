import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import Modal from "react-modal";
import Button from "./Button/Button";
import PropTypes from "prop-types";

const useStyles = createUseStyles({
  modal: {
    "& h2": {
      fontSize: "25px",
      lineHeight: "31px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "30px",
      "& img": {
        margin: "0 6px 0 0",
        verticalAlign: "middle"
      }
    },
    "& p": {
      fontSize: "16px",
      lineHeight: "25px",
      textAlign: "left",
      "& img": {
        margin: "4px 12px 12px 0"
      }
    },
    "& .smaller": {
      fontSize: "12px",
      lineHeight: "25px",
      textAlign: "left"
    },
    "& input": {
      boxSizing: "border-box",
      fontSize: "20px",
      lineHeight: "24px",
      padding: "16px",
      border: "1px solid #979797",
      marginTop: "8px"
    }
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "42px",
    "& button": {
      fontFamily: "Calibri Bold",
      letterSpacing: "2px",
      height: "60px",
      display: "inline",
      marginLeft: "auto",
      marginRight: "auto",
      border: "solid",
      fontSize: "20px",
      lineHeight: "24px",
      textAlign: "center",
      cursor: "pointer",
      textTransform: "uppercase"
    }
  },
  acceptBtn: {
    width: "150px",
    height: "50px",
    marginLeft: "10px",
    marginRight: "auto",
    backgroundColor: "#A7C539",
    color: "#000000",
    boxShadow: "0px 6px 4px rgba(0, 46, 109, 0.3)"
  },
  declineBtn: {
    width: "300px",
    height: "50px",
    marginRight: "10px",
    marginLeft: "auto",
    backgroundColor: "transparent",
    color: "rgba(0, 0, 0, 0.5)"
  },
  doNotShowBtn: {
    border: "1px solid black",
    margin: "2px",
    width: "20px",
    height: "20px !important",
    position: "relative",
    marginRight: "10px !important"
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
    width: "auto",
    height: "300px"
  }
});

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    position: "relative",
    top: "50px",
    right: "auto",
    bottom: "auto",
    left: "200px",
    boxSizing: "border-box",
    height: "600px",
    maxHeight: "100%",
    width: "800px",
    maxWidth: "100%",
    padding: "60px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 5px 10px rgba(0, 46, 109, 0.2)",
    overflow: "scroll"
  }
};

const TermsAndConditionsModal = () => {
  const classes = useStyles();
  const [
    termsAndConditionsModalOpen,
    setTermsAndConditionsModalOpen
  ] = useState(true);
  const history = useHistory();

  const toggleTermsAndConditionsModal = () => {
    setTermsAndConditionsModalOpen(!termsAndConditionsModalOpen);
  };

  if (localStorage.getItem("termsAndConditions")) return null;

  return (
    <Modal
      isOpen={termsAndConditionsModalOpen}
      onRequestClose={toggleTermsAndConditionsModal}
      shouldCloseOnOverlayClick={false}
      contentLabel="Terms and Conditions Modal"
      style={modalStyles}
      className={classes.modal}
    >
      <h2>TDM Calculator User Terms and Conditions</h2>
      <div className={classes.scroll}>
        <p>
          PLEASE READ THIS AGREEMENT CAREFULLY BEFORE USING THIS WEB SITE. BY
          USING THIS WEB SITE, YOU ARE CONSENTING TO BE OBLIGATED AND BECOME A
          PARTY TO THIS AGREEMENT. IF YOU DO NOT AGREE TO THE TERMS AND
          CONDITIONS BEFLOW YOU SHOULD NOT ACCESS OR USE THIS WEB SITE
        </p>

        <p className="smaller">
          The Los Angeles Department of Transportation (LADOT), in partnership
          with the Department of City Planning and Hack for LA (a project of
          Code for America), has developed the City of Los Angeles
          Transportation Demand Management (TDM) Calculator (TDM Calculator) to
          provide the public with an understanding of the TDM Ordinance.
          Currently available for review: Council File 15-0719-S19 / the Los
          Angeles Department of City Planning website). The TDM Ordinance
          proposes to revise regulations that require eligible land use
          development projects to adopt TDM strategies with the goal to reduce
          the reliance on drive-alone trips in the City of Los Angeles. The term
          “City” as used below shall refer to the City of Los Angeles. The terms
          “City” and “Hack for LA” as used below shall include their respective
          affiliates, sub-consultants, employees, volunteers, and
          representatives.
        </p>

        <p className="smaller">
          This digital review tool, the TDM Calculator, has been provided to
          You, the User, as a public service to assess different scenarios that
          land use development would need to comply with if the City were to
          adopt the TDM Ordinance. LADOT is pleased to be able to provide this
          information to the public. LADOT believes that the public is most
          effectively served when they are provided access to the technical
          tools that inform the public policy-making process that governs
          private and public land-use investments. However, in using the TDM
          Calculator, You agree to be bound by this TDM Calculator User
          Agreement (this Agreement).
        </p>

        <p className="smaller">
          <strong>Limited License to Use.</strong> This Agreement gives You a
          limited, non-transferable, non-assignable, and non-exclusive license
          to use the TDM Calculator on a computer system owned, leased, or
          otherwise controlled by You in Your own facilities, as set out below
          and provided that You know and follow the terms of this Agreement.
          Your failure to follow the terms of this Agreement shall automatically
          terminate this license and Your right to use the TDM Calculator.
        </p>

        <p className="smaller">
          <strong>Warranty Disclaimer.</strong> LADOT worked with{" "}
          <a href="https://ladot.lacity.org/" style={{ color: "blue" }}>
            the Department of City Planning
          </a>{" "}
          and Hack for LA to develop the TDM Calculator’s parameters, including
          potential TDM strategies, and program point targets that could apply
          to land use development. However, since the TDM Ordinance is a draft
          regulation and not current law, it could further change, or be adopted
          in whole, or in part, denied, or abandoned, the information herein
          should not be interpreted to be binding on land use development
          regulation outcomes that inform investment decisions. Due to the
          dynamic nature of the information contained within the TDM Calculator
          and the reliance upon information from outside sources, the City does
          not guarantee the accuracy or reliability of the information
          transmitted from this web site. The TDM Calculator, OUTPUTS AND
          ASSOCIATED DATA ARE PROVIDED “as is” WITHOUT WARRANTY OF ANY KIND,
          whether expressed, implied, statutory or otherwise including but not
          limited to, warranties of title or the implied warranties of
          merchantability and fitness for a particular purpose. Neither the City
          nor Hack for LA are responsible for any special, indirect, incidental,
          or consequential damages that may arise from the use of, or the
          inability to use, the data and/or the materials contained on the data
          whether the materials contained on the data are provided by the City
          or a third party.
        </p>

        <p className="smaller">
          LADOT is neither responsible nor liable for any viruses or other
          contamination of your system nor for any delays, inaccuracies, errors
          or omissions arising out of your use of the TDM Calculator or with
          respect to the material contained within the TDM Calculator.
        </p>

        <p className="smaller">
          <strong>Limitation of Liability.</strong> It is understood that the
          TDM Calculator is provided without charge. Neither the City nor Hack
          for LA can be responsible or liable for any information derived from
          its use, nor liable for any viruses or other contamination of your
          system nor for any delays, inaccuracies, incompleteness, errors, or
          omissions arising out of your use of the TDM Calculator or with
          respect to the material contained in the TDM Calculator. You
          understand and agree that Your sole remedy against the City or Hack
          for LA for loss or damage caused by any defect or failure of the TDM
          Calculator, regardless of the form of action, whether in contract,
          tort, including negligence, strict liability, or otherwise, shall be
          the repair or replacement of the TDM Calculator to the extent feasible
          as determined solely by the City. In no event shall the City or Hack
          for LA be responsible to You or anyone else for, or have liability for
          any special, indirect, incidental, or consequential damages
          (including, without limitation, damages for loss of business profits
          or changes to businesses costs) or lost data or downtime, however
          caused, and on any theory of liability from the use of, or the
          inability to use, the TDM Calculator, whether the data, and/or
          formulas contained in the TDM Calculator are provided by the City or
          Hack for LA, or another third party, even if the City has been advised
          of the possibility of such damages.
        </p>

        <p className="smaller">
          This Agreement and License shall be governed by the laws of the State
          of California without regard to their conflicts of law provisions and
          shall be effective as of the date that You are making use of the TDM
          Calculator. Any action brought to enforce the Agreement and/or in
          connection with this website shall be brought in either the state or
          federal courts in the County of Los Angeles County, State of
          California.
        </p>

        <p className="smaller">
          By using the TDM Calculator, You hereby waive and release all claims,
          responsibilities, liabilities, actions, damages, costs, and losses,
          known and unknown, against the City and Hack for LA for Your use of
          the TDM Calculator.
        </p>

        <p className="smaller">
          Before making decisions using the information provided in this
          application, contact City LADOT staff at{" "}
          <a href="mailto:ladot.tdm@lacity.org" style={{ color: "blue" }}>
            ladot.tdm@lacity.org
          </a>{" "}
          to confirm the validity of the data provided.
        </p>
      </div>

      <div className={classes.modalActions}>
        <Button
          id="cy-terms-decline"
          className={classes.declineBtn}
          onClick={e => {
            e.preventDefault();
            window.location.href = "https://ladot.lacity.org/";
          }}
        >
          Decline and exit site
        </Button>

        <Button
          id="cy-terms-accept"
          className={classes.acceptBtn}
          onClick={e => {
            e.preventDefault();
            window.localStorage.setItem("termsAndConditions", "Accepted");
            history.go(0);
          }}
        >
          Accept
        </Button>
      </div>
    </Modal>
  );
};

TermsAndConditionsModal.propTypes = {
  termsAndConditionsModalProp: PropTypes.string
};

export default withRouter(TermsAndConditionsModal);
