import axios from "axios";

const baseUrl = "/api/projects";

export function get() {
  return axios.get(baseUrl);
}

export function getById(id) {
  return axios.get(`${baseUrl}/${id}`);
}

export function post(project) {
  return axios.post(baseUrl, project);
}

export function put(project) {
  return axios.put(baseUrl + "/" + project.id, project);
}

export function del(id) {
  return axios.delete(baseUrl + "/" + id);
}
