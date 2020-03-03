const router = require("express").Router();
const projectController = require("../controllers/project.controller");

module.exports = router;

router.get("/:id", projectController.getById);
router.get("/", projectController.getAll);
router.post("/", projectController.post);
router.put("/:id", projectController.put);
router.delete("/", projectController.del);
