//module imports
import axios from "axios";

//http://essential-training-app-api.herokuapp.com/api/hashes/<int:amount>/<int:course_id>


//var that contains the URL to the backend.
var backendUrl = "http://essential-training-app-api.herokuapp.com/api/";
 


export const get_quizzes = (student_hash, callback) => {
 
  console.log(backendUrl+ "quizzes/student/"+student_hash+"/?format=json");
  return axios
    .get(backendUrl+ "quizzes/student/"+student_hash+"/?format=json", {
      headers: { 
        "Content-Type": "application/json" 
      } //Let backend know that the data is JSON object.
    })
    .then(getResponse => { 
      callback(getResponse.data);}) //Return data if the function call was successful.
    .catch(error => {
    });
};


 