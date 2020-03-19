const faqService = require("../services/faq.service");

const get = async (req, res) => {
  try {
    const response = await faqService.getFaq();
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const post = async (req, res) => {
  try {
    await faqService.postFaq(req.body);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
};

const put = async (req, res) => {
  try {
    await faqService.putFaqById(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};

const del = async (req, res) => {
  try {
    await faqService.deleteFaq(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  get,
  post,
  put,
  del
};
