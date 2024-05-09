const ruleService = require("../services/rule.service");

const getByCalculationId = async (req, res) => {
  try {
    const r = await ruleService.getByCalculationId(req.params.id);
    res.json(r);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getByCalculationId
};
