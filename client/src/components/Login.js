import React from "react";
import axios from "axios";

const API = "/api/account/login";

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data: null
        }
    }

    componentDidMount(){
        axios.post(API)
            .then(LoginResponse => {
                console.log(LoginResponse)
                this.setState({
                    data: LoginResponse.data
                })
            })
    }

     render() {
         return(
              <div>
              </div>
         );
     }
}

export default Login;