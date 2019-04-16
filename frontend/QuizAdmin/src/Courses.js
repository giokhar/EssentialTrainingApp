import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { getList, addToList, updateItem, get_courses,get_students_by_id } from "./ApiFunctions/httpApi";
import "./Styles/courses.css";
import Sidebar from "./Sidebar";


class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number_of_students: '',
            course_id: '',
            courses: ['fwf', 'eff'],
            dataShown:'course_list'
        }
    }

    get_students(course_id){
        get_students_by_id(course_id).then(response=>{this.setState({courses:response.data, dataShown:'student_list'})});
    }

    componentDidMount() {
        var courseList = get_courses();
        courseList.then(data => { this.setState({ courses: data }) });
        courseList.then(data => { console.log(data) });
    }

    render() {
        return (
            <BrowserRouter>
               <Sidebar/>
                <div className="Courses">
                    {this.state.courses.map((item, index) => {
                         if (this.state.dataShown == "course_list"){
                             return(
                            <div onClick={()=>{this.get_students(item.id)}} id="mathButtons">
                              {item.title}
                                </div>
                             )}

                             else{
                                 return (
                                    <div onClick={()=>{this.get_students(item.id)}} id="mathButtons">
                              {item}
                                    </div>
                                 )
                             }
                    })}
                </div>
            </BrowserRouter>
        );
    }
}

export default Courses;
