import React from 'react';

import Container from 'react-bootstrap/Container';
import { Switch, Route } from 'react-router-dom';
import Home from '../home/Home';
import Profile from '../profile/Profile';

import s from './Content.module.css';

const Content = () => {
    return(
        <div className={s.main}>
            <Container>
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/features">Features</Route>
                </Switch>
            </Container>
        </div>  
    );
}

export default Content;