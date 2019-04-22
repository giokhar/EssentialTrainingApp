import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {get_quizzes} from './api_functions/http_api'
import axios from "axios";
import "./styles/quizzes.css";

//http://essential-training-app-api.herokuapp.com/api/quizzes/student/cs-128-spring-2019-110253530030518616/?format=json

//cs-128-spring-2019-110253530030518616
class Quizzes extends Component {
    constructor(props) {
        super(props);
        this.state = {
        quizzes:''
        }
    }

    componentDidMount(){
        axios.get("http://essential-training-app-api.herokuapp.com/api/quizzes/student/"+this.props.location.state.hash+"/?format=json")
        .then(response => {
          this.setState({ quizzes: (response.data.all) });
        })
        .catch(function (error) {
          console.log(error);
        })
       
    }
  
    render() {
       var quiz_list=[];
       for(var i  = 0; i<this.state.quizzes.length; i++ ){
        quiz_list.push(this.state.quizzes[i]);
    }
     
        return (
            <BrowserRouter>
                {quiz_list.map((item,index)=>{return (
                    <div id="quiz_list">{item.title}</div>
                    )})}
            </BrowserRouter>
        );
    }
}

export default Quizzes;
