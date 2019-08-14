const accountService = require("../services/account.service")

//example of a protected route/controller/service
const getMessage = async (req, res) => {
    accountService.getMessage(req.token)
        .then(resp => res.status(201).json(resp))
        .catch(err => res.status(500).json(err))
}

const postRegister = (req, res) => {
    accountService.postRegister(req.body, res)
        .then(accountInfo => {
            console.log("account INFO IN REGISTER CONTROLLER", accountInfo)
            res.status(201).json({
                message: "CONTROLLER LEVEL: successfully posted to register (but not really...), should have account info in this json response",
                accountInfo
            })
        })
        .catch(err => {
            res.set(500).send(err)
        })
}


const postLogin = (req, res) => {
    accountService.postLogin(req.body)
        .then(accountInfo => {
            console.log("account INFO IN LOGIN CONTROLLER", accountInfo)
            res.status(201).json({
                message: "CONTROLLER LEVEL FOR postLogin, with accountInfo below, should have the token which will be stored in localstorage",
                accountInfo
            })
        })
        .catch(err => {
            res.set(500).send(err)
        })
}

// A request was made to a protected route.
// This function verifies there is a token in the header.
// Header Format ==> { Authorization: Bearer <token> }
const verifyToken = (req, res, next) => {
    //Get auth header value
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        // split and get token from header
        const bearerToken = bearerHeader.split(' ')[1]

        // req.token will be added to the next function's request
        req.token = bearerToken // set the token
        next() // next middleware 
    } else {
        //Forbidden
        res.sendStatus(403)
    }
}

module.exports = {
    postRegister,
    postLogin,
    getMessage,
    verifyToken
}

// module.exports = {
//     getAll,




// const request = (method) =>  async (url, body) => {

//     try {
//         token = await AsyncStorage.getItem('token')

//         return fetch(url, {
//                     method: method,
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Accept': 'applicatin/json',
//                         'Authorization': `Bearer ${token}` 
//                     },
//                     body: JSON.stringify(body)
//                 })
//                 .then(resp => resp.json())

//     } catch (error){
//         alert(error.message)
//     }

//     }

// export const server = {
//     get: request('GET'),
//     patch: request('PATCH'),
//     post: request('POST'),
//     delete: request('DELETE'),
// }