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
  app: {
    flex: "1 0 auto",
    display: "flex"
  },
  containerForRef: {
    width: "100%"
  }
});

const App = ({
  account,
  setLoggedInAccount,
  hasConfirmedTransition,
  isOpenNavConfirmModal,
  contentContainerRef,
  appContainerRef
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Header account={account} />
      <div className={classes.app} id="app-container" ref={appContainerRef}>
        <Switch>
          {/* These routes either have no sidebar or use a custom sidebar */}
          <Route path="/projects">
            <ProjectsPage
              account={account}
              contentContainerRef={contentContainerRef}
            />
          </Route>

          <Route path="/calculation/:page/:projectId?">
            <TdmCalculationContainer
              account={account}
              hasConfirmedNavTransition={hasConfirmedTransition}
              isOpenNavConfirmModal={isOpenNavConfirmModal}
              setLoggedInAccount={setLoggedInAccount}
              contentContainerRef={contentContainerRef}
            />
          </Route>

          <Route exact path="/calculation">
            <Redirect to="/calculation/1" />
          </Route>

          <Route exact path="/">
            <Redirect to={account.email ? "/calculation/1" : "/login"} />
          </Route>

          {/* These routes use the same sidebar component */}
          <Route>
            <>
              <Sidebar />
              <Switch>
                <>
                  <div
                    className={classes.containerForRef}
                    ref={contentContainerRef}
                  >
                    <Route path="/about">
                      <About />
                    </Route>

                    <Route path="/termsandconditions">
                      <TermsAndConditionsPage />
                    </Route>

                    <Route path="/privacypolicy">
                      <PrivacyPolicy />
                    </Route>

                    <Route path="/register/:email?">
                      <Register />
                    </Route>

                    <Route path="/confirm/:token?">
                      <ConfirmEmail />
                    </Route>

                    <Route path="/login/:email?">
                      {account.email ? (
                        <Redirect to="/calculation/1" />
                      ) : (
                        <Login setLoggedInAccount={setLoggedInAccount} />
                      )}
                    </Route>

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

                    <Route path="/forgotpassword">
                      <ForgotPassword />
                    </Route>

                    <Route path="/resetPassword/:token">
                      <ResetPassword />
                    </Route>

                    {account && account.isAdmin ? (
                      <Route
                        path="/admin"
                        render={() => <Admin account={account} />}
                      />
                    ) : null}

                    {account && account.isSecurityAdmin ? (
                      <Route path="/roles" render={() => <Roles />} />
                    ) : null}

                    <Route path="/faqs">
                      <FaqView />
                    </Route>

                    <Route path="/publiccomment">
                      <PublicComment />
                    </Route>
                  </div>
                </>
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
  isOpenNavConfirmModal: PropTypes.bool,
  appContainerRef: PropTypes.object,
  contentContainerRef: PropTypes.object
};

export default withToastProvider(App);
