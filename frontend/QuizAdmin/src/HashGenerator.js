import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { getList, addToList, updateItem } from "./ApiFunctions/httpApi";
import Sidebar from "./Sidebar";
import "./Styles/HashGenerator.css";

class HashGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number_of_students: "",
      course_id: "",
    };
  }

  getHashes() {
    //console.log(getList());
    console.log(addToList());
  }

  render() {
    return (
      <BrowserRouter>
        <Sidebar />
        <div id="hash_generator_container">
          <div id="title">HASH <br />GENERATOR</div>
          <div className="HashGenerator">
            <div id="hashGeneratorForm">

              <div>
                <div id="text"> Course ID  </div>
                <input
                  id="textInput"
                  placeholder={"Enter the course ID"}
                  value={this.state.course_id}
                  onChange={e => {
                    this.setState({ course_id: e.target.value });
                  }}
                />
              </div>

              <div>
                <div id="text">Number of Students </div>
                <input
                placeholder={"Enter the number of students"}
                  id="textInput"
                  value={this.state.number_of_students}
                  onChange={e => {
                    this.setState({ number_of_students: e.target.value });
                  }}
                />

              </div>
            </div>
            <div id="generateButton" onClick={() => { this.getHashes(); }}> Generate Hashes </div>
         </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default HashGenerator;
