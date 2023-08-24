import axios from "axios";

const baseUrl = "/api/public-comment";
axios.defaults.baseUrl = baseUrl;

export const postPublicComment = async formElements => {
  const response = await axios.post(baseUrl, {
    name: formElements.name,
    email: formElements.email,
    comment: formElements.comment,
    forwardToWebTeam: formElements.forwardToWebTeam,
    selectedProjectIds: formElements.selectedProjects
  });
  return response;
};
