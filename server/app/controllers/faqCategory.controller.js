const faqCategoryService = require("../services/faqCategory.service");

const get = async (req, res) => {
  try {
    const response = await faqCategoryService.getFaqCategories();
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

const post = async (req, res) => {
  try {
    await faqCategoryService.postCategories(req.body);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  get,
  post
};
