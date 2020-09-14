import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
import axios from "axios";

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
  const [isCreatingNewProject, setIsCreatingNewProject] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      try {
        const account = JSON.parse(currentUser);
        // TODO: remove console.log when stable.
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

  //TODO: This doesn't seem like it's getting used anymore. Don't see token in local storage. Check on authorization flow to see if token is still needed.
  const setTokenInHeaders = () => {
    axios.interceptors.request.use(
      config => {
        let token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );
  };

  setTokenInHeaders();

  return (
    <React.Fragment>
      <UserContext.Provider value={account}>
        <Router>
          <Header
            account={account}
            setAccount={setAccount}
            isCreatingNewProject={isCreatingNewProject}
          />
          <div className={classes.root}>
            <Route
              exact
              path="/"
              render={() => <Login setLoggedInAccount={setLoggedInAccount} />}
            />
            <Route
              path="/calculation/:page?/:projectId?"
              render={() => (
                <TdmCalculationContainer
                  account={account}
                  setIsCreatingNewProject={setIsCreatingNewProject}
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
              render={() => <Login setLoggedInAccount={setLoggedInAccount} />}
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
          </div>
          <Footer />
        </Router>
      </UserContext.Provider>
    </React.Fragment>
  );
};

export default withToastProvider(App);
