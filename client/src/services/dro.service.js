import axios from "axios";

const baseUrl = "/api/dro/";

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

export function post(dro) {
  return axios.post(baseUrl, dro);
}

export function put(dro) {
  return axios.put(baseUrl + "/" + dro.id, dro);
}

export function del(id) {
  return axios.delete(baseUrl + "/" + id);
}
