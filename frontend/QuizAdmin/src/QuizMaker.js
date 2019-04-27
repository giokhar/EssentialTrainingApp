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
import './dropdown-select.css';


const customStyles = {
  content: {

    borderWidth: 0,
    backgroundColor: "#F3F6F8",
  }
};

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
      selectedTemplateList: [],
      counter: "sfs", test: "",
      object: <input></input>,
      inputs: ['Enter text here'],
      text: '',
      newText: "",
      refresh: false,
      variableNumber: 0,
      outputArray: '',
      outputs: [""],
      alloutput: [],
      selectedOutput: 0,
      modalIsOpen: false,
      quizTitle: '',
      quizTypes: [],
      finalQuiz: [],
      courses: [{ title: 'CS 228' }, { title: 'CS 310' }],
      backendInput: [],
      valueRanges: [],
      variableType: "",
      y: [],
      templates: '',
      minVarRange: '',
      maxVarRange: '',
      selectedCourse: "",
      alpha_index: 0,
      outputStrings: [<input></input>],
      render_template_popup: false,
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


    // { "type":"Vector Addition", "template_json":"{\"inputs\":[\"a\",\"b\"], \"outputs\":[\"a+b\", \"a-b\"], \"input_type\":\"regular\",\"text\":\"I have $ apples, somebody gave me $ apples. How many apples do I have?\",\"output_template\":\"A = <$, $>\",\"variable_ranges\":[[1,100],[100,200]], \"variable_type\": \"real\"}"}

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

  getTemplates() {
    var templateList = get_question_templates();
    console.log("=-=-=-=-=-=-=-")
    console.log(templateList.then(data => { return (data) }));
    console.log("=-=-=-=-=-=-=-")
    return templateList.then(data => {
      return (data.data.map((item, index) => { return (item.type) })
      )
    })

  }

  componentWillMount() {
    var courseList = get_courses();
    console.log(courseList.then(data => { this.setState({ courses: data }) }))
    var temp;
    (this.getTemplates().then(data => { this.setState({ templates: data }) }))
    this.setState({ alpha_array: this.create_alphabet_array() })
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {

  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }


  getVariables() {
    let x = this.state.inputs.filter((element, index) => {
      return index % 2 != 0;
    })
    return x;
  }

  getQuizText() {
    let x = this.state.inputs.filter((element, index) => {
      return index % 2 === 0;
    });
    return x.join(" $ ");
  }


  handleTemplateDropdown(event) {
    this.setState({ selectedTemplateList: this.state.selectedTemplateList.concat(event) })
  }


  create_alphabet_array() {
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    var alpha_array = alphabet.split("");
    return alpha_array
  }

  push_alpha() {
    this.setState({ alpha_index: this.state.alpha_index + 1 })
    return (this.state.alpha_array[this.state.alpha_index])
  }


  validate_variables(variable) {
    var var_array =
      ['$a', '$b',
        '$c', '$d', '$e', '$f',
        '$g', '$h', '$i', '$j',
        '$k', '$l', '$m', '$n',
        '$o', '$p', '$q', '$r',
        '$s', '$t', '$u', '$v',
        '$w', '$x', '$y', '$z']
    return var_array.includes(variable)
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
        this.setState({ variableNumber: this.state.variableNumber + 1, inputs: this.state.inputs.concat(["$" + this.push_alpha()]) });
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
    var x = this.state.valueRanges;
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

  getOutputTemplate() {
    var temp_arrx = this.state.alloutput;
    var outputs = [];
    var output_collector = "";

    for (var i = 0; i < temp_arrx.length; i = i + 1) {
      if (temp_arrx[i - 1] == "ƒ:") {
        outputs.push(temp_arrx[i])
      }

      if (temp_arrx[i] == "ƒ:") {
        output_collector = output_collector + ""
      }
      else if (temp_arrx[i - 1] == "ƒ:") {
        output_collector = output_collector + " $ "
      }
      else {
        output_collector = output_collector + temp_arrx[i]
      }
    }

    return([outputs,output_collector])
  }

  renderPopup() {
    var tempArray = []
    for (var i = 0; i < this.state.templates.length; i++) {
      tempArray.push(this.state.templates[i])
    }
    return tempArray
  }


  renderPopupContainer() {
    if (this.state.render_template_popup == true) {
      return (
        <div id="template_popup_container">
          {this.renderPopup().map((item, index) => { return (<div id="template_popup" onClick={() => { this.setState({ selectedTemplateList: this.state.selectedTemplateList.concat(item) }) }}> {item}   </div>) })}
        </div>)
    }
    else {
      return
    }
  }


  delete_output_element(elem_to_delete){
    console.log("-3-3-3--3-3--33-");
    console.log(elem_to_delete);
    console.log("-3-3-3--3-3--33-");
    var temp_arr = this.state.alloutput; 
   temp_arr.splice(elem_to_delete, 1);
    this.setState({alloutput:temp_arr})
  }

  render_output() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
      {this.state.alloutput.map((item, index) => {
        console.log(this.state.alloutput);
        if (this.state.alloutput[index] == "ƒ:") { ; console.log(this.state.alloutput[index]); return (this.state.alloutput[index]) }
        else if (this.state.alloutput[index - 1] == "ƒ:") {
          if (index == this.state.selected_output_index) {
            return (<div>
              <div onClick={() => { this.delete_output_element(index); this.delete_output_element(index-1); }}> x </div>
              <input value={this.state.alloutput[index]} style={{ backgroundColor: 'green', borderColor: 'green' }} onClick={() => {
                this.setState({ selected_output_index: index });
              }} onChange={(e) => { var copy_array = this.state.alloutput; copy_array[index] = e.target.value; this.setState({ alloutput: copy_array }) }} />
            </div>
            )
          }
          else {
            return (
              <div>
                <div onClick={() => { this.delete_output_element(index); this.delete_output_element(index-1);}}> x </div>
                <input value={this.state.alloutput[index]} style={{ backgroundColor: 'red' }} onClick={() => { this.setState({ selected_output_index: index }); }} onChange={(e) => { var copy_array = this.state.alloutput; copy_array[index] = e.target.value; this.setState({ alloutput: copy_array }) }} />
              </div>
            )
          }
        }
        else {
          return (
            <div>
              <div onClick={() => { this.delete_output_element(index) }}> x </div>
              <input value={this.state.alloutput[index]} onChange={(e) => { var copy_array = this.state.alloutput; copy_array[index] = e.target.value; this.setState({ alloutput: copy_array }) }} />
            </div>
          )
        }
      })}
      </div>
    )
  }


  render_variables() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {this.state.inputs.map((item, index) => {
          //console.log("The current iteration is: " + index);
          if (this.validate_variables(item[0] + item[1])) {
            return (
              <div id="outputContainer">
                <button id="outputVariables"
                  onClick={() => {
                    var temp_array = this.state.alloutput;
                    temp_array[this.state.selected_output_index] =  temp_array[this.state.selected_output_index] + item 
                    this.setState({ alloutput: temp_array, refresh: !this.state.refresh }) }}
                  onChange={this.onChangeAge.bind(this)}>
                  {item}

                </button>
                <div><input placeholder={"Min"} id="outputRanges" value={this.state.valueRanges[index]} onChange={(e) => {
                  var temp = this.state.valueRanges;
                  temp[index] = e.target.value;
                  this.setState({ valueRanges: temp, refresh: !this.state.refresh })

                  console.log(this.state.valueRanges);
                }} /></div>
                <div><input placeholder={"Max"} id="outputRanges" value={this.state.valueRanges[index + 1]} onChange={(e) => {
                  var temp = this.state.valueRanges;
                  temp[index + 1] = e.target.value;
                  this.setState({ valueRanges: temp, refresh: !this.state.refresh })

                  console.log(this.state.valueRanges);
                }} /></div>
              </div>
            )
          }
        }
        )}

      </div>
    )
  }


  delete_canvas_elements(elem_to_delete){
    var temp_arr = this.state.inputs; 
    temp_arr.splice(elem_to_delete, 1);
     this.setState({alloutput:temp_arr})
  }



  render_canvas(){
    return(
      
      <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        <div id="canvas">

          <div style={{ position: "absolute", bottom: 80, right: 200 }}>
            <button id="addVariable" onClick={() => { this.appendToArray("sqrt"); var temp = this.state.valueRanges; temp = temp.concat(''); this.setState({ valueRanges: temp }) }}> Add Variable </button>
            <button id="addVariable" onClick={() => { this.appendToArray("string"); var temp = this.state.valueRanges; temp = temp.concat(''); this.setState({ valueRanges: temp }) }}> Add Textbox </button>
          </div>

          <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
          {this.state.inputs.map((item, index) => {
            if (this.validate_variables(item[0] + item[1])) {
              return (
                <div>
                <div onClick={()=>{this.delete_canvas_elements(index)}}> x </div>
              <input id="variables" value={item} onChange={this.onChangeAge.bind(this)} />
            </div>
              )
            }
            else {
              return (
                <div>
                <div onClick={()=>{this.delete_canvas_elements(index)}}> x </div>
              <input
                onChange={(e) => {
                  this.x = this.state.inputs;
                  this.x[index] = e.target.value;
                  this.setState({ refresh: !this.state.refresh })
                }}
                id="bleh"
                style={{ backgroundColor: '#E8E9EA', padding: 9, borderWidth: 0, borderRadius: 10, width: this.state.inputs[index].length * 9 }}
                value={this.state.inputs[index]}/>
                </div>
              )
            }
          }

          )}
          </div>
        </div>
      </div>

      <div style={{ marginLeft: 30 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          <div id="mathTitle">Outputs </div>
          <div>frefwerf werf wer fwerf werf werf werf werf wer fer ferfw </div>
          <div style={{ width: 400, flexWrap: 'wrap' }}>
            <div>{this.render_variables()}</div>
          </div>
        </div>
      </div>
    </div>

    )
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
                  <div  >Select templates</div>
                  <Select inputClassName="test" onChange={this.handleTemplateDropdown} options={this.state.templates} />
                  {this.state.selectedTemplateList.map((item, index) => {
                    return (
                      <div id="templateList">
                        {item}
                      </div>
                    )
                  })}
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
          <Modal id="modal" style={customStyles} isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} contentLabel="Example Modal" >
            <div onClick={() => { this.closeModal() }}>close</div>
            <div style={{ position: 'absolute' }}>
              <div id='mainContainer'>
                <div>
                  <div id="QuizMakerTitle" >QUESTION MAKER</div>


                  {/*TITLE*/}
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div id="enter_quiz_title_text">Enter Quiz Title</div>
                      <div><input id="quiz_title_text" value={this.state.quizTitle} onChange={(e) => { this.setState({ quizTitle: e.target.value }) }} /> </div>
                    </div>
                  </div>

{this.render_canvas()}
                  <div id="outputTitle">Outputs</div>



                  <div id="output_functions">
                    <div id="output_functions_button" onClick={() => { this.setState({ alloutput: this.state.alloutput.concat(""), refresh: !this.state.refresh }) }}>Add Text</div>
                    <div id="output_functions_button" onClick={() => { this.setState({ alloutput: this.state.alloutput.concat("ƒ:","") }) }}>Add Function</div>
                  </div>

                  <div id="output_container">
                    <div>{this.render_output()}</div>
                  </div>

                  <div onClick={() => {
                    this.setState({
                      quizTypes: this.state.quizTypes.concat([this.state.quizTitle]), quizTitle: ''
                    });
                    alert("Your quiz template has been added to the list");


                    // { "type":"Vector Addition", "template_json":"{\"inputs\":[\"a\",\"b\"], \"outputs\":[\"a+b\", \"a-b\"], \"input_type\":\"regular\",\"text\":\"I have $ apples, somebody gave me $ apples. How many apples do I have?\",\"output_template\":\"A = <$, $>\",\"input_values\":[[1,100],[100,200]]}" }

                    console.log({
                      "type": this.state.quizTitle,
                      "template_json": "{" +
                        "inputs\":" + "[" + this.getVariables() + "]" + "," +
                        "outputs:" + "[" + this.getOutputTemplate()[0] + "]" + "," +
                        "input_type:" + this.state.variableType + "," +
                        "text:" + this.getQuizText() + "," +
                        "output_template:A=" + this.getOutputTemplate()[1] + "," +
                        "input_values:" + "[" + this.getRange() + "]" +
                        "}"
                    }
                    )

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

                    console.log(this.getOutputTemplate()[0])
                    console.log(this.getOutputTemplate()[1])

                    //Getting 
                  }}> print output  </div>


                </div>

              </div>
            </div>
          </Modal>
        </div>
      </BrowserRouter>
    );
  }
}

export default QuizMaker;

