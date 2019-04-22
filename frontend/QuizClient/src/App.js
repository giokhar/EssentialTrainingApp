import React, { Component } from 'react';
import Login from './login';
import Quizzes from './quizzes';
import Quiz_taker from './quiz_taker';


import { BrowserRouter, Route } from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }
}

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path='/login' render={() => (
            <div className="App">
              <Login />
            </div>
          )} />

          <Route component={(props) => <Quizzes {...props} />} exact={true} path='/quizzes' />
          <Route component={(props) => <Quiz_taker {...props} />} exact={true} path='/quiz_taker' />

         </div>
      </BrowserRouter>
    );
  }
}
export default App;