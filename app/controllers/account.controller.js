const accountService = require("../services/account.service")

const getMessage = async (req, res) => {
    accountService.getMessage(res)
    .then( resp => res.json(resp))
}

const postRegister = (req, res) => {
    accountService.postRegister(req.body, res)
    .then(userInfo => {
        console.log("USER INFO IN REGISTER CONTROLLER", userInfo)
        res.status(201).json({
            message: "status 201, successfully posted to register (but not really...), should have user info in this json response",
            userInfo
        })
    })
    .catch(err => { 
        res.set(500).send(err)
    })
}


const postLogin = (req, res) => {
    accountService.postLogin(req.body, res)
    .then(userInfo => {
        console.log("USER INFO IN LOGIN CONTROLLER", userInfo)
        res.status(201).json((userInfo))
    })
    .catch(err => { 
        res.set(500).send(err)
    })
}


module.exports = {
    postRegister,
    postLogin, 
    getMessage
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

 