import axios from "axios";

const baseUrl = "/api/faqs";

export function get() {
  return axios.get(baseUrl);
}

export function post(faq) {
  return axios.post(baseUrl, faq);
}

export function put(faq) {
  return axios.put(baseUrl + "/" + faq.id, faq);
}

export function del(id) {
  return axios.delete(baseUrl + "/" + id);
}
