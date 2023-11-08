import React, { useContext } from "react";
import UserContext from "./contexts/UserContext";
import PropTypes from "prop-types";
import { Route, Navigate, Routes, Outlet } from "react-router-dom";
import RequireAuth from "./components/Authorization/RequireAuth";
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
import Login from "./components/Authorization/Login";
import Unauthorized from "./components/Authorization/Unauthorized";
import Admin from "./components/Admin";
import Roles from "./components/Roles";
import ProjectsArchive from "./components/ArchiveDelete/ProjectsArchive";
import RolesArchive from "./components/ArchiveDelete/RolesArchive";
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

  return (
    <React.Fragment>
      <TermsAndConditionsModal />
      <ChecklistModal
        checklistModalOpen={checklistModalOpen}
        toggleChecklistModal={toggleChecklistModal}
      />
      <Header />
      <div className={classes.app} id="app-container" ref={appContainerRef}>
        <Routes>
          {/* These routes either have no sidebar or use a custom sidebar */}
          <Route
            path="/projects"
            element={
              <RequireAuth
                isAuthorized={account && !!account.email}
                redirectTo="/unauthorized"
              >
                <ProjectsPage
                  account={account}
                  contentContainerRef={contentContainerRef}
                />
              </RequireAuth>
            }
          />
          <Route
            path="/calculation/:page/:projectId?/*"
            element={
              <TdmCalculationContainer
                account={account}
                hasConfirmedNavTransition={hasConfirmedTransition}
                isOpenNavConfirmModal={isOpenNavConfirmModal}
                contentContainerRef={contentContainerRef}
                checklistModalOpen={checklistModalOpen}
                toggleChecklistModal={toggleChecklistModal}
              />
            }
          />
          <Route
            path="/calculation"
            element={<Navigate to="/calculation/1/0" />}
          />

          <Route
            path="/"
            element={
              <Navigate
                to={account && account.email ? "/calculation/1/0" : "/login"}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth
                isAuthorized={account && account.isAdmin}
                redirectTo="/unauthorized"
              >
                <Admin account={account} />
              </RequireAuth>
            }
          />
          {/* Layout Route adds plain Sidebar */}
          <Route
            element={
              <>
                <Sidebar />
                <div
                  className={classes.containerForRef}
                  ref={contentContainerRef}
                >
                  <Outlet />
                </div>
              </>
            }
          >
            <Route path="/about" element={<About />} />
            <Route
              path="/termsandconditions"
              element={<TermsAndConditionsPage />}
            />

            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/register/:email?" element={<Register />} />
            <Route path="/updateaccount/:email?" element={<UpdateAccount />} />
            <Route path="/confirm/:token?" element={<ConfirmEmail />} />
            <Route path="/login/:email?" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetPassword/:token" element={<ResetPassword />} />

            <Route
              path="/roles"
              element={
                <RequireAuth
                  isAuthorized={account && account.isSecurityAdmin}
                  redirectTo="/unauthorized"
                >
                  <Roles />
                </RequireAuth>
              }
            />
            <Route
              path="/archivedaccounts"
              element={
                <RequireAuth
                  isAuthorized={account && account.isSecurityAdmin}
                  redirectTo="/unauthorized"
                >
                  <RolesArchive />
                </RequireAuth>
              }
            />
            <Route
              path="/archivedprojects"
              element={
                <RequireAuth
                  isAuthorized={account && account.isSecurityAdmin}
                  redirectTo="/unauthorized"
                >
                  <ProjectsArchive />
                </RequireAuth>
              }
            />
            <Route
              path="/faqs/:showChecklist?"
              element={
                <FaqView
                  isAdmin={account.isAdmin}
                  toggleChecklistModal={toggleChecklistModal}
                  checklistModalOpen={checklistModalOpen}
                />
              }
            />
            <Route
              path="/publiccomment"
              element={<PublicComment account={account} />}
            />
          </Route>
        </Routes>
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
