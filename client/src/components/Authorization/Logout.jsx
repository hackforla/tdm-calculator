import React from "react";
import { useNavigate } from "react-router-dom";
import * as accountService from "../../services/account.service";
import {
  SORT_CRITERIA_STORAGE_TAG,
  FILTER_CRITERIA_STORAGE_TAG
} from "../../helpers/Constants";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await accountService.logout();

    // Reset filters/sort from "/projects" page
    sessionStorage.removeItem(SORT_CRITERIA_STORAGE_TAG);
    sessionStorage.removeItem(FILTER_CRITERIA_STORAGE_TAG);

    // Redirect to the "/login" page after the logout
    navigate("/login");
  };
  // Call handleLogout when the component mounts
  handleLogout();
  // You can return some UI if needed (e.g., a loading spinner)
  return <div>Logging out...</div>;
};

export default Logout;
