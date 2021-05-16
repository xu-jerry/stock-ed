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

function PageContent() {
    const [loggedIn, setLoginStatus] = React.useState(false); 

    function checkLogin() {
        return false; // Just for now always say they aren't logged-in
    }

    React.useEffect(() => {
        checkLogin();
    }, []);

    return (
        <Switch>
            <Route exact path = "/" component = {Home}/>
            <Route exact path = "/home" component = {Home}/>
            <Route handleLogin = {setLoginStatus} path = "/login" component = {Login}/>
            <PrivateRoute loggedIn = {loggedIn} path = "/leaderboard" component = {Leaderboard}/>
            <PrivateRoute loggedIn = {loggedIn} path = "/stock/:id/" component = {Stock}/>
            <PrivateRoute loggedIn = {loggedIn} path = "/search" component = {Search}/>
            <Route path = "/about" component = {About}/>
            <Route component={NotFound} />
        </Switch>
    );
}

export default PageContent;