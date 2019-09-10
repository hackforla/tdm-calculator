import axios from "axios";

const accountUrl = "/api/account";

export const handleRegister = (email, password) => {
  return axios
    .post(`${accountUrl}/register`, { email, password })
    .then(registrationReponse => registrationReponse);
};

export const handleLogin = (email, password) => {
  return axios
    .post(`${accountUrl}/login`, { email, password })
    .then(loginResponse => {
      localStorage.setItem("token", loginResponse.data.token);
      // TODO: check this... under config.data... plain string password. how to hide?
      return loginResponse;
    });
};

export const handleLogout = () => {
  return axios.get(`${accountUrl}/logout`).then(res => res);
};
