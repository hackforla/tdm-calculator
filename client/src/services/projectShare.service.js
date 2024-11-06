import axios from "axios";

const baseUrl = "/api/projectShare";

export function getById(id) {
  return axios.get(`${baseUrl}/${id}`);
}

export function getByProjectId(projectId) {
  return axios.get(`${baseUrl}/projectId/${projectId}`);
}

export function post(projectShare) {
  return axios.post(baseUrl, projectShare);
}

export function del(id) {
  return axios.delete(`${baseUrl}/${id}`);
}
