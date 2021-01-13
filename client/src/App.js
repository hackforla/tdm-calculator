import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { withToastProvider } from "./contexts/Toast";
import TdmCalculationContainer from "./components/TdmCalculationContainer";
import ProjectsPage from "./components/Projects/ProjectsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ContactUs from "./components/ContactUs";
import Register from "./components/Authorization/Register";
import ConfirmEmail from "./components/Authorization/ConfirmEmail";
import Login from "./components/Authorization/Login";
import Admin from "./components/Admin";
import Roles from "./components/Roles";
import FaqView from "./components/Faq/FaqView";
import ResetPassword from "./components/Authorization/ResetPassword";
import ResetPasswordRequest from "./components/Authorization/ResetPasswordRequest";
import "./styles/App.scss";
import PublicComment from "./components/PublicComment/PublicCommentPage";

const useStyles = createUseStyles({
  root: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column"
  }
});

const App = ({ account, setLoggedInAccount, hasConfirmedTransition }) => {
  const classes = useStyles();
  const sidebarRef = useRef();

  return (
    <React.Fragment>
      <Header account={account} />
      <div className={classes.root}>
        <Route
          exact
          path="/"
          render={() =>
            account.email ? (
              <Redirect to="/calculation/1" />
            ) : (
              <Login setLoggedInAccount={setLoggedInAccount} />
            )
          }
        />
        <Route exact path="/calculation">
          <Redirect to="/calculation/1" />
        </Route>
        <Route
          path="/calculation/:page/:projectId?"
          render={() => (
            <TdmCalculationContainer
              account={account}
              hasConfirmedNavTransition={hasConfirmedTransition}
              setLoggedInAccount={setLoggedInAccount}
              sidebarRef={sidebarRef}
            />
          )}
        />
        <Route
          path="/projects"
          render={() => <ProjectsPage account={account} />}
        />
        <Route path="/about" component={About} />
        <Route path="/termsandconditions" component={TermsAndConditions} />
        <Route path="/privacypolicy" component={PrivacyPolicy} />
        <Route path="/register/:email?" component={Register} />
        <Route path="/confirm/:token" component={ConfirmEmail} />
        <Route
          path="/login/:email?"
          render={() =>
            account.email ? (
              <Redirect to="/calculation/1" />
            ) : (
              <Login setLoggedInAccount={setLoggedInAccount} />
            )
          }
        />
        <Route
          path="/logout/:email?"
          render={routeProps => {
            setLoggedInAccount({});
            return (
              <Redirect
                to={
                  routeProps.match.params["email"]
                    ? `/login/${routeProps.match.params["email"]}`
                    : "/login"
                }
              />
            );
          }}
        />
        <Route path="/forgotpassword" component={ResetPasswordRequest} />
        <Route path="/resetPassword/:token" component={ResetPassword} />
        <Route path="/contactus" component={ContactUs} />
        {account && account.isAdmin ? (
          <Route path="/admin" render={() => <Admin account={account} />} />
        ) : null}
        {account && account.isSecurityAdmin ? (
          <Route path="/roles" render={() => <Roles />} />
        ) : null}
        <Route path="/faqs" component={FaqView} />
        <Route path="/publiccomment" component={PublicComment} />
      </div>
      <Footer />
    </React.Fragment>
  );
};

App.propTypes = {
  account: PropTypes.shape({
    email: PropTypes.string,
    isAdmin: PropTypes.bool,
    isSecurityAdmin: PropTypes.bool
  }),
  setLoggedInAccount: PropTypes.func,
  hasConfirmedTransition: PropTypes.bool
};

export default withToastProvider(App);
