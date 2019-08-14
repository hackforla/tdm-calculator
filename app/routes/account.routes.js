const router = require('express').Router();
const accountController = require("../controllers/account.controller");

module.exports = router;

router.post('/register', accountController.postRegister)
router.post('/login', accountController.postLogin)

//example of a protected route/controller/service
router.get('/getMessage', accountController.verifyToken, accountController.getMessage)







// CODE BELOW HAS BEEN REFACTORED AND ADDED TO separate routes, controller, and service
// keeping this here for reference for now -- claire

// router.post('/register', (req, res) => {
//     // TODO: add valication, if account exists in the system already...

//     // if account is not in db, then has the password
//     bcrypt.hash(req.body.password, 10, (err, hash) => {
//         if (err) {
//             // if error, we coudln't hash the password and couldn't store it
//             return res.status(500).json({
//                 error: err
//             })
//         } else {
//             // if no error, create account with the hashed password
//             // TODO: add details on saving account here
//             const account = {
//                 email: req.body.email,
//                 hash: hash
//             }

//             return res.status(201).json({
//                 message: "successfully posted to register",
//                 account
//             })
//         }
//     })

// })