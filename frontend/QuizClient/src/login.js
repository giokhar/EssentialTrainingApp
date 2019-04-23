import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Quizzes from "./quizzes";
//import { get_quizzes } from "./api_functions/http_api";
import "./styles/login.css";
import { withRouter } from 'react-router-dom';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student_hash:""
        }
    }


    authenticate() {
        let { history } = this.props;
        history.push({
         pathname: '/quizzes',
         hash: this.state.input_value,
        });
    }
 

 

    render() {
        return (
            <div>
                <Route
                    path="/quizzes"
                    render={(props) => <Quizzes {...props} isAuthenticated={"ffe"} />}
                />
                Enter Student Hash
                <input value={this.state.input_value} onChange={(e) => this.setState({input_value:e.target.value})} />

                <button onClick={()=>{this.authenticate()}} >
                Click Me
            </button>
                <div>
                    
                        Login
              
                </div>

            </div>
        );
    }
}

export default withRouter(Login);

