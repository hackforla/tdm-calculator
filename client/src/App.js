import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { withToastProvider } from "./contexts/Toast";
import { UserContext } from "./components/user-context";
import TdmCalculationContainer from "./components/TdmCalculationContainer";
import Projects from "./components/Projects";
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
import NavConfirmModal from "./components/NavConfirmModal";

const useStyles = createUseStyles({
  root: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column"
  }
});

const App = () => {
  const classes = useStyles();
  const [account, setAccount] = useState({});
  const [confirmTransition, setConfirmTransition] = useState(null);
  const [hasConfirmedTransition, setHasConfirmedTransition] = useState(true);
  const [isOpenNavConfirmModal, setIsOpenNavConfirmModal] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      try {
        const account = JSON.parse(currentUser);
        setAccount(account);
      } catch (err) {
        // TODO: replace with production error logging.
        console.error(
          "Unable to parse current user from local storage.",
          currentUser
        );
      }
    }
  }, [setAccount]);

  const setLoggedInAccount = loggedInUser => {
    setAccount(loggedInUser);
    localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
  };

  const getUserConfirmation = (_message, defaultConfirmCallback) => {
    setHasConfirmedTransition(false);
    setConfirmTransition(() => ({
      defaultConfirmCallback: defaultConfirmCallback,
      setHasConfirmedTransition: setHasConfirmedTransition
    }));
    setIsOpenNavConfirmModal(!isOpenNavConfirmModal);
  };

  return (
    <React.Fragment>
      <UserContext.Provider value={account}>
        <Router getUserConfirmation={getUserConfirmation}>
          <NavConfirmModal
            confirmTransition={confirmTransition}
            isOpenNavConfirmModal={isOpenNavConfirmModal}
            setIsOpenNavConfirmModal={setIsOpenNavConfirmModal}
          />
          <Header account={account} setAccount={setAccount} />
          <div className={classes.root}>
            <Route
              exact
              path="/"
              render={() =>
                account.email ? (
                  <Redirect to="/create-project" />
                ) : (
                  <Login setLoggedInAccount={setLoggedInAccount} />
                )
              }
            />
            <Route exact path="/create-project">
              <Redirect to="/calculation" />
            </Route>
            <Route
              path="/calculation/:page?/:projectId?"
              render={() => (
                <TdmCalculationContainer
                  account={account}
                  hasConfirmedNavTransition={hasConfirmedTransition}
                  setLoggedInAccount={setLoggedInAccount}
                />
              )}
            />
            <Route
              path="/projects"
              render={() => <Projects account={account} />}
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
                  <Redirect to="/create-project" />
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
        </Router>
      </UserContext.Provider>
    </React.Fragment>
  );
};

export default withToastProvider(App);
