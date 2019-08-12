const router = require('express').Router();
const bcrypt = require('bcrypt')
const mssql = require("../../mssql");
// can refactor after by putting in controller...
const accountController = require("../controllers/account.controller");
// router.post("/", authController.post);


module.exports = router;

router.post('/register', accountController.postRegister )


// router.post('/', accountController.register.post)

router.get('/getMessage', accountController.getMessage)



// router.post('/register', (req, res) => {
//     // TODO: add valication, if user exists in the system already...

//     // if user is not in db, then has the password
//     bcrypt.hash(req.body.password, 10, (err, hash) => {
//         if (err) {
//             // if error, we coudln't hash the password and couldn't store it
//             return res.status(500).json({
//                 error: err
//             })
//         } else {
//             // if no error, create user with the hashed password
//             // TODO: add details on saving user here
//             const user = {
//                 email: req.body.email,
//                 hash: hash
//             }
            
//             return res.status(201).json({
//                 message: "successfully posted to register",
//                 user
//             })
//         }
//     })
    


// })

// router.post('/login', (req, res) => {
    
// })


