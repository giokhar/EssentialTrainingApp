import React, { Component } from 'react';
import './Styles/App.css';
import "./Styles/quizMaker.css";
import AutosizeInput from 'react-input-autosize';
import Modal from 'react-modal';
import { DropdownMultiple, Dropdown } from 'reactjs-dropdown-component';

class App extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
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
      courses:[{title:'CS 228'}, {title:'CS 310'}]

    };

    this.x = [];
    // this.addTag = this.addTag.bind(this);
    this.appendToArray = this.appendToArray.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
        break;
      default:
        this.setState({ inputs: this.state.inputs.concat([]) });
        break;
    }
    //console.log(this.state.newText)
  }


  onChangeAge() {
    this.setState({ refresh: !this.state.refresh })
  }


  render() {
    return (
      <div style={{ backgroundColor: "#EFF0F2", width: "100%", height: 1000 }}>


        <div id="quizMakerContainer">
          <div id="templateMaker">
            <div id="templateMakerHeader">
              <div id="templateMakerTitle">Quiz</div>
              <div style={{ backgroundColor: 'blue', padding: 20, width: 100, }} onClick={() => { this.openModal() }}>Create new quiz</div>
            </div>

            <div>
              {this.state.quizTypes.map((item, index) => {
                return (
                  <div id="quizTypes"> {this.state.quizTypes[index]}</div>)
              })}
            </div>
          </div>
          <div id="courseSelector">
            <div id="templateMakerTitle">Courses</div>
            <Dropdown title="Select Courses"  list={this.state.courses}/>
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
                      <button id="addVariable" onClick={() => this.appendToArray("sqrt")}> Add Variable </button>

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
                      return (<button id="outputVariables"
                        onClick={() => { this.state.outputs[this.state.selectedOutput] = this.state.outputs[this.state.selectedOutput] + item + " "; this.setState({ refresh: !this.state.refresh }) }}
                        onChange={this.onChangeAge.bind(this)}>
                        {item}
                      </button>
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
                <div onClick={() => { this.setState({ quizTypes: this.state.quizTypes.concat([this.state.quizTitle]), quizTitle: '' }); alert("Your quiz template has been added to the list") }} style={{ backgroundColor: 'blue', padding: 10, color: 'white', borderRadius: 15 }}> Add quiz Template to quiz list </div>


              </div>

            </div>
          </div>
        </Modal>

        {/* ============================================================ */}



      </div>
    );
  }
}

export default App;


{
  /*
  id = models.AutoField(primary_key=True)
	title = models.CharField(max_length=255)
  question_json = {
    id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=255)
    template_json = {"input_num": 2, "outputs":["a0+a1", "a0-a1"], "input_type":"regular","text":"Find the sum and difference of $ and $","output_template":"A = <$, $>","input_range":[1,100]}
	  created_on =  models.DateTimeField(auto_now_add=True)
  }
  {
    id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=255)
    template_json = {"input_num": 2, "outputs":["a0+a1", "a0-a1"], "input_type":"regular","text":"Find the sum and difference of $ and $","output_template":"A = <$, $>","input_range":[1,100]}
	  created_on =  models.DateTimeField(auto_now_add=True)
  }
  {
    id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=255)
    template_json = {"input_num": 2, "outputs":["a0+a1", "a0-a1"], "input_type":"regular","text":"Find the sum and difference of $ and $","output_template":"A = <$, $>","input_range":[1,100]}
	  created_on =  models.DateTimeField(auto_now_add=True)
  }
	is_published = models.BooleanField(default=False)
	course_ids = models.TextField(null=True)
	created_on =  models.DateTimeField(auto_now_add=True)
*/
}