const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


//example of a protected route/controller/service
const getMessage = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    return promise({
        message: "decoded token payload included in json",
        ...decoded
    })
}

// in order to use the .then and .catch in the controller,
// the functions in service file needs to be return a promise
// alternative is using async/await
const promise = (itemToResolve) => {
    return new Promise(function (resolve, reject) {
        resolve(itemToResolve);
    });
}

const postLogin = async ({
    email,
    password
}) => {
    // TODO 1: logic to compare password/hash in db; return the accountInfo

    // TODO 2: return jwt token with user info.
    const tempAccount = {
        id: 2,
        email: "claire3@tdm.com",
        role: "developer",
        confirmed: false
    }

    let token = await jwt.sign({
        account: tempAccount
    }, process.env.JWT_SECRET_KEY)

    return {
        ...tempAccount,
        token
    }
}

const postRegister = (req, res) => {
    // bcrypt returns a promise
    return bcrypt.hash(req.password, 10)
        .then(hash => {
            // TODO: 1) check if account is in db 
            // TODO: 2) create account and add to db

            return mssql.executeProc("Create_Account", sqlRequest => {
                    sqlRequest.addParameter("email", TYPES.VarChar, req.email);
                    sqlRequest.addParameter("password", TYPES.VarChar, hash)
                })
                .then(response => {
                    console.log("RESPONSE RESULT SETS", response.resultSets[0][0])
                    return response.resultSets[0][0]
                })
        })
}

module.exports = {
    postRegister,
    postLogin,
    getMessage
}