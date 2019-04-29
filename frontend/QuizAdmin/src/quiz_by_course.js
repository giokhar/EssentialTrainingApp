import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { getList, addToList, updateItem, get_courses, get_students_by_id, get_quizzes_by_course } from "./ApiFunctions/httpApi";
import "./Styles/courses.css";
import Sidebar from "./Sidebar";
import axios from "axios";


class Quiz_by_course extends Component {
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

     
    authenticate(quiz_id) {
        let { history } = this.props;
        history.push({
            pathname: '/quiz_logs',
            quiz_id: quiz_id,
        });
    }


    
    async componentWillMount() {
        console.log(this.props.location.course_id);
        await axios.get("http://essential-training-app-api.herokuapp.com/api/quizzes/course/" + this.props.location.course_id + "/?format=json")
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
                        <div id="title_font">Coursesssssssss</div>
                        <div id="CoursesContainerInternal">
                            {this.state.courses.map((item, index) => {
                                    return (
                                        <div onClick={() => { this.authenticate(item.id) }} id="CourseButtons">
                                            {item.title}
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

export default Quiz_by_course;
