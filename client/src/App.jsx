import React, { useRef } from "react";
import "./styles/App.scss";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate
} from "react-router-dom";
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
import SubmitSnapshotPage from "./components/SubmitSnapshot/SubmitSnapshotPage";
import ErrorPage from "./components/ErrorPage";
import Offline from "./components/Offline";
import Logout from "./components/Authorization/Logout";
import SubmissionsPage from "./components/Submissions/SubmissionsPage";
import SubmissionsAdminPage from "./components/Submissions/SubmissionsAdminPage";
import { getConfigs } from "./helpers/Config";

const calculationPath = "/calculation/:page/:projectId?/*";
const sharedProjectPath = "/projects/:projectId?";

const App = () => {
  const contentContainerRef = useRef();
  const appContainerRef = useRef();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <div>
            <ClientAreaLayout appContainerRef={appContainerRef} />
          </div>
        }
        loader={async () => {
          const configs = await getConfigs();
          return { configs };
        }}
      >
        {/* These routes either have no sidebar or use a custom sidebar */}
        <Route
          path="/projects"
          element={
            <RequireAuth>
              <ProjectsPage contentContainerRef={contentContainerRef} />
            </RequireAuth>
          }
        />
        <Route
          path={sharedProjectPath}
          element={
            <TdmCalculationContainer
              contentContainerRef={contentContainerRef}
            />
          }
        />
        <Route
          path={calculationPath}
          element={
            <TdmCalculationContainer
              contentContainerRef={contentContainerRef}
            />
          }
        />
        <Route
          path="/calculation"
          element={<Navigate to="/calculation/1/0" />}
        />

        <Route path="/" element={<Navigate to={"/calculation/1/0"} />} />
        <Route
          path="/admin"
          element={
            <RequireAuth roles={["isAdmin"]}>
              <Admin />
            </RequireAuth>
          }
        />
        <Route path="/offline" element={<Offline />} />
        {/* Layout Route adds plain Sidebar */}
        <Route
          element={
            <div>
              <PlainSidebarLayout />
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
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route
            path="/roles"
            element={
              <RequireAuth roles={["isSecurityAdmin"]}>
                <Roles contentContainerRef={contentContainerRef} />
              </RequireAuth>
            }
          />
          <Route
            path="/archivedaccounts"
            element={
              <RequireAuth roles={["isSecurityAdmin"]}>
                <RolesArchive />
              </RequireAuth>
            }
          />
          <Route
            path="/archivedprojects"
            element={
              <RequireAuth roles={["isSecurityAdmin"]}>
                <ProjectsArchive />
              </RequireAuth>
            }
          />
          <Route path="/faqs" element={<FaqView />} />
          <Route
            path="/feedback"
            element={<Feedback contentContainerRef={contentContainerRef} />}
          />
          <Route
            path="/submit"
            element={
              <RequireAuth>
                <SubmitSnapshotPage contentContainerRef={contentContainerRef} />
              </RequireAuth>
            }
          />
          <Route
            path="/submissions"
            element={
              <RequireAuth>
                <SubmissionsPage contentContainerRef={contentContainerRef} />
              </RequireAuth>
            }
          />
          <Route
            path="/submissionsadmin"
            element={
              <RequireAuth>
                <SubmissionsAdminPage
                  contentContainerRef={contentContainerRef}
                />
              </RequireAuth>
            }
          />
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

export default App;
