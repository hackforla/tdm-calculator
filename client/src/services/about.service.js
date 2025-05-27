import axios from "axios";

const baseUrl = "/api/about";

export function get() {
  return axios.get(baseUrl);
}

export function post(about) {
  return axios.post(baseUrl, about);
}
