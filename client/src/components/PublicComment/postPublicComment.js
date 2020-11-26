import axios from "axios";

const baseUrl = "/api/public-comment";

export const postPublicComment = async formElements => {
  // try {

    // this works, if you just pass in stringified formElements
    // const response = await axios.post(baseUrl, formElements)

  const response = await axios.post(baseUrl, {
    name: formElements.name,
    email: formElements.email,
    comment: formElements.comment,
    forwardToWebTeam: formElements.forwardToWebTeam
  }).then(r => {
    console.log("THEN RESULT", r);
    return r}) .catch((err) => Promise.reject(err));

    // console.log('response postPublicComment', response)
    return response;
  // } catch(e) {() => console.log(e)}

};
