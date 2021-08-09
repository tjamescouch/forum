import React from 'react';
import { Switch } from 'react-router';
import {Route, Redirect, withRouter } from 'react-router-dom';

import Layout from './Layout';
import SignUpContainer from './SignUpContainer';
import Posts from './Posts';
import Post from './Post';
import PageNotFound from './PageNotFound';

class App extends React.Component {


  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/">
            <Posts />
          </Route>
          <Route path="/signup">
            <SignUpContainer />
          </Route>
          <Route path="/post/:id">
            <Post />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Layout>
    );
  }
}

export default App;
