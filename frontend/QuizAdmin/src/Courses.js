import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { getList, addToList, updateItem, get_courses } from "./ApiFunctions/httpApi";
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

    get_students(){
        
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
                            <div onClick={()=>{this.get_students()}} id="mathButtons"> {item.title} </div>
                        )
                    })}
                </div>
            </BrowserRouter>
        );
    }
}

export default Courses;
