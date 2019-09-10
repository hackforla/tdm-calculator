import axios from "axios";

const accountUrl = "/api/account";

export const handleRegister = (email, password) => {
  return axios
    .post(`${accountUrl}/register`, { email, password })
    .then(res => res);
};

export const handleLogin = (email, password) => {
  return axios
    .post(`${accountUrl}/login`, { email, password })
    .then(LoginResponse => {
      localStorage.setItem("token", LoginResponse.data.token);
      // TODO: check this... under config.data... plain string password. how to hide?
      return LoginResponse;
    });
};

export const handleLogout = () => {
  return axios.get(`${accountUrl}/logout`).then(res => res);
};
