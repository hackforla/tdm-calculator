import axios from "axios";

const baseUrl = "/api/accounts";

export const register = async (firstName, lastName, email, password) => {
  try {
    const body = { firstName, lastName, email, password };
    const response = await axios.post(`${baseUrl}/register`, body);
    return response.data;
  } catch (err) {
    throw Error("Registration failed");
  }
};

export const resendConfirmationEmail = async email => {
  const body = { email };
  const response = await axios.post(baseUrl + "/resendConfirmationEmail", body);
  return response.data;
};

export const login = async (email, password) => {
  const body = { email, password };
  try {
    const response = await axios.post(baseUrl + "/login", body);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const confirmRegister = async token => {
  const body = { token };
  const response = await axios.post(baseUrl + "/confirmRegister", body);
  return response.data;
};

export const resetPasswordRequest = async (email) => {
  const response = await axios.post(baseUrl + "/forgotpassword/", { email })
  console.log('response', response)
  return response
}
