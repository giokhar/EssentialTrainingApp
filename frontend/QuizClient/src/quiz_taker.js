import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Quizzes from "./quizzes";
//import { get_quizzes } from "./api_functions/http_api";
import "./styles/quiz_taker.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from 'react-modal';


// {"student_hash":"cs-128-spring-2019-200621840961614167", "quiz_id":1, "results_json":"{\"1\":{\"no_of_questions_asked\":15,\"no_incorrect\":5,\"done\":1}, \"2\":{\"no_of_questions_asked\":7,\"no_incorrect\":3,\"done\":1}}", "num_questions":5, "num_incorrect":2, "completed":1, "passed":1, "start_time":"2019-04-14T22:16:55.906695Z", "end_time":"2019-04-14T22:16:55.906695Z"}

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
            no_of_questions_asked: '',
            no_incorrect: '',
            modalIsOpen: false,
        }
    }

    async componentWillMount() {
        console.log("============")
        console.log(this.props.location.quiz_id)
        console.log("================")
        await axios.get("http://essential-training-app-api.herokuapp.com/api/quizzes/"+this.props.location.quiz_id+"/?format=json")
            .then(response => {
                this.setState({ quiz_details: (response.data) }, () => { this.setState({ refresh: !this.state.refresh }); });
            })
            .catch(function (error) {
                console.log(error);
            })

        if (this.state.quiz_details.questions != null || this.state.quiz_details != undefined) {
            await this.setState({
                question_id: (this.state.quiz_details.questions.map((item)=>{return (item.template_id)})),
                questions_correct: (this.state.quiz_details.questions.map((item)=>{return (item.amount)})),
            })
        }
    }

    get_new_question(template_id) {
        if (template_id !== undefined) {
            axios.get("http://essential-training-app-api.herokuapp.com/api/question/new/" + template_id.toString() + "/?format=json")
                .then(response => {
                    this.setState({ question_stack: response.data.text, solution: response.data.solution_list })
                    return response.data.text
                })
                .catch(function (error) {
                })
        }
    }

    render_question() {
        console.log(this.state.questions_correct[this.state.solution_index]);
        if (this.state.questions_correct[this.state.solution_index] !== 0 && this.state.question_id !== undefined) {
            return (this.get_new_question(this.state.question_id[this.state.solution_index]))
        }
        else {
            this.setState({ solution_index: this.state.solution_index + 1, refresh: !this.state.refresh }, () => {
                this.get_new_question(this.state.question_id[this.state.solution_index])
            })
        }
    }

    set_correct() {
        var temp = this.state.questions_correct;
        temp[this.state.solution_index] = temp[this.state.solution_index] - 1
        this.setState({ questions_correct: temp })
    }


    quiz_finish_listner() {
        var arr_zero = Array(this.state.questions_correct.length).fill(0);
        if (JSON.stringify(this.state.questions_correct) === JSON.stringify(arr_zero)) {
            this.setState({ modalIsOpen: true })
        }

    }


    render_modal() {
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
            >
                <div> Quiz Finished! </div>
                <div onClick={() => { this.setState({ modalIsOpen: false }) }}>
                    close
                </div>
            </Modal>)
    }


    initialize_quiz() {
        if (this.state.solution_input.toString() == this.state.solution[this.state.solution_index]) {
            alert("Correct Answer");
            this.setState({ solution_input: '' });
            this.set_correct();
            this.render_question();
            console.log('the solution index is:');
            console.log(this.state.solution_index);
        }
        else {
            alert("Incorrect-the real solution is " + this.state.solution[this.state.solution_index])
            this.setState({ solution_input: '' });
            this.render_question();
        }
        this.quiz_finish_listner();
    }


    render_correct_answers() {
        return (
            this.state.questions_correct.map((item, index) => {
                return (
                    <div id="scores">{item}</div>
                )
            })
        )
    }

    render() {
        return (
            <div id="main_container">
                <div>
                  
                </div>
                <div id="left_bar"> {this.render_correct_answers()} </div>
                {this.render_modal()}
                <div id="right_bar">
                <div id="next_button" onClick={() => { this.render_question() }}>Next</div>
                </div>
                <div id="question_container">
                    <div id="question_answer">
                        <div id="question_text">  {this.state.question_stack} </div>
                        <input id="input" placeholder={"Insert Answer Here"} value={this.state.solution_input} onChange={(e) => { this.setState({ solution_input: e.target.value }) }} />
                        <div id="submit_buttom" onClick={() => { this.initialize_quiz() }}>Submit</div>
                    </div>
                </div>
               
               
                The solution is
                {this.state.solution[this.state.solution_index]}
            </div>
        );
    }
}

export default Quiz_taker;
