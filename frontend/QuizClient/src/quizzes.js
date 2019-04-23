import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { get_quizzes } from './api_functions/http_api'
import axios from "axios";
import "./styles/quizzes.css";

//http://essential-training-app-api.herokuapp.com/api/quizzes/student/cs-128-spring-2019-110253530030518616/?format=json

//cs-128-spring-2019-110253530030518616
class Quizzes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: ''
        }


        this.render_new_quizzes = this.render_new_quizzes.bind(this);
    }

    async componentWillMount() {
        this.get_quiz_details();
    }

    componentDidMount() {
        this.get_quiz_details();
    }

    get_quiz_details() {
        axios.get("http://essential-training-app-api.herokuapp.com/api/quizzes/student/" + this.props.location.hash.slice(1) + "/?format=json")
            .then(response => {
                this.setState({ quizzes: (response.data) });
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    render_new_quizzes() {
        console.log(this.state.quizzes)
        if (this.state.quizzes.new !== undefined || this.state.quizzes !== '') {
            return (
                this.state.quizzes.new.map((item) => { 
                    return (
                        <div id="quiz_title">item.title </div>
                        ) 
                })
            )
        }
    }


    render() {
        console.log(this.state.quizzes)
        return (
            <BrowserRouter>
               {this.render_new_quizzes()}
            </BrowserRouter>
        );
    }
}

export default Quizzes;
