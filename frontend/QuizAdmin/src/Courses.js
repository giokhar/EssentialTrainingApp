import React, { Component } from 'react';
import { BrowserRouter, Route,  } from 'react-router-dom';
import { getList, addToList, updateItem, get_courses, get_students_by_id } from "./ApiFunctions/httpApi";
import "./Styles/courses.css";
import Sidebar from "./Sidebar";
import QuizMaker from './QuizMaker';




class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number_of_students: '',
            course_id: '',
            courses: ['fwf', 'eff'],
            dataShown: 'course_list',
            redirect:false
        }
       this.stop_reload = this.stop_reload.bind(this);
    }



     stop_reload() {
            this.props.history.push('/QuizMaker');
     }

     
      componentDidMount() {
        var courseList = get_courses();
        courseList.then(data => { this.setState({ courses: data }) });
        courseList.then(data => { console.log(data) });
        // window.addEventListener('beforeunload', this.stop_reload());
       
      }
      
    
      componentWillUnmount() {
          this.stop_reload();
       //  window.removeEventListener('beforeunload', this.stop_reload());
    }
      
         

    get_students(course_id) {
        get_students_by_id(course_id).then(response => { this.setState({ courses: response.data, dataShown: 'student_list' }) });
    }
 

    render() {
        return (
            <BrowserRouter>
                <Sidebar />
                <div>
                    <div id="CoursesContainer">
                        <div onClick={()=>{this.test()}} id="title_font">COURSES</div>
                        <div id="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                 quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                 Duis aute irure dolor in reprehenderit in volupta</div>
                        <div id="CoursesContainerInternal">
                            {this.state.courses.map((item, index) => {
                                if (this.state.dataShown == "course_list") {
                                    return (
                                        <div onClick={() => { this.get_students(item.id) }} id="CourseButtons">
                                            {item.title}
                                        </div>
                                    )
                                }

                                else {
                                    return (
                                        <div id="CourseButtons">
                                            {item}
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Courses;
