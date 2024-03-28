import React from "react";
import { useNavigate } from "react-router-dom";
import * as accountService from "../../services/account.service";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await accountService.logout();
    // Redirect to the "/" page after the logout
    navigate("/");
  };
  // Call handleLogout when the component mounts
  handleLogout();
  // You can return some UI if needed (e.g., a loading spinner)
  return <div>Logging out...</div>;
};

export default Logout;
