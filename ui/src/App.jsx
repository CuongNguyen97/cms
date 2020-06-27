import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import {PrivateRoute} from "./guard";
import {CommonLayout} from "./layout";
import {Login} from "./page/login";

class App extends Component {
    render() {
        return (
            <Switch>
                <Route extract path="/login" component={Login}/>
                <PrivateRoute extract path="/">
                    <CommonLayout/>
                </PrivateRoute>
            </Switch>
        )
    }
}

export default App;
