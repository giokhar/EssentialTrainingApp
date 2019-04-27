import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { get_quizzes } from './api_functions/http_api'
import axios from "axios";
import "./styles/quizzes.css";
import { withRouter } from 'react-router-dom';

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

    take_quiz(quiz_id_param) {
        let { history } = this.props;
        history.push({
            pathname: '/quiz_taker',
            quiz_id: quiz_id_param,
            student_hash: this.props.location.hash.slice(1),
        });
    }


    render_new_quizzes() {
        if (this.state.quizzes.new !== undefined || this.state.quizzes !== '') {
            return (
                this.state.quizzes.new.map((item) => {
                    return (
                        <div onClick={() => { this.take_quiz(item.id) }} id="quiz_list">
                            <div id="quiz_title"> {item.title}  </div>
                            <div id="quiz_date"> {item.created_on.slice(0,10)} </div>
                        </div>
                    )
                })
            )
        }
    }


    render_old_quizzes() {
        if (this.state.quizzes.old !== undefined || this.state.quizzes !== '') {
            return (
                this.state.quizzes.old.map((item) => {
                    return (
                        <div onClick={() => { this.take_quiz(item.id) }} id="quiz_list_old">
                            <div id="quiz_title"> {item.title}  </div>
                            <div id="quiz_date_old"> {item.created_on.slice(0,10)} </div>
                        </div>
                    )
                })
            )
        }
    }


    render() {
        console.log(this.state.quizzes)
        return (
            <BrowserRouter>
                <div id="quizzes_main_container">

                    <div id="quizzes_left_panel">
                        <div id="app_name">ESSENTIAL <br/> TRAINING <br/> APP</div>
                        <div></div>
                        <div id="quizzes_logout_button">Logout</div>
                    </div>

                    <div id="quiz_container">
                        <div id="quizzess_title_text"> QUIZZES </div>

                        <div id="quiz_list_container">
                            <div id="new_quiz_container">
                                <div id="new_quizzes_title_text">New Quizzes</div>
                                <div id="new_quiz_list"> {this.render_new_quizzes()}  </div>
                            </div>

                            <div id="old_quiz_container">
                                <div id="old_quizzes_title_text">Old Quizzes</div>
                                <div id="old_quiz_list">{this.render_old_quizzes()}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </BrowserRouter>

        );
    }
}

export default withRouter(Quizzes);
