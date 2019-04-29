import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { getList, addToList, updateItem, get_courses, get_students_by_id,get_quizzes_by_course } from "./ApiFunctions/httpApi";
import "./Styles/courses.css";
import Sidebar from "./Sidebar";


class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number_of_students: '',
            course_id: '',
            courses: ['fwf', 'eff'],
            dataShown: 'course_list'
        }
    }

    
    authenticate(course_id) {
        let { history } = this.props;
        history.push({
            pathname: '/quiz_by_course',
            course_id: course_id,
        });
    }


    componentDidMount() {
        var courseList = get_courses();
        courseList.then(data => { this.setState({ courses: data }) });
        courseList.then(data => { console.log(data) });
    }

    render() {
        return (
            <BrowserRouter>
                <Sidebar />
                <div>
                    fwrfwf
                    <div id="CoursesContainer">
                        <div id="title_font">Statistics</div>
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

export default Statistics;
