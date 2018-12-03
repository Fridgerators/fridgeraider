import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Landing from './components/landing/landing';
import NewIngredients from './components/newIngredients/newIngredients';
import NewRecipes from './components/newRecipes/newRecipes';
import Profile from './components/profile/profile';


class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/input" component={NewIngredients} />
            <Route path="/results/:searchIngredients" component={NewRecipes} />
            <Route path="/cookbook" />
            <Route path="/profile" component={Profile}/>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;



