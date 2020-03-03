//example of a protected route/controller/service
const getMessage = () => {
  return promise({
    message: "gotMessage"
  });
};

const getAuthorizedStuff = () => {
  console.log("getAuthorizedStuff");
  return promise({
    authorizedStuff: "some authorized stuff here"
  });
};
const getAuthorizedStuffADMIN = () => {
  console.log("getAuthorizedStuffADMIN");
  return promise({
    authorizedADMINStuff: "some authorized ADMIN stuff here"
  });
};

const getAuthorizedStuffADMIN2 = () => {
  console.log("playground.service getAuthorizedStuffADMIN2");
  return promise({
    authorizedADMINStuff2: "some authorized ADMIN stuff here 2"
  });
};
// in order to use the .then and .catch in the controller,
// the functions in service file needs to be return a promise.
// temporarily keeping this here for reference
// alternative to using promises is using async/await
const promise = itemToResolve => {
  return new Promise(function(resolve) {
    resolve(itemToResolve);
  });
};

module.exports = {
  getMessage,
  getAuthorizedStuff,
  getAuthorizedStuffADMIN,
  getAuthorizedStuffADMIN2
};
