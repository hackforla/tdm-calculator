import axios from "axios";

const baseUrl = "/api/calculations";

export function get() {
  return axios.get(baseUrl);
}

export function getById(id) {
  return axios.get(`${baseUrl}/${id}`);
}

export function updateDescription(id, description) {
  return axios.put(`${baseUrl}/updateDescription/${id}`, { description });
}
