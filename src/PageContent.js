import React from 'react';
import Stock from './Stock';
import Home from './Home';
import Search from './Search/Search';
import About from './About';
import Leaderboard from './Leaderboard/Leaderboard';
import Login from './Login/Login';
import NotFound from './NotFound';
import PrivateRoute from './components/PrivateRoute';
import {Route, Switch } from "react-router-dom";  
import jscookie from "js-cookie";

function PageContent(props) {
    const [loggedIn, setLoginStatus] = React.useState(false); 

    async function checkLogin() {
        // In the future, this will send a post request to verify the cookie is valid
        if (jscookie.get("user") !== undefined) {
            return true;
        }
        return false;
    }

    React.useEffect(() => {
        checkLogin().then((status) => {
            if (status) {
              setLoginStatus(true);
            }
        });
    }, []);

    return (
        <Switch>
            <Route exact path = "/" component = {Home}/>
            <Route exact path = "/home" component = {Home}/>
            <Route path = "/login" render={props => <Login origin = {props.location.pathname} setLoginStatus = {() => setLoginStatus(true)}/>}/>
            <PrivateRoute loginUser = {() => setLoginStatus(true)} loggedIn = {loggedIn} path = "/leaderboard" component = {Leaderboard}/>
            <PrivateRoute loginUser = {() => setLoginStatus(true)} loggedIn = {loggedIn} path = "/stock/:id/" component = {Stock}/>
            <PrivateRoute loginUser = {() => setLoginStatus(true)} loggedIn = {loggedIn} path = "/search" component = {Search}/>
            <Route path = "/about" component = {About}/>
            <Route component={NotFound} />
        </Switch>
    );
}

export default PageContent;