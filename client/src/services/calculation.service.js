import axios from "axios";

const baseUrl = "/api/calculations";

export function get() {
  return axios.get(baseUrl);
}

export function getById(id) {
  return axios.get(`${baseUrl}/${id}`);
}
