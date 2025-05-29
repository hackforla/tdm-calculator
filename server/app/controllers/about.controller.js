const aboutService = require("../services/about.service");
const {
  validate,
  validationErrorMiddleware
} = require("../../middleware/validate");
const aboutSchema = require("../schemas/about");

const get = async (_, res) => {
  try {
    const response = await aboutService.getAbout();
    res.json(response);
  } catch (err) {
    console.log("err:", err);
    res;
  }
};

const post = async (req, res) => {
  try {
    await aboutService.postAbout(req.body);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  get,
  post: [validate({ body: aboutSchema }), post, validationErrorMiddleware]
};
