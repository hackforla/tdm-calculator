const faqService = require("../services/faq.service");

const get = (req, res) => {
  faqService
    .getFaq()
    .then(resultSet => {
      res.json(resultSet);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const post = (req, res) => {
  faqService
    .postFaq(req.body)
    .then(() => {
      res.status(201);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const put = (req, res) => {
  faqService
    .putFaqById(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const del = (req, res) => {
  faqService
    .deleteFaq(req.params.id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

module.exports = {
  get,
  post,
  put,
  del
};
