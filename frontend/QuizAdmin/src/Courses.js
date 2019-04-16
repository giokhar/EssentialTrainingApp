import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { getList, addToList, updateItem, get_courses,get_students_by_id } from "./ApiFunctions/httpApi";
import "./Styles/courses.css";


class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number_of_students: '',
            course_id: '',
            courses: ['fwf', 'eff'],
        }
    }

    get_students(course_id){
        console.log(get_students_by_id(course_id))
    }

    componentDidMount() {
        var courseList = get_courses();
        courseList.then(data => { this.setState({ courses: data }) });
        courseList.then(data => { console.log(data) });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="Courses">
                    {this.state.courses.map((item, index) => {
                        return (
                            <div onClick={()=>{this.get_students(item.id)}} id="mathButtons"> {item.title} </div>
                        )
                    })}
                </div>
            </BrowserRouter>
        );
    }
}

export default Courses;
