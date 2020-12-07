import axios from "axios";

const baseUrl = "/api/public-comment";

export const postPublicComment = async formElements => {
  const response = await axios.post(baseUrl, {
    name: formElements.name,
    email: formElements.email,
    comment: formElements.comment,
    forwardToWebTeam: formElements.forwardToWebTeam
  });
  return response;
};
