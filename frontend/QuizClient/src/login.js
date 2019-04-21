import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import "./styles/login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
        }
    }

  
    render() {
        return (
            <BrowserRouter>
                Login is Here
                <div id="hash_input_container">
                <input/>
                    </div>
            </BrowserRouter>
        );
    }
}

export default Login;
