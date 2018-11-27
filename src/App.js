import React, { Component } from 'react';
import { HashRouter, Switch, Route} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div>
        
        <HashRouter>
            <Switch>
              <Route exact path="/"/>
              <Route exact path="/input"/>
              <Route exact path="/results"/>
              <Route exact path="/cookbook"/>
              <Route exact path="/profile"/>
            </Switch>
        </HashRouter>

      </div>
    );
  }
}

export default App;
