import React, { Component } from 'react';
import QuizMaker from './QuizMaker';
import { BrowserRouter, Route } from 'react-router-dom';
import HashGenerator from './HashGenerator';
import Courses from './Courses';


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

          <Route exact={true} path='/Courses' render={() => (
            <div className="App">
              <Courses />
            </div>
          )} />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;