import axios from "axios";

const baseUrl = "/api/projects";

export function get() {
  try {
    return axios.get(baseUrl);
  } catch (error) {
    return new Promise.reject(error);
  }
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

export function getAllArchivedProjects() {
  try {
    return axios.get(`${baseUrl}/archivedprojects`);
  } catch (error) {
    return new Promise.reject(error);
  }
}

export function hide(projectIds, hide) {
  try {
    return axios.put(`${baseUrl}/hide`, { ids: projectIds, hide });
  } catch (error) {
    return new Promise.reject(error);
  }
}

export function trash(projectIds, trash) {
  try {
    return axios.put(`${baseUrl}/trash`, { ids: projectIds, trash });
  } catch (error) {
    return new Promise.reject(error);
  }
}
