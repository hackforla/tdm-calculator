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

export function getByIdWithEmail(id) {
  return axios.get(`${baseUrl}/projectShare/${id}`);
}

export function post(project) {
  return axios.post(baseUrl, project);
}

export function put(project) {
  return axios.put(`${baseUrl}/${project.id}`, project);
}

export function del(id) {
  return axios.delete(`${baseUrl}/${id}`);
}

export function submit(id) {
  return axios.put(`${baseUrl}/submit`, id);
}

export function snapshot(id) {
  return axios.put(`${baseUrl}/snapshot`, id);
}

export function renameSnapshot(id) {
  return axios.put(`${baseUrl}/renameSnapshot`, id);
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
    const response = axios.put(`${baseUrl}/trash`, { ids: projectIds, trash });
    return response;
  } catch (error) {
    return new Promise.reject(error);
  }
}

// New function to update the DRO ID
export function updateDroId(projectId, droId, loginId) {
  return axios.put(`${baseUrl}/updateDroId/${projectId}`, { droId, loginId });
}

export function updateAdminNotes(id, adminNotes) {
  return axios.put(`${baseUrl}/updateAdminNotes/${id}`, { adminNotes });
}

export function updateTotals(requestBody) {
  return axios.put(`${baseUrl}/updateTotals/${requestBody.id}`, requestBody);
}

export function getSubmissions() {
  try {
    return axios.get(`${baseUrl}/submissions`);
  } catch (error) {
    return new Promise.reject(error);
  }
}

export function getSubmissionsAdmin() {
  try {
    return axios.get(`${baseUrl}/submissionsadmin`);
  } catch (error) {
    return new Promise.reject(error);
  }
}

export function putSubmission(submission) {
  try {
    return axios.put(`${baseUrl}/submissions/${submission.id}`, submission);
  } catch (error) {
    return new Promise.reject(error);
  }
}
