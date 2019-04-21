import React, { Component } from 'react';
import Login from './login';
import Quizzes from './quizzes';

import { BrowserRouter, Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path='/login' render={() => (
            <div className="App">
              <Login />
            </div>
          )} />

          <Route exact={true} path='/quizzes' render={() => (
            <div className="App">
              <Quizzes />
            </div>
          )} />


        </div>
      </BrowserRouter>
    );
  }
}
export default App;