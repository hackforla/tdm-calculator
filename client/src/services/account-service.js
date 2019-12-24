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

// export const login = (email, password) => {
//   return axios
//     .post(`${baseUrl}/login`, { email, password })
//     .then(loginResponse => {
//       if (loginResponse.status === 201 && loginResponse.data.token) {
//         // add  && loginResponse.data.expireAt to if statement?
//         let jwt = loginResponse.data.token;
//         // let expire_at = loginResponse.data.expireAt;
//         // localStorage.setItem("expire_at", expire_at);
//         localStorage.setItem("token", jwt);
//       }
//       // TODO: check this... under config.data... plain string password. how to hide?
//       return loginResponse;
//     });
// };

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
