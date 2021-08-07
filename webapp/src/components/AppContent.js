import React from 'react';
import { Switch } from 'react-router';
import {Route, Redirect, withRouter } from 'react-router-dom';

import Posts from './Posts';
import Post from './Post';
import PageNotFound from './PageNotFound';

class App extends React.Component {


  render() {
    return (
      <div className="App">
        <div className="App-content">
          <Switch>
            <Route exact path="/">
              <Posts />
            </Route>
            <Route path="/post/:id">
              <Post />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
