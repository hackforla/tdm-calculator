import axios from "axios";

const baseUrl = "/api/faqCategories";

export function get() {
  return axios.get(baseUrl);
}

export function post(FaqCategory) {
  return axios.post(baseUrl, FaqCategory);
}

export function put(FaqCategory) {
  return axios.put(baseUrl + "/" + FaqCategory.id, FaqCategory);
}

export function del(id) {
  return axios.delete(baseUrl + "/" + id);
}
