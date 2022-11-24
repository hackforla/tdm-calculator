import axios from "axios";

const baseUrl = "/api/faqCategories";

export function get() {
  return axios.get(baseUrl);
}

export function post(faqCategory) {
  return axios.post(baseUrl, faqCategory);
}

export function put(faqCategory) {
  return axios.put(baseUrl + "/" + faqCategory.id, faqCategory);
}

export function del(id) {
  return axios.delete(baseUrl + "/" + id);
}
