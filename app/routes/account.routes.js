const router = require('express').Router();
const accountController = require("../controllers/account.controller");

module.exports = router;

router.post('/register', accountController.postRegister)
router.post('/login', accountController.postLogin)

//example of a protected route/controller/service
router.get('/getMessage', accountController.verifyToken, accountController.getMessage)

