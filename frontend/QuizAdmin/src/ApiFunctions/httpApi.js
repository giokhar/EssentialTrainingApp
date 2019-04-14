//module imports
import axios from "axios";

//http://essential-training-app-api.herokuapp.com/api/hashes/<int:amount>/<int:course_id>


//var that contains the URL to the backend.
var backendUrl = "http://essential-training-app-api.herokuapp.com/api";

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

//Calls the end-point to send the data to the backend.
export const addToList = (name, text, image, date) => {
  //Take in name,text,image and date as parameter and send it to the backend.
  return axios.post(backendUrl + "/create/quiz/",
    {
      name: name,
      text: text,
      image: image,
      date: date,
    }, {
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

//Calls the end-point to update the number of likes and dislikes.
export const updateItem = (id, numberLikes, numberDislikes) => {
  //Use the post id to update likes or dislikes on a certain post.
  return axios
    .put(
      backendUrl + "/posts/" + `${id}/update`,
      {
        likes: numberLikes,
        dislikes: numberDislikes,
      },
      {
        headers: { 
          "Content-Type": "application/json"
        } //Let backend know that the data is JSON object.
      })
    .then(function (response) {
      return (response) //Return data if the function call was successful.
    })
    .catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
};

