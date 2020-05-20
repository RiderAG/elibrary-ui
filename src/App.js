import React from 'react';
import './App.css';

import Header from './component/header/Header';
import Content from './component/content/Content';
import Footer from './component/footer/Footer';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './util/history';
import SignIn from './component/signin/SignIn';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/signin" component={SignIn}/>
        <Route path="/">
          <Header/>
          <Content/>
          <Footer/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;