const router = require("express").Router();

const configController = require("../controllers/config.controller");

module.exports = router;

router.get("/", configController.getAll);
router.get("/:code", configController.getByCode);
router.post("/", configController.post);
router.put("/:code", configController.put);
router.delete("/:code", configController.del);
