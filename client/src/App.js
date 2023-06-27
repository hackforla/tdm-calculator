import React, { useContext, useState } from "react";
import UserContext from "./contexts/UserContext";
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
import TermsAndConditionsModal from "./components/TermsAndConditions/TermsAndConditionsModal";
import ChecklistModal from "./components/Checklist/ChecklistModal";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Register from "./components/Authorization/Register";
import UpdateAccount from "./components/Authorization/UpdateAccount";
import ConfirmEmail from "./components/Authorization/ConfirmEmail";
import ProtectedRoute from "./components/Authorization/ProtectedRoute";
import Login from "./components/Authorization/Login";
import Unauthorized from "./components/Authorization/Unauthorized";
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
  hasConfirmedTransition,
  isOpenNavConfirmModal,
  contentContainerRef,
  appContainerRef,
  checklistModalOpen,
  toggleChecklistModal
}) => {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const account = userContext.account;
  const [rules, setRules] = useState([]);
  const [dateModified, setDateModified] = useState(null);

  // console.error("account: " + JSON.stringify(account, null, 2));

  return (
    <React.Fragment>
      <TermsAndConditionsModal />
      <ChecklistModal
        checklistModalOpen={checklistModalOpen}
        toggleChecklistModal={toggleChecklistModal}
      />
      <Header />
      <div className={classes.app} id="app-container" ref={appContainerRef}>
        <Switch>
          {/* These routes either have no sidebar or use a custom sidebar */}
          <ProtectedRoute
            isAuthorized={account && !!account.email}
            path="/projects"
          >
            <ProjectsPage
              account={account}
              contentContainerRef={contentContainerRef}
              rules={rules}
              setRules={setRules}
              dateModified={dateModified}
              setDateModified={setDateModified}
            />
          </ProtectedRoute>

          <Route path="/calculation/:page/:projectId?">
            <TdmCalculationContainer
              account={account}
              hasConfirmedNavTransition={hasConfirmedTransition}
              isOpenNavConfirmModal={isOpenNavConfirmModal}
              contentContainerRef={contentContainerRef}
              checklistModalOpen={checklistModalOpen}
              toggleChecklistModal={toggleChecklistModal}
              rules={rules}
              setRules={setRules}
              dateModified={dateModified}
              setDateModified={setDateModified}
            />
          </Route>

          <Route exact path="/calculation">
            <Redirect to="/calculation/1" />
          </Route>

          <Route exact path="/">
            <Redirect
              to={account && account.email ? "/calculation/1" : "/login"}
            />
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

                    <Route path="/unauthorized">
                      <Unauthorized />
                    </Route>

                    <Route path="/register/:email?">
                      <Register />
                    </Route>

                    <Route path="/updateaccount/:email?">
                      <UpdateAccount />
                    </Route>

                    <Route path="/confirm/:token?">
                      <ConfirmEmail />
                    </Route>

                    <Route path="/login/:email?">
                      <Login />
                    </Route>

                    <Route path="/forgotpassword">
                      <ForgotPassword />
                    </Route>

                    <Route path="/resetPassword/:token">
                      <ResetPassword />
                    </Route>

                    <ProtectedRoute
                      path="/admin"
                      isAuthorized={account && account.isAdmin}
                    >
                      <Admin account={account} />
                    </ProtectedRoute>

                    <ProtectedRoute
                      path="/roles"
                      isAuthorized={account && account.isSecurityAdmin}
                    >
                      <Roles />
                    </ProtectedRoute>

                    <Route path="/faqs/:showChecklist?">
                      <FaqView
                        toggleChecklistModal={toggleChecklistModal}
                        checklistModalOpen={checklistModalOpen}
                      />
                    </Route>

                    <Route path="/publiccomment">
                      <PublicComment account={account} />
                    </Route>
                  </div>
                </>
              </Switch>
            </>
          </Route>
        </Switch>
      </div>
      <Footer toggleChecklistModal={toggleChecklistModal} />
    </React.Fragment>
  );
};

App.propTypes = {
  hasConfirmedTransition: PropTypes.bool,
  isOpenNavConfirmModal: PropTypes.bool,
  appContainerRef: PropTypes.object,
  contentContainerRef: PropTypes.object,
  checklistModalOpen: PropTypes.bool,
  toggleChecklistModal: PropTypes.func
};

export default withToastProvider(App);
