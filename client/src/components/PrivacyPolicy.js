import React from "react";
import { createUseStyles } from "react-jss";
import ContentContainer from "./Layout/ContentContainer";

const useStyles = createUseStyles({
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
  greyText: {
    color: "grey"
  },
  parentBullets: {
    marginLeft: "20px",
    listStyleType: "disc",
    marginBottom: "10px"
  },
  parentBulletsLast: {
    marginLeft: "20px",
    listStyleType: "disc"
  },
  childBullets: {
    marginLeft: "20px",
    listStyleType: "circle",
    marginTop: "10px"
  },
  topMargin: {
    marginTop: "16px"
  },
  bottomMargin: {
    marginBottom: "16px"
  }
});

const PrivacyPolicy = () => {
  const classes = useStyles();
  return (
    <ContentContainer componentToTrack="PrivacyPolicy">
      <h1 className={classes.header}>Privacy Policy</h1>
      <br />
      <div className={(classes.aboutText, classes.scroll)}>
        <p>
          We respect your privacy, and recognize that we must maintain and use
          your information responsibly.
        </p>
        <p>
          <a href="https://ladot.lacity.org/tdmcalculator">TDM Calculator</a> is
          a City of Los Angeles Review Tool managed by Hack for LA which is a
          project (of Code for America Labs, Inc. (&#34;Code for America&#34;,
          &#34;we&#34;, &#34;us&#34;, &#34;our&#34;). This Privacy Policy
          describes how we collect, use, and protect your personal information
          on the TDM Calculator review tool Website. By submitting your personal
          information on our websites, you agree to the terms in this Privacy
          Policy. If you do not agree with these terms, please do not use our
          websites.
        </p>
        <h3>Overview</h3>
        <br />
        <ul>
          <li className={classes.parentBullets}>
            We allow for users to Create accounts and to save projects and save
            that information within our databases.
          </li>

          <li className={classes.parentBullets}>
            We may collect information from you when you visit and take actions
            on our website. We use this information to provide the services
            you&#39;ve requested.
          </li>

          <li className={classes.parentBullets}>
            We utilize cookies (such as those stored by Google Analytics) to
            provide a better experience and improve our review tool website for
            your use.
          </li>

          <li className={classes.parentBullets}>
            We will not knowingly disclose or sell your personal information to
            any third party, except as provided in this privacy policy.
          </li>

          <li className={classes.parentBulletsLast}>
            Protecting your personal information is extremely important to us
            and we take all reasonable measures to do so.
          </li>
        </ul>
        <br />
        <h3>The personal information we collect</h3>
        <br />
        <p>
          Visiting{" "}
          <a href="https://ladot.lacity.org/tdmcalculator">
            https://ladot.lacity.org/tdmcalculator
          </a>{" "}
        </p>
        <ul>
          <li className={classes.parentBullets}>
            We may automatically collect and store data about your visit to
            <span> </span>
            <a href="https://ladot.lacity.org/tdmcalculator">
              https://ladot.lacity.org/tdmcalculator:
            </a>{" "}
            <li className={classes.childBullets}>
              Domain from which you access the Internet
            </li>
            <li className={classes.childBullets}>
              Operating system on your computer and information about the
              browser you used when visiting the site
            </li>
            <li className={classes.childBullets}>
              Date and time of your visit
            </li>
            <li className={classes.childBullets}>Pages you visited</li>
            <li className={classes.childBullets}>
              Address of the website that connects you to the Site (such as
              google.com or bing.com)
            </li>
            <li className={classes.childBullets}>
              The queries you make on our site
            </li>
          </li>
          <li className={classes.parentBullets}>
            None of the information we collect about you when you visit
            <span> </span>
            <a href="https://ladot.lacity.org/tdmcalculator ">
              https://ladot.lacity.org/tdmcalculator
            </a>{" "}
            is personally identifiable unless you submit your contact
            information in the form on the Contact Us submit page.
          </li>
          <li className={classes.parentBullets}>
            We use this non personally identifiable information to understand
            how the
            <span> </span>
            <a href="https://ladot.lacity.org/tdmcalculator ">
              https://ladot.lacity.org/tdmcalculator
            </a>{" "}
            website is used, to improve the website, and to monitor usage for
            security purposes.
          </li>
          <li className={classes.parentBullets}>
            We will not collect personal information from you without your
            knowledge and consent, except in a few limited circumstances as
            described in this policy.
          </li>
        </ul>
        <p className={classes.topMargin}>
          Creating an account at <span> </span>
          <a href="https://ladot.lacity.org/tdmcalculator ">
            https://ladot.lacity.org/tdmcalculator
          </a>{" "}
        </p>
        <ul>
          <li className={classes.parentBullets}>
            When creating account the information stored is limited to:
            <li className={classes.childBullets}>First name and Last name</li>
            <li className={classes.childBullets}>Email address</li>
            <li className={classes.childBullets}>
              A Hashed version of your password
            </li>
            <li className={classes.childBullets}>Date / Time created</li>
          </li>
        </ul>
        <p className={classes.topMargin}>
          Saving projects account at <span> </span>
          <a href="https://ladot.lacity.org/tdmcalculator ">
            https://ladot.lacity.org/tdmcalculator
          </a>{" "}
        </p>
        <ul>
          <li className={classes.parentBullets}>
            All saved projects will be saved with all the inputs filled out as
            well as with name of the user creating it
          </li>
          <li className={classes.parentBullets}>
            Approve “admin accounts” will be able to view but not edit user
            projects, and will be able to see the name of the user who created
            the account. No other account information will be viewable
          </li>
        </ul>
        <p className={classes.topMargin}>
          Filling in Webforms such as Contact Us
        </p>
        <ul>
          <li className={classes.parentBullets}>
            We have a form for feedback.
          </li>
          <li className={classes.parentBullets}>
            When you submit the contact us form, your comment, and any other
            data you submit, will be sent to Hack for LA and the City of Los
            Angeles to be stored as part of the public record. The data included
            here is limited to the fields filled out in the form, which includes
            the user’s name, e-mail address, and comment. No other user data
            such as logins, passwords, or saved projects will be included.
          </li>
          <li className={classes.parentBullets}>
            Any questions you submit may be displayed in a FAQ document or page.
          </li>
          <li className={classes.parentBullets}>
            We use the personal data we collect to understand how people ask us
            questions and to improve the experience of doing so.
          </li>
        </ul>
        <br />
        <p className={classes.topMargin}>
          Access to Personally Identifiable Information
        </p>
        <p>
          Access to personally identifiable information in public records at
          state and local levels of government in Los Angeles is controlled
          primarily by the California Public Records Act (Government Code
          Section 6250, et seq.). Information that is generally available under
          the Public Records Act may be posted for electronic access through the
          City&#39;s website. While the Public Records Act sets the general
          policies for access to City records, other sections of California code
          as well as federal laws also deal with confidentiality issues. This
          section as well as the other terms of this TDM privacy policy are
          subject to change in response to, or as a result of changes in
          federal, state, and/or local law.
        </p>
        <br />
        <p>E-mail Addresses</p>
        <p>
          E-mail addresses obtained through the web site will not be sold or
          given to private companies for marketing purposes. The information
          collected is subject to the access and confidentiality provisions of
          the Public Records Act, other applicable sections of the California
          code as well as federal laws. E-mail or other information requests
          sent to the City web site may be maintained in order to respond to the
          request, forward that request to the appropriate agency within the
          City, communicate updates to the City page that may be of interest to
          citizens, or to provide the City or Hack for LA with valuable customer
          feedback to assist in improving the site. Individuals can cancel any
          communications regarding new service updates at any time.
        </p>
        <br />
        <p>Google Analytics</p>
        <ul>
          <li className={classes.parentBullets}>
            We use Google Analytics to understand how visitors use our site and
            to gather aggregate performance metrics.
          </li>
          <li className={classes.parentBullets}>
            We’ve set up Google Analytics so that it doesn’t collect your full
            IP address.
          </li>
          <li className={classes.parentBullets}>
            We don’t collect any personally identifiable information using
            Google Analytics, and we do not combine the information collected
            through Google Analytics with any personally identifiable
            information.
          </li>
          <li className={classes.parentBullets}>
            Google Analytics places a cookie on your web browser to identify you
            as a unique user. This cookie cannot be used by anyone but Google.
            Google&#39;s ability to use and share information collected by
            Google Analytics about your visits to this site is restricted by the{" "}
            <a href="https://marketingplatform.google.com/about/analytics/terms/us/">
              Google Analytics Terms of Use
            </a>{" "}
            and the{" "}
            <a href="https://policies.google.com/privacy">
              Google Privacy Policy
            </a>
            .{" "}
          </li>
        </ul>
        <p className={classes.topMargin}>
          Google Analytics, Google has developed the Google Analytics opt-out
          browser add-on for the Google Analytics JavaScript (ga.js,
          analytics.js, dc.js). This add-on instructs the Google Analytics
          JavaScript (ga.js, analytics.js, and dc.js) running on websites to
          prohibit sending information to Google Analytics. However, the Google
          Analytics opt-out browser add-on does not prevent data from being sent
          to the City’s site.
        </p>
        <p>
          Visit{" "}
          <a href="https://tools.google.com/dlpage/gaoptout/">
            https://tools.google.com/dlpage/gaoptout/
          </a>
          <span> </span>for more info on how to opt out.
        </p>
        <h3>Cookies and other tracking technologies</h3>
        <br />
        <ul>
          {" "}
          <li className={classes.parentBullets}>
            Cookies are small text files that websites place on the computers
            and mobile devices of people who visit those websites. Pixel tags
            (also called web beacons) are small blocks of code placed on
            websites and emails.
          </li>
          <li className={classes.parentBullets}>
            We use cookies and other technologies like pixel tags to remember
            your preferences, enhance your online experience, and to gather data
            on how you use our Sites to improve the way we promote our content,
            programs, and events.
          </li>
          <li className={classes.parentBullets}>
            Your use of our Sites indicates your consent to such use of Cookies.
          </li>
        </ul>
        <p className={classes.topMargin}>Third party service providers</p>
        <p>
          We use third-party service providers to track and analyze statistical
          usage and volume information from our Site users. These third-party
          service providers use persistent Cookies to help us to improve the
          user experience, manage the content on our Sites, and analyze how
          users navigate and use the Sites.
        </p>
        <p>
          Third-party service providers we may use include{" "}
          <a href="https://analytics.google.com/">Google Analytics</a>,{" "}
          <a href="https://mixpanel.com/">Mixpanel</a>,{" "}
          <a href="https://www.hotjar.com/">Hotjar</a>.
        </p>
        <p>How to opt-out of the use of cookies</p>
        <p>
          Most browsers are initially set up to accept HTTP cookies. If you want
          to restrict or block the cookies that are set by our Site, or any
          other site, you can do so through your browser setting. The ‘Help’
          function in your browser should explain how. Alternatively, you can
          visit <a href="http://www.aboutcookies.org">www.aboutcookies.org</a>,
          which contains comprehensive information on how to do this on a wide
          variety of browsers. You will find general information about cookies
          and details on how to delete cookies from your machine.
        </p>
        <h3>As required by law and similar disclosures</h3>
        <br />
        <ul>
          <li className={classes.parentBullets}>
            We may access, preserve, and disclose your information if we believe
            doing so is required or appropriate to:
            <li className={classes.childBullets}>
              comply with law enforcement requests and legal process, such as a
              court order or subpoena;
            </li>
            <li className={classes.childBullets}>
              respond to your requests; or
            </li>
            <li className={classes.childBullets}>
              protect your, our, or others’ rights, property, or safety.
            </li>
          </li>
          <li className={classes.parentBulletsLast}>
            For the avoidance of doubt, the disclosure of your information may
            occur if you post any objectionable content on or through the Site.
          </li>
        </ul>
        <br />
        <h3 className={classes.topMargin}>Consent</h3>
        <br />
        <li className={(classes.parentBullets, classes.bottomMargin)}>
          We may also disclose information from you or about you or your devices
          with your permission.
        </li>
        <h3 className={(classes.topMargin, classes.bottomMargin)}>
          Children’s privacy
        </h3>
        <ul>
          <li className={classes.parentBullets}>
            We do not knowingly collect, maintain, or use personal information
            from children under 13 years of age, and no part of our Site is
            directed to children.
          </li>
          <li className={(classes.parentBullets, classes.bottomMargin)}>
            If you learn that a child has provided us with personal information
            in violation of this Privacy Policy, then you may alert us at{" "}
            <a href="mailto:privacy@hackforla.org">privacy@hackforla.org</a> and
            reference “HfLA TDM Calculator” in the subject line.
          </li>
        </ul>
        <h3 className={classes.bottomMargin}>Security</h3>
        <ul>
          <li className={classes.parentBullets}>
            The City operates &#34;secure data networks&#34; protected by
            industry standard firewalls and password protection systems. Only
            authorized individuals have access to the information provided by
            our users.
          </li>
          <li className={(classes.parentBullets, classes.bottomMargin)}>
            We make reasonable efforts to protect your information by using
            physical and electronic safeguards designed to improve the security
            of the information we maintain. However, as our Services are hosted
            electronically, we make no guarantees as to the security or privacy
            of your information.
          </li>
        </ul>
        <h3 className={(classes.topMargin, classes.bottomMargin)}>
          Right to be forgotten and rectification
        </h3>
        <ul>
          <li className={classes.parentBullets}>
            Comments that are submitted through the comment form cannot be
            deleted or removed as they are stored as part of the public record
            with the City of Los Angeles.
          </li>
          <li className={(classes.parentBullets, classes.bottomMargin)}>
            You may request that we make corrections to your personal data that
            is stored on our internal databases (Login information and Project
            information) at any time. You may request that incomplete data be
            completed or that incorrect data be corrected. Requests can be
            submitted to{" "}
            <a href="mailto:privacy@HackforLa.org">privacy@HackforLA.org</a> and
            reference “HfLA TDM Calculator” in the subject line.
          </li>
        </ul>
        <h3 className={(classes.topMargin, classes.bottomMargin)}>Changes</h3>
        <p>
          This TDM Privacy Policy is subject to change from time to time in
          response to, or as a result of changes in federal, state, and/or local
          law. Please check this page frequently for updates as your continued
          use of this site after any changes in this Privacy Policy will
          constitute your acceptance of the changes.
        </p>
        <h3 className={(classes.topMargin, classes.bottomMargin)}>
          Effective Date
        </h3>
        <p>This version of the policy is effective October 1, 2020.</p>
        <h3 className={(classes.topMargin, classes.bottomMargin)}>Questions</h3>
        <p>
          If you have any questions, comments, concerns, or complaints related
          to our Review Tool websites, please contact us by email at
          TDM-Calculator@hackforla.org, or by mail at:
        </p>
        <br />
        <p>Code for America</p>
        <p>Ref: Hack for LA, TDM Calculator</p>
        <p>155 9th Street</p>
        <p>San Francisco, CA 94103</p>
      </div>
    </ContentContainer>
  );
};

export default PrivacyPolicy;
