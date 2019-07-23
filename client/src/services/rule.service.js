import axios from "axios";

const baseUrl = "/api/rules";
const calculationUrl = "/api/calculations";

export function get() {
  return axios.get(baseUrl);
}

export function getById(id) {
  return axios.get(`${baseUrl}/${id}`);
}

// Get the rules that belong to a specific calculation
export function getByCalculationId(calculationId) {
  return axios.get(`${calculationUrl}/${calculationId}/rules`);
}

export function post(Rule) {
  return axios.post(baseUrl, Rule);
}

export function put(Rule) {
  return axios.put(baseUrl + "/" + Rule.id, Rule);
}

export function del(id) {
  return axios.delete(baseUrl + "/" + id);
}
