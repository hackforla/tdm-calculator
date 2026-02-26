import axios from "axios";

const baseUrl = "/api/calculations";

export function get(includeRules) {
  if (includeRules) {
    return axios.get(`${baseUrl}/includeRules`);
  }
  return axios.get(baseUrl);
}

export function getById(id, includeRules = false) {
  if (includeRules) {
    return axios.get(`${baseUrl}/includeRules/${id}`);
  }
  return axios.get(`${baseUrl}/${id}`, { includeRules });
}

export function updateDescription(id, description) {
  return axios.put(`${baseUrl}/updateDescription/${id}`, { description });
}
