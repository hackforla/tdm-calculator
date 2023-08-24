import React from "react";
import { createUseStyles } from "react-jss";
import ContentContainer from "./Layout/ContentContainer";

const useStyles = createUseStyles({
  privacyContent: {
    padding: "0 2em 1em 2em"
  },
  privacyPolicyContent: {
    lineHeight: "1.4em"
  },
  title: {
    color: "#0F2940",
    textAlign: "center",
    marginBottom: ".7em"
  },
  subTitle: {
    color: "grey",
    textAlign: "center"
  },
  indented: {
    marginLeft: "1.5em"
  },
  headerIndented: {
    marginLeft: "1.25em",
    fontWeight: "bold"
  },
  bulletIndented: {
    marginLeft: ".7em"
  },
  sectionSpacing: {
    marginTop: "2em",
    fontWeight: "bold"
  },
  sectionSpacingIndented: {
    marginTop: "2em",
    marginLeft: "1.25em",
    fontWeight: "bold"
  },
  address: {
    margin: "0 auto",
    width: "21.15%"
  },
  addressParagraph: {
    marginBottom: "0px"
  }
});

const PrivacyPolicy = () => {
  const classes = useStyles();
  return (
    <ContentContainer componentToTrack="PrivacyPolicy">
      <div className={classes.privacyContent}>
        <h1 className={classes.title}>Privacy Policy</h1>

        <div className={classes.privacyPolicyContent}>
          <h3
            className="tdm-wizard-page-subtitle"
            style={{ fontWeight: "bold" }}
          >
            We respect your privacy and recognize that we must maintain and use
            your information responsibly.
          </h3>
          <p className={classes.indented}>
            <a href="https://tdm.ladot.lacity.org">TDM Calculator</a> is a City
            of Los Angeles Review Tool managed by Hack for LA which is a project
            (of Code for America Labs, Inc. (&#34;Code for America&#34;,
            &#34;we&#34;, &#34;us&#34;, &#34;our&#34;). This Privacy Policy
            describes how we collect, use, and protect your personal information
            on the TDM Calculator review tool Website. By submitting your
            personal information on our websites, you agree to the terms in this
            Privacy Policy. If you do not agree with these terms, please do not
            use our websites.
          </p>

          <h2 style={{ fontWeight: "bold" }}>Overview</h2>
          <p className={classes.indented}>
            We allow for users to Create accounts and to save projects and save
            that information within our databases. We may collect information
            from you when you visit and take actions on our website. We use this
            information to provide the services you&#39;ve requested. We utilize
            cookies (such as those stored by Google Analytics) to provide a
            better experience and improve our review tool website for your use.
            We will not knowingly disclose or sell your personal information to
            any third party, except as provided in this privacy policy.
            Protecting your personal information is extremely important to us
            and we take all reasonable measures to do so.
          </p>

          <h2 className={classes.sectionSpacing}>
            The Personal Information We Collect
          </h2>
          <h3 className={classes.headerIndented}>
            Visiting{" "}
            <a href="https://tdm.ladot.lacity.org">
              https://tdm.ladot.lacity.org
            </a>{" "}
          </h3>

          <div className={classes.indented}>
            We may automatically collect and store data about your visit to
            <span> </span>
            <a href="https://tdm.ladot.lacity.org">
              https://tdm.ladot.lacity.org:
            </a>{" "}
            <li className={classes.bulletIndented}>
              Domain from which you access the Internet
            </li>
            <li className={classes.bulletIndented}>
              Operating system on your computer and information about the
              browser you used when visiting the site
            </li>
            <li className={classes.bulletIndented}>
              Date and time of your visit
            </li>
            <li className={classes.bulletIndented}>Pages you visited</li>
            <li className={classes.bulletIndented}>
              Address of the website that connects you to the Site (such as
              google.com or bing.com)
            </li>
            <li className={classes.bulletIndented}>
              The queries you make on our site
            </li>
          </div>
          <br />
          <p className={classes.indented}>
            None of the information we collect about you when you visit
            <span> </span>
            <a href="https://tdm.ladot.lacity.org ">
              https://tdm.ladot.lacity.org
            </a>{" "}
            is personally identifiable unless you submit your contact
            information in the form on the Contact Us submit page.
          </p>
          <p className={classes.indented}>
            We use this non personally identifiable information to understand
            how the
            <span> </span>
            <a href="https://tdm.ladot.lacity.org ">
              https://tdm.ladot.lacity.org
            </a>{" "}
            website is used, to improve the website, and to monitor usage for
            security purposes.
          </p>
          <p className={classes.indented}>
            We will not collect personal information from you without your
            knowledge and consent, except in a few limited circumstances as
            described in this policy.
          </p>
          <h3 className={classes.sectionSpacingIndented}>
            Creating an account at{" "}
            <a href="https://tdm.ladot.lacity.org ">
              https://tdm.ladot.lacity.org
            </a>{" "}
          </h3>

          <div className={classes.indented}>
            When creating account the information stored is limited to:
            <li className={classes.bulletIndented}>First name and Last name</li>
            <li className={classes.bulletIndented}>Email address</li>
            <li className={classes.bulletIndented}>
              A Hashed version of your password
            </li>
            <li className={classes.bulletIndented}>Date / Time created</li>
          </div>

          <h3 className={classes.sectionSpacingIndented}>
            Saving projects account at <span> </span>
            <a href="https://tdm.ladot.lacity.org ">
              https://tdm.ladot.lacity.org
            </a>{" "}
          </h3>

          <p className={classes.indented}>
            All saved projects will be saved with all the inputs filled out as
            well as with name of the user creating it
          </p>

          <p className={classes.indented}>
            Approve “admin accounts” will be able to view but not edit user
            projects, and will be able to see the name of the user who created
            the account. No other account information will be viewable
          </p>

          <h3 className={classes.sectionSpacingIndented}>
            Filling in Webforms such as Contact Us
          </h3>

          <p className={classes.indented}>We have a form for feedback.</p>
          <p className={classes.indented}>
            When you submit the contact us form, your comment, and any other
            data you submit, will be sent to Hack for LA and the City of Los
            Angeles to be stored as part of the public record. The data included
            here is limited to the fields filled out in the form, which includes
            the user’s name, e-mail address, and comment. No other user data
            such as logins, passwords, or saved projects will be included.
          </p>
          <p className={classes.indented}>
            Any questions you submit may be displayed in a FAQ document or page.
          </p>
          <p className={classes.indented}>
            We use the personal data we collect to understand how people ask us
            questions and to improve the experience of doing so.
          </p>

          <h3 className={classes.sectionSpacingIndented}>
            Access to Personally Identifiable Information
          </h3>

          <p className={classes.indented}>
            Access to personally identifiable information in public records at
            state and local levels of government in Los Angeles is controlled
            primarily by the California Public Records Act (Government Code
            Section 6250, et seq.). Information that is generally available
            under the Public Records Act may be posted for electronic access
            through the City&#39;s website. While the Public Records Act sets
            the general policies for access to City records, other sections of
            California code as well as federal laws also deal with
            confidentiality issues. This section as well as the other terms of
            this TDM privacy policy are subject to change in response to, or as
            a result of changes in federal, state, and/or local law.
          </p>

          <h3 className={classes.sectionSpacingIndented}>E-mail Addresses</h3>
          <p>
            <p className={classes.indented}>
              E-mail addresses obtained through the web site will not be sold or
              given to private companies for marketing purposes. The information
              collected is subject to the access and confidentiality provisions
              of the Public Records Act, other applicable sections of the
              California code as well as federal laws. E-mail or other
              information requests sent to the City web site may be maintained
              in order to respond to the request, forward that request to the
              appropriate agency within the City, communicate updates to the
              City page that may be of interest to citizens, or to provide the
              City or Hack for LA with valuable customer feedback to assist in
              improving the site. Individuals can cancel any communications
              regarding new service updates at any time.
            </p>
          </p>

          <h3 className={classes.sectionSpacingIndented}>Google Analytics</h3>

          <p className={classes.indented}>
            We use Google Analytics to understand how visitors use our site and
            to gather aggregate performance metrics.
          </p>
          <p className={classes.indented}>
            We’ve set up Google Analytics so that it doesn’t collect your full
            IP address.
          </p>
          <p className={classes.indented}>
            We don’t collect any personally identifiable information using
            Google Analytics, and we do not combine the information collected
            through Google Analytics with any personally identifiable
            information.
          </p>
          <p className={classes.indented}>
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
          </p>

          <p className={classes.indented}>
            Google Analytics, Google has developed the Google Analytics opt-out
            browser add-on for the Google Analytics JavaScript (ga.js,
            analytics.js, dc.js). This add-on instructs the Google Analytics
            JavaScript (ga.js, analytics.js, and dc.js) running on websites to
            prohibit sending information to Google Analytics. However, the
            Google Analytics opt-out browser add-on does not prevent data from
            being sent to the City’s site.
          </p>
          <p className={classes.indented}>
            Visit{" "}
            <a href="https://tools.google.com/dlpage/gaoptout/">
              https://tools.google.com/dlpage/gaoptout/
            </a>
            <span> </span>for more info on how to opt out.
          </p>
          <h2 className={classes.sectionSpacing}>
            Cookies and Other Tracking Technologies
          </h2>

          <p className={classes.indented}>
            Cookies are small text files that websites place on the computers
            and mobile devices of people who visit those websites. Pixel tags
            (also called web beacons) are small blocks of code placed on
            websites and emails.
          </p>
          <p className={classes.indented}>
            We use cookies and other technologies like pixel tags to remember
            your preferences, enhance your online experience, and to gather data
            on how you use our Sites to improve the way we promote our content,
            programs, and events.
          </p>
          <p className={classes.indented}>
            Your use of our Sites indicates your consent to such use of Cookies.
          </p>

          <h3 className={classes.sectionSpacingIndented}>
            Third party service providers
          </h3>
          <p className={classes.indented}>
            We use third-party service providers to track and analyze
            statistical usage and volume information from our Site users. These
            third-party service providers use persistent Cookies to help us to
            improve the user experience, manage the content on our Sites, and
            analyze how users navigate and use the Sites.
          </p>
          <p className={classes.indented}>
            Third-party service providers we may use include{" "}
            <a href="https://analytics.google.com/">Google Analytics</a>,{" "}
            <a href="https://mixpanel.com/">Mixpanel</a>,{" "}
            <a href="https://www.hotjar.com/">Hotjar</a>.
          </p>
          <h3 className={classes.sectionSpacingIndented}>
            How to opt-out of the use of cookies
          </h3>
          <p className={classes.indented}>
            Most browsers are initially set up to accept HTTP cookies. If you
            want to restrict or block the cookies that are set by our Site, or
            any other site, you can do so through your browser setting. The
            ‘Help’ function in your browser should explain how. Alternatively,
            you can visit{" "}
            <a href="http://www.aboutcookies.org">www.aboutcookies.org</a>,
            which contains comprehensive information on how to do this on a wide
            variety of browsers. You will find general information about cookies
            and details on how to delete cookies from your machine.
          </p>

          <h2 className={classes.sectionSpacing}>
            As Required By Law and Similar Disclosures
          </h2>
          <div className={classes.indented}>
            We may access, preserve, and disclose your information if we believe
            doing so is required or appropriate to:
            <li className={classes.bulletIndented}>
              Comply with law enforcement requests and legal process, such as a
              court order or subpoena;
            </li>
            <li className={classes.bulletIndented}>
              Respond to your requests; or
            </li>
            <li className={classes.bulletIndented}>
              Protect your, our, or others’ rights, property, or safety.
            </li>
            <br />
            <div>
              For the avoidance of doubt, the disclosure of your information may
              occur if you post any objectionable content on or through the
              Site.
            </div>
          </div>

          <h2 className={classes.sectionSpacing}>Consent</h2>

          <p className={classes.indented}>
            We may also disclose information from you or about you or your
            devices with your permission.
          </p>

          <h2 className={classes.sectionSpacing}>Children’s Privacy</h2>

          <p className={classes.indented}>
            We do not knowingly collect, maintain, or use personal information
            from children under 13 years of age, and no part of our Site is
            directed to children.
          </p>
          <p className={classes.indented}>
            If you learn that a child has provided us with personal information
            in violation of this Privacy Policy, then you may alert us at{" "}
            <a href="mailto:privacy@hackforla.org">privacy@hackforla.org</a> and
            reference “HfLA TDM Calculator” in the subject line.
          </p>

          <h2 className={classes.sectionSpacing}>Security</h2>

          <p className={classes.indented}>
            The City operates &#34;secure data networks&#34; protected by
            industry standard firewalls and password protection systems. Only
            authorized individuals have access to the information provided by
            our users.
          </p>
          <p className={classes.indented}>
            We make reasonable efforts to protect your information by using
            physical and electronic safeguards designed to improve the security
            of the information we maintain. However, as our Services are hosted
            electronically, we make no guarantees as to the security or privacy
            of your information.
          </p>

          <h2 className={classes.sectionSpacing}>
            Right To Be Forgotten and Rectification
          </h2>

          <p className={classes.indented}>
            Comments that are submitted through the comment form cannot be
            deleted or removed as they are stored as part of the public record
            with the City of Los Angeles.
          </p>
          <p className={classes.indented}>
            You may request that we make corrections to your personal data that
            is stored on our internal databases (Login information and Project
            information) at any time. You may request that incomplete data be
            completed or that incorrect data be corrected. Requests can be
            submitted to{" "}
            <a href="mailto:privacy@HackforLa.org">privacy@HackforLA.org</a> and
            reference “HfLA TDM Calculator” in the subject line.
          </p>

          <h2 className={classes.sectionSpacing}>Changes</h2>
          <p className={classes.indented}>
            This TDM Privacy Policy is subject to change from time to time in
            response to, or as a result of changes in federal, state, and/or
            local law. Please check this page frequently for updates as your
            continued use of this site after any changes in this Privacy Policy
            will constitute your acceptance of the changes.
          </p>
          <h2 className={classes.sectionSpacing}>Effective Date</h2>
          <p className={classes.indented}>
            This version of the policy is effective October 1, 2020.
          </p>
          <h2 className={classes.sectionSpacing}>Questions</h2>
          <p className={classes.indented}>
            If you have any questions, comments, concerns, or complaints related
            to our Review Tool websites, please contact us by email at{" "}
            <a href="mailto:privacy@HackforLa.org">
              TDM-Calculator@hackforla.org
            </a>
            , or by mail at:
          </p>
          <div className={classes.address}>
            <p className={classes.addressParagraph}>Code for America</p>
            <p className={classes.addressParagraph}>
              Ref: Hack for LA, TDM Calculator
            </p>
            <p className={classes.addressParagraph}>155 9th Street</p>
            <p className={classes.addressParagraph}>San Francisco, CA 94103</p>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
};

export default PrivacyPolicy;
