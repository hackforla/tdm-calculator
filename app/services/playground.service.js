//example of a protected route/controller/service
const getMessage = req => {
  const decoded = jwt.verify(req.token, process.env.JWT_SECRET_KEY);
  return promise({
    message: "decoded token payload included in json",
    ...decoded
  });
};

const getAuthorizedStuff = (req, res) => {
  return promise({
    authorizedStuff: "some authorized stuff here"
  });
};

// in order to use the .then and .catch in the controller,
// the functions in service file needs to be return a promise.
// temporarily keeping this here for reference
// alternative to using promises is using async/await
const promise = itemToResolve => {
  return new Promise(function(resolve, reject) {
    resolve(itemToResolve);
  });
};

module.exports = {
  getMessage,
  getAuthorizedStuff
};
