import axios from "axios";

const baseUrl = "/api/calculations";

export function get() {
  return axios.get(baseUrl);
}

export function getById(id) {
  return axios.get(`${baseUrl}/${id}`);
}

export function post(calculation) {
  return axios.post(baseUrl, calculation);
}

export function put(calculation) {
  return axios.put(baseUrl + "/" + calculation.id, calculation);
}

export function del(id) {
  return axios.delete(baseUrl + "/" + id);
}
