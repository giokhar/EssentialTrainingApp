import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Quizzes from "./quizzes";
//import { get_quizzes } from "./api_functions/http_api";
import "./styles/login.css";
import { Link } from "react-router-dom";
import axios from "axios";



class Quiz_taker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student_hash: "",
            quiz_details: "",
            refresh: false,
            index: 0,
            question_id: [],
            questions_correct: [],
            question_stack: '',
            solution_input: '',
            solution: [],
            solution_index: 0,
            no_of_questions_asked:'',
            no_incorrect:'',

        }
    }

    async componentWillMount() {
        await axios.get("http://essential-training-app-api.herokuapp.com/api/quizzes/2/?format=json")
            .then(response => {
                this.setState({ quiz_details: (response.data) }, () => { this.setState({ refresh: !this.state.refresh }) });
            })
            .catch(function (error) {
                console.log(error);
            })

        if (this.state.quiz_details.questions != null) {
            await this.setState({
                question_id: Object.keys(this.state.quiz_details.questions),
                questions_correct: Object.values(this.state.quiz_details.questions),
            })
        }
    }

    get_new_question(template_id) {
        if (template_id !== undefined) {
            axios.get("http://essential-training-app-api.herokuapp.com/api/question/new/" + template_id.toString() + "/?format=json")
                .then(response => {
                    this.setState({ question_stack: response.data.text, solution: response.data.solution_list })
                    console.log(response.data)
                    return response.data.text
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    render_question() {
        console.log(this.state.questions_correct[this.state.solution_index]);
        if (this.state.questions_correct[this.state.solution_index] !== 0 && this.state.question_id !== undefined) {
            return (this.get_new_question(this.state.question_id[this.state.solution_index]))
        }
        else {
            this.setState({ solution_index: this.state.solution_index+1, refresh:!this.state.refresh },
                this.get_new_question(this.state.question_id[this.state.solution_index])) 
        }
    }

    set_correct() {
        var temp = this.state.questions_correct;
        temp[this.state.solution_index] = temp[this.state.solution_index] - 1
        this.setState({ questions_correct: temp })
    }

    render() {
        console.log(this.state.questions_correct)
        return (
            <div>
                <div>
                    {this.state.questions_correct.map((item, index) => { return item })}
                </div>

                {this.state.question_stack}
                <div onClick={() => { this.render_question() }}>Next</div>
                Insert Answer Here
                <input onChange={(e) => { this.setState({ solution_input: e.target.value }) }} />
                <div onClick={() => {
                    if (this.state.solution_input.toString() == this.state.solution[this.state.solution_index]) {
                        alert("Correct Answer");
                        this.setState({ solution_input: '' })
                        this.set_correct();
                        this.render_question()
                        console.log('the solution index is:')
                        console.log(this.state.solution_index);
                    }
                    else {
                        alert("Incorrect-the real solution is " + this.state.solution[this.state.solution_index])
                        this.setState({ solution_input: '' })
                        this.set_correct();
                        this.render_question()
                    }
                }}>Submit</div>
                The solution is
                {this.state.solution[this.state.solution_index]}
            </div>
        );
    }
}

export default Quiz_taker;
