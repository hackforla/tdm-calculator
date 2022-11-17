const faqCategoryService = require("../services/faqCategory.service");

const get = async (req, res) => {
  try {
    const response = await faqCategoryService.getFaqCategory();
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const post = async (req, res) => {
  try {
    await faqCategoryService.postFaqCategory(req.body);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
};

const put = async (req, res) => {
  try {
    await faqCategoryService.putFaqCategoryById(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};

const del = async (req, res) => {
  try {
    await faqCategoryService.deleteFaqCategory(req.params.id);
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
