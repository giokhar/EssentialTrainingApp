import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { getList, addToList, updateItem } from "./ApiFunctions/httpApi";

class HashGenerator extends Component {
    constructor(props){
        super(props);
        this.state = {
            number_of_students:'',
            course_id:''
        }
    }


getHashes(){
    console.log(getList());
    }

  render() {
    return (
        <BrowserRouter>
      <div className="HashGenerator">


      <div> Enter Number of Students
          <input 
           value={this.state.number_of_students}
           onChange={(e) => { this.setState({ number_of_students: e.target.value }) }} /> 
      </div>

      <div> Enter Course ID
          <input 
           value={this.state.course_id}
           onChange={(e) => { this.setState({ course_id: e.target.value }) }} /> 
      </div>

<div onClick={()=>{this.getHashes()}}>
Generate Hashes
</div>

      HASHGENERATOR IS HERE
      </div>
      </BrowserRouter>
    );
  }
}

export default HashGenerator;
