//module imports
import axios from "axios";

//http://essential-training-app-api.herokuapp.com/api/hashes/<int:amount>/<int:course_id>


//var that contains the URL to the backend.
var backendUrl = "http://essential-training-app-api.herokuapp.com/api/";

//Calls the end-point to get the data from the backend.
export const getList = () => {
  return axios
    .get("http://essential-training-app-api.herokuapp.com/api/hashes/23/21/", {
      headers: { 
        "Content-Type": "application/json" 
      } //Let backend know that the data is JSON object.
    })
    .then(response => { 
     console.log("=========")
      console.log(response.data)
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
};



export const get_courses = () => {
  return axios
    .get(backendUrl+ "courses/?format=json", {
      headers: { 
        "Content-Type": "application/json" 
      } //Let backend know that the data is JSON object.
    })
    .then(response => { 
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
    });
};


export const get_students_by_id = (course_id) => {
  return axios
    .get(backendUrl+ "students/course/"+ course_id +"/?format=json", {
      headers: { 
        "Content-Type": "application/json" 
      } //Let backend know that the data is JSON object.
    })
    .then(response => { 
      return (response) //Return data if the function call was successful.
    }).catch(error => {
    });
};


export const get_question_templates = () => {
  return axios
    .get(backendUrl+ "question/templates/?format=json", {
      headers: { 
        "Content-Type": "application/json" 
      } //Let backend know that the data is JSON object.
    })
    .then(response => { 
      return (response) //Return data if the function call was successful.
    }).catch(error => {
    });
};



//Calls the end-point to send the data to the backend.
export const addToList = () => {
  //Take in name,text,image and date as parameter and send it to the backend.
  return axios.post(backendUrl + "/create/quiz/",

  { "title":"New Quiz", "question_json":"{'1':5,'2':9}", "is_published":1, "course_id":2 }, {
      headers: {
        'Content-Type': "application/json"
      } //Let backend know that the data is JSON object.
    })
    .then(response => {
      return (response) //Return data if the function call was successful.
    })
    .catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}

