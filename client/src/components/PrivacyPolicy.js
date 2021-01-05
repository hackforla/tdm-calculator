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
  "@media (max-width: 768px)": {
    aboutText: {
      padding: "0"
    }
  },
  link: {
    textDecoration: "underline",
    fontWeight: "bold"
  },
  parentBullets: {
    marginLeft: "20px",
    listStyleType: "circle",
    marginBottom: "10px"
  },
  childBullets: {
    marginLeft: "20px",
    listStyleType: "circle",
    marginBottom: "10px"
  }
});

const PrivacyPolicy = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={clsx("tdm-wizard", classes.tdmWizard)}>
        <SideBar />
        <div className="tdm-wizard-content-container">
          <h2>Privacy Policy</h2>
          <br />
          <div className={classes.aboutText}>
            <p>
              <a
                className={classes.link}
                href="https://ladot.lacity.org/tdmcalculator"
              >
                TDM Calculator
              </a>{" "}
              is a City of Los Angeles Review Tool managed by Hack for LA which
              is a project (of Code for America Labs, Inc. (&#34;Code for
              America&#34;, &#34;we&#34;, &#34;us&#34;, &#34;our&#34;). This
              Privacy Policy describes how we collect, use, and protect your
              personal information on the TDM Calculator review tool Website. By
              submitting your personal information on our websites, you agree to
              the terms in this Privacy Policy. If you do not agree with these
              terms, please do not use our websites.
            </p>
            <h4>Overview</h4>
            <br />
            <ul>
              <li className={classes.parentBullets}>
                We allow for users to Create accounts and to save projects and
                save that information within our databases.
              </li>

              <li className={classes.parentBullets}>
                We may collect information from you when you visit and take
                actions on our website. We use this information to provide the
                services you&#39;ve requested.
              </li>

              <li className={classes.parentBullets}>
                We utilize cookies (such as those stored by Google Analytics) to
                provide a better experience and improve our review tool website
                for your use.
              </li>

              <li className={classes.parentBullets}>
                We will not knowingly disclose or sell your personal information
                to any third party, except as provided in this privacy policy.
              </li>

              <li className={classes.parentBullets}>
                Protecting your personal information is extremely important to
                us and we take all reasonable measures to do so.
              </li>
            </ul>
            <br />
            <h4>The personal information we collect</h4>
            <br />
            <p>
              Visiting{" "}
              <a
                className={classes.link}
                href="https://ladot.lacity.org/tdmcalculator"
              >
                https://ladot.lacity.org/tdmcalculator
              </a>{" "}
            </p>
            <ul>
              <li>
                We may automatically collect and store data about your visit to
                <a
                  className={classes.link}
                  href="https://ladot.lacity.org/tdmcalculator"
                >
                  https://ladot.lacity.org/tdmcalculator:
                </a>{" "}
              </li>
            </ul>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              To find more about Hack for LA and their work to improve Los
              Angeles please visit:{" "}
              <a className={classes.link} href="http://www.hackforla.org">
                www.hackforla.org
              </a>
            </p>
          </div>
          <p>{`Release #: ${version}`}</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
