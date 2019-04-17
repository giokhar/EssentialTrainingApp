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
        <div id="title">Hash <br />Generator</div>
        <div className="HashGenerator">
          <div id="hashGeneratorForm">
        
            <div>
              <div id="text">Number of Students </div>
              <input
                id="textInput"
                value={this.state.number_of_students}
                onChange={e => {
                  this.setState({ number_of_students: e.target.value });
                }}
              />
            </div>

            <div>
              <div id="text"> Course ID </div>
              <input
                id="textInput"
                value={this.state.course_id}
                onChange={e => {
                  this.setState({ course_id: e.target.value });
                }}
              />
            </div>
          </div>
          <div id="generateButton" onClick={() => { this.getHashes(); }}> Generate Hashes </div>
          HASHGENERATOR IS HERE
        </div>
      </BrowserRouter>
    );
  }
}

export default HashGenerator;
