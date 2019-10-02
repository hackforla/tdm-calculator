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
      if (loginResponse.status === 201 && loginResponse.data.token) {
        // add  && loginResponse.data.expireAt to if statement?
        let jwt = loginResponse.data.token;
        // let expire_at = loginResponse.data.expireAt;
        // localStorage.setItem("expire_at", expire_at);
        localStorage.setItem("token", jwt);
      }
      // TODO: check this... under config.data... plain string password. how to hide?
      return loginResponse;
    });
};

export const handleLogout = () => {
  // return axios.get(`${accountUrl}/logout`).then(res => {
  localStorage.removeItem("token");
  localStorage.removeItem("expire_at");
  // localStorage.clear()
  // });
};
