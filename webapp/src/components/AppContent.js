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
        <header className="App-header">
        </header>
        <body>
          <div className="body-content">
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
        </body>
      </div>
    );
  }
}

export default App;
