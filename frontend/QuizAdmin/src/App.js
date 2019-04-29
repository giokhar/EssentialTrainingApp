import React, { Component } from 'react';
import QuizMaker from './QuizMaker';
import { BrowserRouter, Route, } from 'react-router-dom';
import HashGenerator from './HashGenerator';
import Courses from './Courses';
import Quiz_by_course from './quiz_by_course';
import Statistics from './statistics';
import Quiz_logs from './quiz_logs';



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path='/QuizMaker' render={() => (
            <div className="App">
              <QuizMaker />
            </div>
          )} />

          <Route exact={true} path='/HashGenerator' render={() => (
            <div className="App">
              <HashGenerator />
            </div>
          )} />

       
   
        <Route component={(props) => <Courses {...props} />} exact={true} path='/Courses' >
         </Route>

<Route component={(props) => <Quiz_by_course {...props} />} exact={true} path='/quiz_by_course' />

<Route component={(props) => <Statistics {...props} />} exact={true} path='/statistics' />
<Route component={(props) => <Quiz_logs {...props} />} exact={true} path='/quiz_logs' />

        </div>
      </BrowserRouter>
    );
  }
}
export default App;