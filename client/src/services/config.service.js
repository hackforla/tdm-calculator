import axios from "axios";

const baseUrl = "/api/configs";

export function getAll() {
  return axios.get(baseUrl);
}

export function getByCode(code) {
  return axios.get(baseUrl + "/" + code);
}

export function post(config) {
  return axios.post(baseUrl, config);
}

export function put(config) {
  return axios.put(baseUrl + "/" + config.code, config);
}

export function del(code) {
  return axios.delete(baseUrl + "/" + code);
}
