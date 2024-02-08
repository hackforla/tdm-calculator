import React, { useContext } from "react";
import UserContext from "./contexts/UserContext";
import PropTypes from "prop-types";
import "./styles/App.scss";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate
} from "react-router-dom";
import { withToastProvider } from "./contexts/Toast";
import RequireAuth from "./components/Authorization/RequireAuth";

// Layout Routes
import ClientAreaLayout from "./components/Layout/ClientAreaLayout";
import PlainSidebarLayout from "./components/Layout/PlainSidebarLayout";

// Path Routes
import TdmCalculationContainer from "./components/ProjectWizard/TdmCalculationContainer";
import ProjectsPage from "./components/Projects/ProjectsPage";
import About from "./components/About";
import TermsAndConditionsPage from "./components/TermsAndConditions/TermsAndConditionsPage";
import ChecklistPage from "./components/Checklist/ChecklistPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Register from "./components/Authorization/Register";
import UpdateAccount from "./components/Authorization/UpdateAccount";
import ConfirmEmail from "./components/Authorization/ConfirmEmail";
import Login from "./components/Authorization/Login";
import Unauthorized from "./components/Authorization/Unauthorized";
import Admin from "./components/Admin/Admin";
import Roles from "./components/Roles";
import ProjectsArchive from "./components/ArchiveDelete/ProjectsArchive";
import RolesArchive from "./components/ArchiveDelete/RolesArchive";
import FaqView from "./components/Faq/FaqView";
import ResetPassword from "./components/Authorization/ResetPassword";
import ForgotPassword from "./components/Authorization/ForgotPassword";
import Feedback from "./components/Feedback/FeedbackPage";
import ErrorPage from "./components/ErrorPage";
import Offline from "./components/Offline";

const calculationPath = "/calculation/:page/:projectId?/*";

const App = ({
  contentContainerRef,
  appContainerRef,
  checklistModalOpen,
  toggleChecklistModal,
  hasAcceptedTerms,
  onAcceptTerms
}) => {
  const userContext = useContext(UserContext);
  const account = userContext.account;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <div>
            <ClientAreaLayout
              appContainerRef={appContainerRef}
              hasAcceptedTerms={hasAcceptedTerms}
              onAcceptTerms={onAcceptTerms}
              checklistModalOpen={checklistModalOpen}
              toggleChecklistModal={toggleChecklistModal}
            />
          </div>
        }
      >
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
          path={calculationPath}
          element={
            <TdmCalculationContainer
              account={account}
              contentContainerRef={contentContainerRef}
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
            <div>
              <PlainSidebarLayout contentContainerRef={contentContainerRef} />
            </div>
          }
        >
          <Route path="/about" element={<About />} />
          {/* TODO:  update FAQ to use checklist link, redirect for now. */}
          <Route path="/faqs/true" element={<Navigate to="/checklist" />} />
          <Route path="/checklist" element={<ChecklistPage />} />
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
          <Route path="/faqs" element={<FaqView isAdmin={account.isAdmin} />} />
          <Route path="/feedback" element={<Feedback account={account} />} />
          <Route path="/offline" element={<Offline />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

App.propTypes = {
  appContainerRef: PropTypes.object,
  contentContainerRef: PropTypes.object,
  hasAcceptedTerms: PropTypes.bool,
  onAcceptTerms: PropTypes.func,
  checklistModalOpen: PropTypes.bool,
  toggleChecklistModal: PropTypes.func
};

export default withToastProvider(App);
