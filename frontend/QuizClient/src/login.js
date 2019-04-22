import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Quizzes from "./quizzes";
//import { get_quizzes } from "./api_functions/http_api";
import "./styles/login.css";
import { Link } from "react-router-dom";



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student_hash:""
        }
    }


    authenticate(e) {
        this.setState({student_hash:e.target.value})
        console.log(this.state.student_hash)
    }



    render() {
        return (
            <div>
                <Route
                    path="/quizzes"
                    render={(props) => <Quizzes {...props} isAuthenticated={"ffe"} />}
                />
                Enter Student Hash
                <input onChange={(e) => this.authenticate(e)} />

    <div>
        Incorrect Hash
    </div>

                <div>
                    <Link to={{ pathname: "/quizzes", state: { hash: (this.state.student_hash) } }}>
                        Login
                    </Link>
                </div>

            </div>
        );
    }
}

export default Login;
