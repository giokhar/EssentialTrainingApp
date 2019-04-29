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
         return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
};



export const get_courses = () => {
  return axios
    .get(backendUrl + "courses/?format=json", {
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
    .get(backendUrl + "students/course/" + course_id + "/?format=json", {
      headers: {
        "Content-Type": "application/json"
      } //Let backend know that the data is JSON object.
    })
    .then(response => {
      return (response) //Return data if the function call was successful.
    }).catch(error => {
    });
};


export const get_quizzes_by_course = (course_id) => {
  return axios
    .get(backendUrl + "quizzes/course/" + course_id + "/?format=json", {
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
    .get(backendUrl + "question/templates/?format=json", {
      headers: {
        "Content-Type": "application/json"
      } //Let backend know that the data is JSON object.
    })
    .then(response => {
      return (response) //Return data if the function call was successful.
    }).catch(error => {
    });
};




export const create_question_template = (type, inputs, outputs, input_type, text, output_template, variable_ranges, variable_type) => {

  var x = { "type": type, "template_json": { "inputs": inputs, "outputs": outputs, "input_type": input_type, "text": text, "output_template": output_template, "variable_ranges": variable_ranges, "variable_type": variable_type } }

  var acc = ""
  var y = JSON.stringify(x.template_json);
  for (var i = 0; i < y.length; i++) {
    if (y[i] == "\"") {
      acc = acc + "\\\""
    }
    else {
      acc = acc + y[i]
    }
  }


  x.template_json = y
  console.log(JSON.stringify(x));

  return axios.post(backendUrl + "create/question_template/",
    JSON.stringify(x)
    , {
      headers: {
        'Content-Type': "application/json"
      } //Let backend know that the data is JSON object.
    })
    .then(response => {
      console.log(response)
      return (response) //Return data if the function call was successful.
    })
    .catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}


export const create_quiz = (title,question_json,course_id) => {
  //Take in name,text,image and date as parameter and send it to the backend.
  var temp_obj =  { 
    "title": title,
   "question_json": question_json, 
   "is_published": 1, 
   "course_id": 1 
  }

  console.log(JSON.stringify(temp_obj))
  return axios.post(backendUrl + "create/quiz/",

   JSON.stringify(temp_obj), {
      headers: {
        'Content-Type': "application/json"
      } //Let backend know that the data is JSON object.
    })
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    })
    .catch(error => {
      return (error.data)
      alert(error.response);
      console.log(error.response) //Log the error on the console if there was an error.
    });
};