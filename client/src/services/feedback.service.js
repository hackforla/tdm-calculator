import axios from "axios";

const baseUrl = "/api/feedbacks";

export function post(feedback) {
  return axios.post(baseUrl, feedback);
}
