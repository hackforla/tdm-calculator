const mssql = require("../../mssql");
const bcrypt = require('bcrypt')

const promise = (resolvedItem) => {
    return new Promise(function(resolve, reject) {
        resolve(resolvedItem);
    });
}

// testing
const getMessage = (res) => {
    return  promise(
        {message: "welcome to the account routes"}
    )
}

const postRegister = (req, res) => {
    return bcrypt.hash(req.password, 10)
        .then( hash => {
        // TODO: 1) check if user is in db 2) create user

        //TODO: need to return the user id and token, temporarily just returning user back
        const userInfo = {
                    email: req.email,
                    hash
                }
        return user
    })
}





// return  res.json({
        //                 message: "successfully posted to register",
        //                 user
        //             })
            // if (err) {
            //     // if error, we coudln't hash the password and couldn't store it
            //     return res.status(500).json({
            //         error: err
            //     })
            // } else {
            //     // if no error, create user with the hashed password
            //     // TODO: add details on saving user here
            //     const user = {
            //         email: req.email,
            //         hash: hash
            //     }
                
            //     return res.status(201).json({
            //         message: "successfully posted to register",
            //         user
            //     })
            // }

   // TODO: add valication, if user exists in the system already...

//     // if user is not in db, then has the password

    


    // bcrypt.hash(req.password, 10, (err, hash) => {
    //     if (err) {
    //         // if error, we coudln't hash the password and couldn't store it
    //         return res.status(500).json({
    //             error: err
    //         })
    //     } else {
    //         // if no error, create user with the hashed password
    //         // TODO: add details on saving user here
    //         const user = {
    //             email: req.email,
    //             hash: hash
    //         }
            
    //         return res.status(201).json({
    //             message: "successfully posted to register",
    //             user
    //         })
    //     }
    // })
    
// }

// const postLogin = () => {
//     return
// }

module.exports = {
    postRegister,
    // postLogin,
    getMessage
}
