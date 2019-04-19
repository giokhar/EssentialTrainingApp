import React, { Component } from 'react';
import './Styles/App.css';
import "./Styles/quizMaker.css";
import AutosizeInput from 'react-input-autosize';
import Modal from 'react-modal';
import { DropdownMultiple, Dropdown } from 'reactjs-dropdown-component';
//import { createStackNavigator, createAppContainer } from 'react-navigation';
import { BrowserRouter, Route } from 'react-router-dom';
import { get_courses, get_question_templates } from "./ApiFunctions/httpApi";
import Sidebar from './Sidebar';
import { Select, AsyncSelect, MultiSelect } from 'dropdown-select';
import 'dropdown-select/dist/css/dropdown-select.css';


{/*
  question_template = {
    "inputs":["a","b"], 
    "outputs":["a+b", "a-b"],
    "input_type":"regular",
    "text":"I have $ apples, somebody gave me $ apples. How many apples do I have?",
    "output_template":"A = <$, $>",
    "variable_ranges":[[1,3],[5,7]], 
    "variable_type": "bla"}
*/}
//http://essential-training-app-api.herokuapp.com/api/courses/?format=json

class QuizMaker extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      selectedTemplateList:[""],
      counter: "sfs", test: "",
      object: <input></input>,
      inputs: ['Enter text here'],
      text: '',
      newText: "",
      refresh: false,
      variableNumber: 0,
      outputArray: '',
      outputs: [""],
      selectedOutput: 0,
      modalIsOpen: true,
      quizTitle: '',
      quizTypes: [],
      finalQuiz: [],
      courses: [{ title: 'CS 228' }, { title: 'CS 310' }],
      backendInput: [],
      valueRanges:[],
      variableType: "",
      y: [],
      templates:'',
      minVarRange:'',
      maxVarRange:'',
      selectedCourse: "",
      variableTypeList: [
        {
          id: 0,
          title: 'Whole Numbers',
          selected: false,
          key: 'variableTypeList'
        },
        {
          id: 1,
          title: 'Negative Numbers',
          selected: false,
          key: 'variableTypeList'
        },
        {
          id: 2,
          title: 'Natural Numbers',
          selected: false,
          key: 'variableTypeList'
        }
      ]


    };

    this.x = [];
    // this.addTag = this.addTag.bind(this);
    this.appendToArray = this.appendToArray.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
     this.handleTemplateDropdown = this.handleTemplateDropdown.bind(this);
  }


  resetThenSet = (id, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]));
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      [key]: temp
    });

    this.setState({ variableType: temp[id].title });
  }



  resetThenSetCourses = (id, key) => {
    this.setState({ selectedCourse: this.state.courses[id - 1].title })
  }


  resetThenSetTemplates = (id, key) => {
    //this.setState({ templates: this.state.courses[id - 1].title })
  }


  componentDidMount() {
    var courseList = get_courses();
    console.log(courseList.then(data => { this.setState({ courses: data }) }))
var temp;
    var templateList = get_question_templates();
    templateList.then(data=>{console.log(data.data.map((item,index)=>{return (item.type)})
      
      )})
    console.log("=============================");
    console.log("=============================");
    templateList.then(data => { console.log((data.data[0].type)) })
    templateList.then(data => { this.setState({templates:data.data[0].type}) })

    console.log("?????????")
    console.log(this.state.selectedTemplateList)
    console.log("?????????")
   

  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }


  getVariables() {
    let x = this.state.inputs.filter((element, index) => {
      return index % 2 != 0;
    })

    console.log("=-=-=-=-=-=-=-=-=-=-=-=")
    console.log(x)
    console.log("=-=-=-=-=-=-=-=-=-=-=-=")

    return x;
  }

  getQuizText() {
    let x = this.state.inputs.filter((element, index) => {
      return index % 2 === 0;
    });

    console.log("=-=-=-=-=-=-=-=-=-=-=-=")
    console.log(x.join(" $ "))
    console.log("=-=-=-=-=-=-=-=-=-=-=-=")
    return x.join(" $ ");
  }

 
handleTemplateDropdown(event){
  this.setState({selectedTemplateList:this.state.selectedTemplateList.concat(event)})
}


  appendToArray(ex) {
    var newInput = 'input-${this.state.inputs.length}';
    this.setState({ newText: this.state.newText + this.state.text })
    console.log(this.state.inputs)


    switch (ex) {
      case "string":
        this.setState({ inputs: this.state.inputs.concat(["string"]) });
        break;
      case "sqrt":
        this.setState({ variableNumber: this.state.variableNumber + 1, inputs: this.state.inputs.concat(["a" + this.state.variableNumber.toString(), "Enter text here"]) });
        var newbackendInput = []
        newbackendInput = this.state.backendInput.concat("a" + this.state.variableNumber.toString());
        this.setState({ backendInput: newbackendInput });

        break;
      default:
        this.setState({ inputs: this.state.inputs.concat([]) });
        break;
    }
    //console.log(this.state.newText)
  }


  getRange() {
    var x = this.state.valueRanges;//["", "12", "empty", "34", "", "52", "empty", "74", "", "94", "empty", "112"]
    //console.log(x);
    var newArr = []
    var i = 0
    for (i = 0; i < x.length - 1; i = i + 1) {
      if (x[i] != "") {
        newArr.push('[' + x[i] + "," + x[i + 1] + "]")
        i = i + 1
      }
    }
    return (newArr)
  }

  onChangeAge() {
    this.setState({ refresh: !this.state.refresh })
  }

  getOutputTemplate(){
    var outputTemplate = "";
    var no_of_vars = this.getVariables().length
    for (var i = 0; i < no_of_vars; i = i + 1) {
      outputTemplate = outputTemplate+"$,"
    }
    return "<"+outputTemplate.substring(0, outputTemplate.length - 1)+">"
  }

  render() {

    return (
      <BrowserRouter>
        <Sidebar />
        <div style={{ backgroundColor: "#EFF0F2", width: "100%", height: 1000 }}>
          <div id="quizMakerContainer">
            <div id="templateMaker">
              <div id="templateMakerHeader">
              <div id="templateMakerInnerContainer">
                <div id="templateMakerTitle">Quiz</div>
                 <Select style={{backgroundColor:'blue'}} onChange={this.handleTemplateDropdown} options={this.state.templates}  />
                  {this.state.selectedTemplateList.map((item,index)=>{return(
                    <div id="templateList">
                    {item}
                      </div>
                      )})}
                      </div>
              </div>

              <div>
                {this.state.quizTypes.map((item, index) => {
                  return (
                    <div id="quizTypes"> {this.state.quizTypes[index]}</div>)
                })}
              </div>
            </div>
            <div id="rightContainer">
              <div id="courseSelector">
              <div id="courseSelectorInternalContainer">
                <div id="templateMakerTitle">Courses</div>
                <Dropdown title="Select Courses" list={this.state.courses} resetThenSet={this.resetThenSetCourses} />
              <div id="selectedCourse">  {this.state.selectedCourse} </div>
              </div>
              </div>
              <div onClick={this.openModal.bind(this)} id="createTemplateButton">Create Template</div>
              <div id="publishButton">Publish Quiz</div>
            </div>
          </div>

          {/* TEMPLATE MAKER MODAL */}
          <Modal

            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            // onRequestClose={this.closeModal}
            contentLabel="Example Modal"
          >
            <div onClick={() => { this.closeModal() }}>close</div>
            <div style={{ backgroundColor: "#F3F6F8", width: "100%", height: 1000, position: 'absolute' }}>
              <div id='mainContainer'>
                <div>
                  <div id="QuizMakerTitle" >QuizMaker</div>


                  {/*TITLE*/}
                  <div> Enter Quiz Title <input value={this.state.quizTitle} onChange={(e) => { this.setState({ quizTitle: e.target.value }) }} />  </div>
                  <Dropdown title="Select Variable Type" list={this.state.variableTypeList} resetThenSet={this.resetThenSet} />
                  Minimum
<input value={this.state.minVarRange} onChange={(e)=>{this.setState({minVarRange:e.target.value})}}/>
Maximum
<input value={this.state.maxVarRange} onChange={(e)=>{this.setState({maxVarRange:e.target.value})}}/>

                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                      <div id="canvas">
                        {this.state.inputs.map((item, index) => {
                          //console.log("The current iteration is: " + index);
                          if (item[0] == "a") {
                            return (<input id="variables" value={item} onChange={this.onChangeAge.bind(this)} />)
                          }
                          else {
                            return (<input
                              onChange={(e) => {
                                this.x = this.state.inputs;
                                this.x[index] = e.target.value;
                                console.log("=====")
                                console.log(this.x)
                                console.log("=====")
                                this.setState({ refresh: !this.state.refresh })
                                // this.onChangeAge();
                              }
                              }
                              id="bleh"
                              style={{ backgroundColor: '#E8E9EA', padding: 9, borderWidth: 0, borderRadius: 10, width: this.state.inputs[index].length * 6.5 }}
                              value={this.state.inputs[index]}

                            />)
                          }
                        }

                        )}
                      </div>
                    </div>

                    <div style={{ marginLeft: 30 }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <button id="addVariable" onClick={() => {this.appendToArray("sqrt"); var temp = this.state.valueRanges; temp = temp.concat(''); this.setState({valueRanges:temp  })}}> Add Variable </button>

                        <div id="mathTitle"> Math Functions </div>
                        <div style={{ width: 400, flexWrap: 'wrap' }}>
                          <button id="mathButtons" onClick={() => this.setState({ outputArray: this.state.outputArray + 'Math.sqrt' })}> sqrt </button>
                          <button id="mathButtons" onClick={() => { this.state.outputs[this.state.selectedOutput] = this.state.outputs[this.state.selectedOutput] + '+ '; this.setState({ refresh: !this.state.refresh }) }}> add </button>
                          <button id="mathButtons" onClick={() => { this.state.outputs[this.state.selectedOutput] = this.state.outputs[this.state.selectedOutput] + '- '; this.setState({ refresh: !this.state.refresh }) }}> sub </button>
                          <button id="mathButtons" onClick={() => { this.state.outputs[this.state.selectedOutput] = this.state.outputs[this.state.selectedOutput] + '÷ '; this.setState({ refresh: !this.state.refresh }) }}> div </button>
                          <button id="mathButtons" onClick={() => { this.state.outputs[this.state.selectedOutput] = this.state.outputs[this.state.selectedOutput] + '/ '; this.setState({ refresh: !this.state.refresh }) }}> mul </button>
                          <button id="mathButtons" onClick={() => this.appendToArray("sqrt")}> mod </button>
                          {/* <button id="mathButtons" onClick={() => console.log(this.x)}> array output </button> */}

                        </div>
                      </div>
                    </div>
                  </div>


                  <div>
                    {this.state.inputs.map((item, index) => {
                      //console.log("The current iteration is: " + index);
                      if (item[0] == "a") {
                        return (
                        <div>
                        <button id="outputVariables"
                          onClick={() => { this.state.outputs[this.state.selectedOutput] = this.state.outputs[this.state.selectedOutput] + item + " "; this.setState({ refresh: !this.state.refresh }) }}
                          onChange={this.onChangeAge.bind(this)}>
                          {item}
                         
                        </button>
                         <div><input value={this.state.valueRanges[index]} onChange={(e)=>{
                           var temp = this.state.valueRanges;
                           temp[index] = e.target.value;
                           this.setState({valueRanges:temp, refresh:!this.state.refresh})   

                           console.log(this.state.valueRanges);                        
                           }}/></div>
                          <div><input value={this.state.valueRanges[index+1]} onChange={(e)=>{
                           var temp = this.state.valueRanges;
                           temp[index+1] = e.target.value;
                           this.setState({valueRanges:temp, refresh:!this.state.refresh})   

                           console.log(this.state.valueRanges);                        
                           }}/></div>
                         </div>
                        )
                      }
                    }
                  )}

                  </div>

                  <div>
                    <div id="outputTitle">Output</div>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                      <div>
                        {/* Ouputs */}
                        {this.state.outputs.map((item, index) => {
                          //console.log("The current iteration is: " + index);
                          return (
                            <div style={{ flexDirection: 'column', marginBottom: 15, }}>
                              <div style={{ borderWidth: 20, borderBottomColor: 'green' }} id="outputCanvas" onClick={() => this.setState({ selectedOutput: index })} >

                                {this.state.outputs[index].split(" ").map((item, index) => {

                                  return (

                                    <div id="outputItems">
                                      <div id="outputItemText">
                                        {item}
                                   
                                      </div>
                                    </div>
                                  )
                                }
                                )
                                }

                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div onClick={() => this.setState({ outputs: this.state.outputs.concat([""]) })} id="addOutput" >Add output</div>
                    </div>
                  </div>
                  <div onClick={() => {
                    this.setState({
                      quizTypes: this.state.quizTypes.concat([this.state.quizTitle]), quizTitle: ''
                    });
                    alert("Your quiz template has been added to the list");


                   // { "type":"Vector Addition", "template_json":"{\"inputs\":[\"a\",\"b\"], \"outputs\":[\"a+b\", \"a-b\"], \"input_type\":\"regular\",\"text\":\"I have $ apples, somebody gave me $ apples. How many apples do I have?\",\"output_template\":\"A = <$, $>\",\"input_values\":[[1,100],[100,200]]}" }

                    console.log("inputs:"+this.getVariables()+" ,outputs:"+this.state.outputs+" ,input type:"+this.state.variableType+" ,text:"+this.getQuizText() + " ,output_template:A="+ this.getOutputTemplate() +  "input_values:"+"["+this.getRange()+"]")

                    console.log("Get Variable Type");
                    console.log(this.state.variableType)


                    console.log("Quiz Title============");
                    console.log(this.state.quizTitle)

                    //Getting Text
                    console.log("Quiz Text ===============")
                    console.log(this.getQuizText());

                    //Getting Inputs
                    console.log("Inputs ===============")
                    console.log(this.getVariables());

                    //Getting Outputs
                    console.log("Outputs ===============")
                    console.log(this.state.outputs);


                    //Getting 
                  }} style={{ backgroundColor: 'blue', padding: 10, color: 'white', borderRadius: 15 }}> Add quiz Template to quiz list </div>


                </div>

              </div>
            </div>
          </Modal>

          {/* ============================================================ */}



        </div>
      </BrowserRouter>
    );
  }
}

export default QuizMaker;

 