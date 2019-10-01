// const request = method => async (url, body) => {
//   try {
//     token = await localStorage.getItem("token");

//     return axios.
//     return fetch(url, {
//       method: method,
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "applicatin/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify(body)
//     }).then(resp => resp.json());
//   } catch (error) {
//     alert(error.message);
//   }
// };

// export const server = {
//   get: request("GET"),
//   patch: request("PATCH"),
//   post: request("POST"),
//   delete: request("DELETE")
// };

// // Get the rules that belong to a specific calculation
// export function getByCalculationId(calculationId) {
//   return axios.get(`${calculationUrl}/${calculationId}/rules`);
// }
