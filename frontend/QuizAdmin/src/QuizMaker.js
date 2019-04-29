import React, { Component } from 'react';
import './Styles/App.css';
import "./Styles/quizMaker.css";
import AutosizeInput from 'react-input-autosize';
import Modal from 'react-modal';
import { DropdownMultiple, Dropdown } from 'reactjs-dropdown-component';
//import { createStackNavigator, createAppContainer } from 'react-navigation';
import { BrowserRouter, Route, } from 'react-router-dom';
import { get_courses, get_question_templates, create_question_template, create_quiz } from "./ApiFunctions/httpApi";
import Sidebar from './Sidebar';
import { Select, AsyncSelect, MultiSelect } from 'dropdown-select';
import './dropdown-select.css';


const customStyles = {
  content: {

    borderWidth: 0,
    backgroundColor: "#F3F6F8",
  }
};

class QuizMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTemplateList: [],
      counter: "sfs", test: "",
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
      quiz_title:'',
      courses: [{ title: 'CS 228' }, { title: 'CS 310' }],
      backendInput: [],
      valueRanges: [],
      variableType: "",
      templates: '',
      minVarRange: '',
      maxVarRange: '',
      selectedCourse: "",
      alpha_index: 0,
      render_template_popup: false,
      template_no_correct: [],
      template_dropdown: false,
      course_dropdown: false,
      function_dropdown: false,
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
      ],
      template_id_list: [],
      question_json: '',


    };


    // { "type":"Vector Addition", "template_json":"{\"inputs\":[\"a\",\"b\"], \"outputs\":[\"a+b\", \"a-b\"], \"input_type\":\"regular\",\"text\":\"I have $ apples, somebody gave me $ apples. How many apples do I have?\",\"output_template\":\"A = <$, $>\",\"variable_ranges\":[[1,100],[100,200]], \"variable_type\": \"real\"}"}

    this.x = [];
    // this.addTag = this.addTag.bind(this);
    this.appendToArray = this.appendToArray.bind(this);
    this.openModal = this.openModal.bind(this);
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


  stop_reload() {
    window.onbeforeunload = function () { return "Do you really want to leave our brilliant application?" }
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.stop_reload());
  }

  componentWillUnmount() {
    this.stop_reload();
    window.removeEventListener('beforeunload', this.stop_reload());
  }



  getTemplates() {
    var templateList = get_question_templates();
    var template_types = [];
    var template_ids = []
    return templateList.then(data => {
      return (data.data.map((item, index) => { return item })
      )
    })
  }

  componentWillMount() {
    var courseList = get_courses();

    courseList.then(data => { console.log(data); this.setState({ courses: data }) })
    var temp;
    (this.getTemplates().then(data => { this.setState({ templates: data.map(item => { return item }), template_ids: data.map(item => { return item[1] }) }) }))
      ;

    this.setState({ alpha_array: this.create_alphabet_array() })
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }


  getVariables() {
    var temp_arr = this.state.inputs;
    var new_output_variables = [];
    for (var i = 0; i < temp_arr.length; i++) {
      if (this.validate_variables(temp_arr[i])) {
        new_output_variables.push(temp_arr[i][1])
      }
    }

    return (new_output_variables)
  }

  getQuizText() {
    let x = this.state.inputs.filter((element, index) => {
      return index % 2 === 0;
    });
    return x.join(" $ ");
  }



  handleTemplateDropdown(event, template_id) {
    console.log(this.state.template_id_list);
    console.log(this.state.template_no_correct);
    this.setState({ selectedTemplateList: this.state.selectedTemplateList.concat(event) });
  }


  create_question_json() {
    var question_json = {}
    for (var i = 0; i < this.state.template_id_list.length; i++) {
      question_json[this.state.template_id_list[i].toString()] = parseInt(this.state.template_no_correct[i])
    }
    this.setState({ question_json: question_json });
    console.log(this.state.question_json);
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


    for (var i = 0; i < x.length; i = i + 1) {
      if (x[i][0] != "" && x[i][1] != "") {
        x[i][0] = parseInt(x[i][0]);
        x[i][1] = parseInt(x[i][1]);
        newArr.push(x[i])
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

    return ([outputs, output_collector])
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


  delete_output_element(elem_to_delete) {
    var temp_arr = this.state.alloutput;
    temp_arr.splice(elem_to_delete, 1);
    this.setState({ alloutput: temp_arr })
  }



  render_output() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
        {this.state.alloutput.map((item, index) => {
          if (this.state.alloutput[index] == "ƒ:") {
            return (
              <div id="function_tag">  {this.state.alloutput[index]} </div>)
          }
          else if (this.state.alloutput[index - 1] == "ƒ:") {
            if (index == this.state.selected_output_index) {
              return (
                <div id="output_function_container_selected">

                  <input id="output_function_item_select" value={this.state.alloutput[index]} onClick={() => {
                    this.setState({ selected_output_index: index });
                  }} onChange={(e) => { var copy_array = this.state.alloutput; copy_array[index] = e.target.value; this.setState({ alloutput: copy_array }) }} />
                  <div id="delete_output_function" onClick={() => { this.delete_output_element(index); this.delete_output_element(index - 1); }}> x </div>
                </div>
              )
            }
            else {
              return (
                <div id="output_function_container">
                  <input id="output_function_item" value={this.state.alloutput[index]} onClick={() => { this.setState({ selected_output_index: index }); }} onChange={(e) => { var copy_array = this.state.alloutput; copy_array[index] = e.target.value; this.setState({ alloutput: copy_array }) }} />
                  <div id="delete_output_function" onClick={() => { this.delete_output_element(index); this.delete_output_element(index - 1); }}> x </div>
                </div>
              )
            }
          }
          else {
            return (
              <div id="output_text_container">
                <input id="output_text_item" value={this.state.alloutput[index]} onChange={(e) => { var copy_array = this.state.alloutput; copy_array[index] = e.target.value; this.setState({ alloutput: copy_array }) }} />
                <div id="delete_output_text" onClick={() => { this.delete_output_element(index) }}> x </div>
              </div>
            )
          }
        })}
      </div>
    )
  }


  render_variables() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div id="outputContainer">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {this.state.inputs.map((item, index) => {
              //console.log("The current iteration is: " + index);
              if (this.validate_variables(item[0] + item[1])) {
                return (

                  <div id="outputVariables"
                    onClick={() => {
                      var temp_array = this.state.alloutput;
                      temp_array[this.state.selected_output_index] = temp_array[this.state.selected_output_index] + item
                      this.setState({ alloutput: temp_array, refresh: !this.state.refresh })
                    }}
                    onChange={this.onChangeAge.bind(this)}>
                    {item}
                  </div>

                )
              }
            }
            )}
          </div>

          <div>
            {this.state.valueRanges.map((item, index) => {
              return (
                <div id="range_input">
                  <div>
                    <input placeholder={"Min"} id="outputRanges" onChange={(e) => {
                      let temp = this.state.valueRanges;
                      temp[index][0] = parseInt(e.target.value);
                      this.setState({ valueRanges: temp, refresh: !this.state.refresh })
                    }} />
                  </div>

                  <div>
                    <input placeholder={"Max"} id="outputRanges" onChange={(e) => {
                      let temp = this.state.valueRanges;
                      temp[index][1] = parseInt(e.target.value);
                      this.setState({ valueRanges: temp, refresh: !this.state.refresh })
                    }} />
                  </div>
                </div>)
            })}

          </div></div>
      </div>
    )
  }


  delete_canvas_elements(elem_to_delete) {
    let temp_input_arr = this.state.inputs;
    temp_input_arr.splice(elem_to_delete, 1);


    let temp_ranges_arr = this.state.valueRanges;
    temp_ranges_arr.splice(0, 1);

    console.log("Element being deleted")
    console.log(elem_to_delete);


    this.setState({ inputs: temp_input_arr, valueRanges: temp_ranges_arr, refresh:!this.state.refresh });
   this.forceUpdate();

   // this.setState({ inputs: temp_input_arr, valueRanges: temp_ranges_arr, refresh:!this.state.refresh,closeModal:false });
    console.log(this.state.valueRanges)
    console.log(this.state.inputs)
  }



  render_canvas() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <div id="canvas">

            <div id="canvas_buttons">
              <div id="add_variable" onClick={() => { this.appendToArray("sqrt"); var temp = this.state.valueRanges; temp.push([0, 0]); this.setState({ valueRanges: temp }); console.log(this.state.valueRanges) }}> Add Variable </div>
              <div id="add_variable" onClick={() => { this.appendToArray("string"); }}> Add Textbox </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              {this.state.inputs.map((item, index) => {
                if (this.validate_variables(item[0] + item[1])) {
                  return (
                    <div id="variable_container">
                      <div id="delete_variable" onClick={() => { this.delete_canvas_elements(index) }}> x </div>
                      <input id="variables" value={item} onChange={this.onChangeAge.bind(this)} />
                    </div>
                  )
                }
                else {
                  return (
                    <div id="canvas_text_container">
                      <div id="delete_canvas_text" onClick={() => { this.delete_canvas_elements(index) }}> x </div>
                      <input
                        onChange={(e) => {
                          this.x = this.state.inputs;
                          this.x[index] = e.target.value;
                          this.setState({ refresh: !this.state.refresh })
                        }}
                        id="canvas_text_item"
                        style={{ width: this.state.inputs[index].length * 9 }}
                        placeholder={this.state.inputs[index]} />
                    </div>
                  )
                }
              }

              )}
            </div>
          </div>
        </div>

      </div>

    )
  }


  delete_temlate_elements(elem_to_delete) {
    var temp_arr = this.state.selectedTemplateList;
    temp_arr.splice(elem_to_delete, 1);
    this.setState({ selectedTemplateList: temp_arr })
  }

  handleChange = idx => selected => {
    const { label, value } = selected;
    // rest of your code
  };


  create_quiz_api() {
    create_quiz(this.state.quiz_title, JSON.stringify(this.state.question_json), this.state.selected_course_id);
  }


  render_template_selector_dropdown() {
    return (
      this.state.selectedTemplateList.map((item, index) => {
        return (
          <div id="selected_template">
            <div id="selected_template_delete" onClick={() => { this.delete_temlate_elements(index) }}> x </div>
            <div id="selected_template_item"> {item} </div>
            <div>
              <input id="selected_template_range" placeholder={"Enter Range"} value={this.state.template_no_correct[index]} onChange={(e) => {
                var temp = this.state.template_no_correct;
                temp[index] = e.target.value;
                this.setState({ template_no_correct: temp, refresh: !this.state.refresh })
              }} />
            </div>
          </div>
        )
      }))
  }


  toggle_template_dropdown() {
    this.setState({ template_dropdown: !this.state.template_dropdown, refresh: !this.state.refresh })
  }

  toggle_course_dropdown() {
    this.setState({ course_dropdown: !this.state.course_dropdown, refresh: !this.state.refresh })
  }

  toggle_function_dropdown() {
    this.setState({ function_dropdown: !this.state.function_dropdown, refresh: !this.state.refresh })
  }


  render_template_dropdown() {
    var template_list = this.state.templates;
    var temp = [];
    for (var i = 0; i < template_list.length; i++) {
      temp.push(template_list[i])
    }
    return (
      <div>
        <div id="template_dropdown_list"> {temp.map((item, index) => {
          return (
            <div onClick={() => {
              this.handleTemplateDropdown(item.type, item.id);
              let temp = this.state.template_id_list;
              temp.push(item.id);
              this.setState({ template_id_list: temp, template_dropdown: false })
            }} value={index}>
              <div id="template_list_items">{item.type}</div>
            </div>)
        })}
        </div>
      </div>
    )
  }

  render_course_dropdown() {
    return (
      <div id="course_dropdown_list"> {this.state.courses.map((item, index) => {
         return (<div onClick={() => {
          this.setState({ selectedCourse: item.title, course_dropdown: false, selected_course_id: item.id })
        }} value={index}>
          <div id="course_list_items">{item.title}</div>
        </div>)
      })}
      </div>
    )
  }


  render_function_dropdown() {
    var function_list = ['cos()', 'sin()', '+', '-', '*', '/'];

    return (
      <div>
        <div id="function_dropdown_list"> {function_list.map((item, index) => {
          return (
            <div>
              <div onClick={() => {
                var temp_array = this.state.alloutput;
                temp_array[this.state.selected_output_index] = temp_array[this.state.selected_output_index] + item
                this.setState({ alloutput: temp_array, refresh: !this.state.refresh })
              }} id="function_list_items">{item}</div>
            </div>)
        })}
        </div>
      </div>
    )
  }



  validate_form() {
    if (this.state.alloutput.length == 0 ||
      this.state.valueRanges.length == 0 ||
      this.state.inputs == 0
    ) {
      return false
    }
    else {
      return true
    }
  }


  authentication_message(message) {
    if (message == false) {
      return ("Oopsies!")
    }
    else {
      return ("SUCCESS!!!")
    }
  }

  save_template() {
    if (this.validate_form() != false) {
      alert("please fill in all the fields.")
    }
    else {
      create_question_template(this.state.quizTitle,
        this.getVariables(), this.getOutputTemplate()[0], "regular",
        this.getQuizText(), this.getOutputTemplate()[1], this.getRange(),
        "real").then((data) => { return (alert(this.authentication_message(data.data.success) + '\n' + data.data.error)) });
    }
  }


  render_title_input() {
    return (
      <div id="quiz_title_input_container">
        Enter quiz Title
    <input id="quiz_title_input" value={this.state.quiz_title} onChange={(e)=>{this.setState({quiz_title:e})}}/>
      </div>
    )
  }


  render() {
    //Conditional dropdown renderings.
    if (this.state.course_dropdown === true) {
      var course_dropdown = this.render_course_dropdown();
    }
    else {
      course_dropdown = null;
    }
    if (this.state.template_dropdown === true) {
      var template_dropdown = this.render_template_dropdown();
    }
    else {
      template_dropdown = null;
    }
    if (this.state.function_dropdown === true) {
      var function_dropdown = this.render_function_dropdown();
    }
    else {
      function_dropdown = null;
    }


    return (
      <BrowserRouter>
        <Sidebar />

        <div style={{ backgroundColor: "#EFF0F2", width: "100%", height: 1000 }}>
          <div id="quizMakerContainer">
            <div id="templateMaker">
              <div id="templateMakerHeader">
                <div id="templateMakerInnerContainer">


                  <div id="templateMakerTitle">Quiz</div>
                  {this.render_title_input()}

                  <div>
                    <div id="template_selector_dropdown" onClick={() => { this.toggle_template_dropdown() }}>Select Template</div>
                    {template_dropdown}
                  </div>
                  {this.render_template_selector_dropdown()}

                </div>
              </div>
              <div> {this.state.quizTypes.map((item, index) => { return (<div id="quizTypes"> {this.state.quizTypes[index]}</div>) })} </div>
            </div>
            <div id="rightContainer">
              <div id="courseSelector">
                <div id="courseSelectorInternalContainer">
                  <div id="templateMakerTitle">Courses</div>

                  {/* COURSE SELECTOR DROPDOWN */}
                  <div id="course_selector_dropdown" onClick={() => { this.toggle_course_dropdown() }}>Select Course</div>
                  {course_dropdown}
                  <div id="selectedCourse">  {this.state.selectedCourse} </div>
                </div>
              </div>
              <div onClick={this.openModal.bind(this)} id="createTemplateButton">Create Template</div>
              <div onClick={() => {
                this.create_question_json();
                this.create_quiz_api();
              }} id="publishButton">Publish Quiz</div>
            </div>
          </div>

          {/* TEMPLATE MAKER MODAL */}
          <Modal id="modal" style={customStyles} isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} contentLabel="Example Modal" >
            <form>
              <div onClick={() => { this.closeModal() }}>close</div>
              <div style={{ position: 'absolute' }}>
                <div id='mainContainer'>
                  <div>
                    <div id="template_maker_title" >Template Maker</div>


                    {/*TITLE*/}
                    <div style={{ display: 'flex', flexDirection: "column" }}>
                      {/*===================================================================*/}
                      {/*===================================================================*/}
                      <div style={{ display: 'flex', flexDirection: "row" }}>
                        {/*===================================================================*/}
                        {/*===================================================================*/}
                        <div>
                          <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <div id="enter_quiz_title_text">Enter Quiz Title</div>
                              <div><input id="quiz_title_text" value={this.state.quizTitle} onChange={(e) => { this.setState({ quizTitle: e.target.value }) }} /> </div>
                            </div>
                          </div>
                          {this.render_canvas()}
                        </div>
                        {/*===================================================================*/}
                        {/*===================================================================*/}
                        <div >
                          <div style={{ marginLeft: 30 }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <div id="mathTitle">Variables Used </div>
                              <div style={{ width: 300 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                 quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </div>
                              <div style={{ width: 400, flexWrap: 'wrap' }}>
                                <div>{this.render_variables()}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*===================================================================*/}
                        {/*===================================================================*/}
                      </div>


                      <div style={{ position: 'absolute', marginTop: 400 }}>
                        <div>
                          <div id="output_title">Outputs</div>
                          <div style={{ width: 500 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et <br />
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut <br />
                            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse <br />
                            cillum dolore eu fugiat nulla pariatur.
                            </div>
                          <div id="output_functions">
                            <div id="add_variable" onClick={() => { this.setState({ alloutput: this.state.alloutput.concat(""), refresh: !this.state.refresh }) }}>Add Text</div>
                            <div id="add_variable" onClick={() => { this.setState({ alloutput: this.state.alloutput.concat("ƒ:", "") }) }}>Add Function</div>
                            {function_dropdown}
                            <div id="add_variable" onClick={() => { this.toggle_function_dropdown() }} >Input Function</div>
                          </div>
                        </div>
                        <div>
                          <div id="output_container">
                            <div>{this.render_output()}</div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div id="save_template_button" onClick={() => { this.save_template() }}> Save Template  </div>
                  </div>
                </div>
              </div>
            </form>
          </Modal>
        </div>

      </BrowserRouter>
    );
  }
}

export default QuizMaker;

