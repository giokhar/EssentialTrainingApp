import React, { Component } from 'react';
import QuizMaker from './QuizMaker';
import {BrowserRouter, Route} from 'react-router-dom';
import HashGenerator from './HashGenerator';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path='/' render={() => (
            <div className="App">
              <QuizMaker />
            </div>
          )}/>

<Route exact={true} path='/HashGenerator' render={() => (
            <div className="App">
              <HashGenerator />
            </div>
          )}/>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;