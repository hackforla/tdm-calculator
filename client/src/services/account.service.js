import axios from "axios";

const baseUrl = "/api/accounts";

export const search = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response;
  } catch (err) {
    throw Error("Search accounts failed");
  }
};

export const putRoles = async ({ id, isAdmin, isSecurityAdmin }) => {
  try {
    const body = { id, isAdmin, isSecurityAdmin };
    const response = await axios.put(`${baseUrl}/${id}/roles`, body);
    return response;
  } catch (err) {
    throw Error("Unable to set permissions");
  }
};

export const register = async (firstName, lastName, email, password) => {
  try {
    const body = { firstName, lastName, email, password };
    const response = await axios.post(`${baseUrl}/register`, body);
    return response.data;
  } catch (err) {
    throw Error("Registration failed");
  }
};

export const updateAccount = async (firstName, lastName, email) => {
  try {
    const body = { firstName, lastName, email };
    const response = await axios.put(`${baseUrl}/updateaccount`, body);
    return response.data;
  } catch (err) {
    throw Error("Update account failed");
  }
};

export const resendConfirmationEmail = async email => {
  const body = { email };
  try {
    const response = await axios.post(
      baseUrl + "/resendConfirmationEmail",
      body
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const login = async (email, password) => {
  const body = { email, password };
  try {
    const response = await axios.post(baseUrl + "/login", body);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const logout = async () => {
  const response = await axios.get(`${baseUrl}/logout`);
  return response;
};

export const confirmRegister = async token => {
  const body = { token };
  const response = await axios.post(baseUrl + "/confirmRegister", body);
  return response.data;
};

export const resetPasswordRequest = async email => {
  const response = await axios.post(baseUrl + "/forgotpassword/", { email });
  return response;
};

export const resetPassword = async values => {
  const response = await axios.post(baseUrl + "/resetPassword", values);
  return response;
};

export const archiveAccount = async id => {
  const response = await axios.put(`${baseUrl}/${id}/archiveaccount`);
  return response;
};

export const unarchiveAccount = async id => {
  const response = await axios.put(`${baseUrl}/${id}/unarchiveaccount`);
  return response;
};

export const getAllArchivedAccounts = async () => {
  const response = await axios.get(`${baseUrl}/archivedaccounts`);
  return response;
};

export const deleteAccount = async id => {
  const response = await axios.delete(`${baseUrl}/${id}/deleteaccount`);
  return response;
};

export const getAuthorization = async ({
  email,
  firstName,
  lastName,
  oktaAccessToken
}) => {
  const body = { email, firstName, lastName };
  const config = {
    headers: {
      Authorization: `Bearer ${oktaAccessToken}`
    }
  };
  try {
    const response = await axios.post(
      baseUrl + "/getauthorization",
      body,
      config
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
