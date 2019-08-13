const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const bcrypt = require('bcrypt')

const promise = (itemToResolve) => {
    return new Promise(function(resolve, reject) {
        resolve(itemToResolve);
    });
}


const postLogin = (req, res) => {
    const tempUser = {
        email: "claire@tdm.com",
        // the original string password is: "tdmpassword"
        password: "$2b$10$44otJ0IfAbSMM.E1h3XqVu8KVKOuy13ANcgN3X4kCamnS0svttyH6"
    }


    return promise({'login message': 'you hit postLogin() in account.service'})
}



const postRegister = async (req, res) => {
    return await bcrypt.hash(req.password, 10)
        .then( async hash => {
            // TODO: 1) check if user is in db 
            // TODO: 2) create user and add to db

            await mssql.executeProc("Create_Account", sqlRequest => {
                sqlRequest.addParameter("email", TYPES.VarChar, req.email);
                sqlRequest.addParameter("password", TYPES.VarChar, hash)
            })
            .then(response => {
                console.log("RESPONSE RESULT SETS", response.resultSets[0][0])
                return "testing response here"
                // TODO: figure out how to return the result set back to the controller
                // return response.resultSets[0][0]
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({error: err})
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
}


// testing 
const getMessage = (res) => {
    return  promise(
        {message: "welcome to the account routes"}
    )
}


module.exports = {
    postRegister,
    postLogin,
    getMessage
}
