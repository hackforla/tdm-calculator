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



const postRegister = (req, res) => {
    return bcrypt.hash(req.password, 10)
        .then( hash => {
        // TODO: 1) check if user is in db 
        
        
        // TODO: 2) create user and add to db

        // NOT SURE HOW TO MAKE REQUESTS TO THE DATABASE...

        // mssql.executeProc("Create_Account")
        // .then(sqlRequest => {
        //     sqlRequest.addParamenter("email", TYPES.VarChar, req.email, {length: 255})
        //     sqlRequest.addParamenter("password", TYPES.VarChar, hash, {length: 72})
        //     sqlRequest.addOutputParameter("id", TYPES.Int, null)
        // })
        // .then(response => {
        //     console.log(response)
        //     return response.outputParameters;
        // })
        // .then(res => console.log(res))
        // .catch(err => {
        //     console.log(err)
        //     res.status(500).json(err)
        // })
    

        // TEMP JSON RESPONSE HARD CODED
        const userInfo = {
            
            email: req.email,
            password: hash, 
            message: "TEMP JSON DATA BACK. NEEDS TO BE REPLACED WITH THE USER ID and TOKEN"
        }
        return userInfo
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
