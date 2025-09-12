const ruleService = require("../services/rule.service");

const getByCalculationId = async (req, res) => {
  try {
    const r = await ruleService.getByCalculationId(req.params.id);
    res.json(r);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const loginId = req.user.id;

    const r = await ruleService.updateDescription({ id, loginId, description });
    res.json(r);
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports = {
  getByCalculationId,
  updateDescription
};
