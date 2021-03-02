import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Switch } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { withToastProvider } from "./contexts/Toast";
import TdmCalculationContainer from "./components/TdmCalculationContainer";
import ProjectsPage from "./components/Projects/ProjectsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import TermsAndConditionsPage from "./components/TermsAndConditions/TermsAndConditionsPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ContactUs from "./components/ContactUs";
import Register from "./components/Authorization/Register";
import ConfirmEmail from "./components/Authorization/ConfirmEmail";
import Login from "./components/Authorization/Login";
import Admin from "./components/Admin";
import Roles from "./components/Roles";
import FaqView from "./components/Faq/FaqView";
import ResetPassword from "./components/Authorization/ResetPassword";
import ForgotPassword from "./components/Authorization/ForgotPassword";
import "./styles/App.scss";
import PublicComment from "./components/PublicComment/PublicCommentPage";
import Sidebar from "./components/Sidebar";

const useStyles = createUseStyles({
  root: {
    flex: "1 0 auto",
    display: "flex"
  }
});

const App = ({
  account,
  setLoggedInAccount,
  hasConfirmedTransition,
  tdmWizardContentContainerRef,
  mainContentContainerRef
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Header account={account} />
      <div
        className={classes.root}
        id="main-content-container"
        ref={mainContentContainerRef}
      >
        <Switch>
          {/* These routes either have no sidebar or use a custom sidebar */}
          <Route
            path="/projects"
            render={() => <ProjectsPage account={account} />}
          />

          <Route
            path="/calculation/:page/:projectId?"
            render={() => (
              <TdmCalculationContainer
                account={account}
                hasConfirmedNavTransition={hasConfirmedTransition}
                setLoggedInAccount={setLoggedInAccount}
                tdmWizardContentContainerRef={tdmWizardContentContainerRef}
              />
            )}
          />

          <Route exact path="/calculation">
            <Redirect to="/calculation/1" />
          </Route>

          <Route
            exact
            path="/"
            render={() =>
              account.email ? (
                <Redirect to="/calculation/1" />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          {/* These routes use the same sidebar component */}
          <Route>
            <>
              <Sidebar />
              <Switch>
                <Route path="/about" component={About} />
                <Route
                  path="/termsandconditions"
                  component={TermsAndConditionsPage}
                />
                <Route path="/privacypolicy" component={PrivacyPolicy} />
                <Route path="/register/:email?" component={Register} />
                <Route path="/confirm/:token?" component={ConfirmEmail} />
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

                <Route path="/forgotpassword" component={ForgotPassword} />
                <Route path="/resetPassword/:token" component={ResetPassword} />
                <Route path="/contactus" component={ContactUs} />
                {account && account.isAdmin ? (
                  <Route
                    path="/admin"
                    render={() => <Admin account={account} />}
                  />
                ) : null}
                {account && account.isSecurityAdmin ? (
                  <Route path="/roles" render={() => <Roles />} />
                ) : null}
                <Route path="/faqs" component={FaqView} />
                <Route path="/publiccomment" component={PublicComment} />
              </Switch>
            </>
          </Route>
        </Switch>
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
  hasConfirmedTransition: PropTypes.bool,
  mainContentContainerRef: PropTypes.object,
  tdmWizardContentContainerRef: PropTypes.object
};

export default withToastProvider(App);
