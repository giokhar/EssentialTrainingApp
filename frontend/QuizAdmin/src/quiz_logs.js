import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { getList, addToList, updateItem, get_courses, get_students_by_id, get_quizzes_by_course } from "./ApiFunctions/httpApi";
import "./Styles/courses.css";
import Sidebar from "./Sidebar";
import axios from "axios";


class Quiz_logs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number_of_students: '',
            course_id: '',
            courses: ['fwf', 'eff'],
            dataShown: 'course_list',
            refresh:true,
        }
    }

      

    async componentWillMount() {
        console.log(this.props.location.course_id);
        //http://essential-training-app-api.herokuapp.com/api/logs/quiz/1/?
        await axios.get("http://essential-training-app-api.herokuapp.com/api/logs/quiz/" + this.props.location.quiz_id + "/?format=json")
            .then(response => {
                console.log(response)
                this.setState({ courses: (response.data) }, () => { this.setState({ refresh: !this.state.refresh }); });
            })
            .catch(function (error) {
                console.log(error);
            })

        }

    get_students(course_id) {
        get_quizzes_by_course(course_id).then(response => { this.setState({ courses: response.data, dataShown: 'student_list' }) });
    }

    render() {
        return (
            <BrowserRouter>
                <Sidebar />
                <div>
                    fwrfwf
                    <div id="CoursesContainer">
                        <div id="title_font">logs logs logs logs</div>
                        <div id="CoursesContainerInternal">
                            {this.state.courses.map((item, index) => {
                                    return (
                                        <div id="CourseButtons">
                                         <div>   {item.num_questions} </div>
                                         <div>     {item.num_incorrect} </div>
                                         <div>    {item.completed} </div>
                                         <div>    {item.passed} </div>
                                         <div>   {item.start_time} </div>
                                         <div>   {item.end_time} </div>
                                        </div>
                                    )
                            })}
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Quiz_logs;
