import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { withToastProvider } from "./contexts/Toast";
import { UserContext } from "./components/user-context";
import RequiredFieldContext from "./contexts/RequiredFieldContext";
import TdmCalculationContainer from "./components/TdmCalculationContainer";
import Projects from "./components/Projects";
import Header from "./components/Header";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Register from "./components/Authorization/Register";
import ConfirmEmail from "./components/Authorization/ConfirmEmail";
import Login from "./components/Authorization/Login";
import Admin from "./components/Admin";
import LandingPage from "./components/LandingPage/LandingPage";
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
        console.log(account);
        setAccount(account);
      } catch (err) {
        // TODO: replace with production error logging.
        console.log(
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

  const unfilledRequired = useState({});

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
            <Route exact path="/" component={LandingPage} />
            <RequiredFieldContext.Provider value={unfilledRequired}>
              <Route
                path="/calculation/:projectId?"
                render={() => (
                  <TdmCalculationContainer
                    account={account}
                    setIsCreatingNewProject={setIsCreatingNewProject}
                  />
                )}
              />
            </RequiredFieldContext.Provider>
            <Route
              path="/projects"
              render={() => <Projects account={account} />}
            />
            <Route path="/about" component={About} />
            <Route path="/register/:email?" component={Register} />
            <Route path="/confirm/:token" component={ConfirmEmail} />
            <Route
              path="/login/:email?"
              render={() => <Login setLoggedInAccount={setLoggedInAccount} />}
            />
            <Route path="/forgotpassword" component={ResetPasswordRequest} />
            <Route path="/resetPassword/:token" component={ResetPassword} />
            <Route path="/contactus" component={ContactUs} />
            {account && account.role === "admin" ? (
              <Route path="/admin" render={() => <Admin account={account} />} />
            ) : null}
          </div>
        </Router>
      </UserContext.Provider>
    </React.Fragment>
  );
};

export default withToastProvider(App);
