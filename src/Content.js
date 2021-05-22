import React from 'react';
import Stock from './Stock';
import Home from './Home';
import Search from './Search/Search';
import About from './About';
import Leaderboard from './Leaderboard/Leaderboard';
import Login from './Login/Login';
import NotFound from './NotFound';
import PrivateRoute from './components/PrivateRoute';
import {Route, Switch, BrowserRouter} from "react-router-dom";  
import Navbar from './components/Nav';
import app from './base';

function Content(props) {
    const [loggedIn, setLoginStatus] = React.useState(false); 

    React.useEffect(async () => {
        await app.auth().onAuthStateChanged(user => {
            return setLoginStatus(user);
        });
    }, []);

    return (
        <BrowserRouter>
            <Navbar loggedIn = {loggedIn} logoutUser = {() => setLoginStatus(false)}/>
            <Switch>
                <Route exact path = "/" render={props => <Home loggedIn = {loggedIn}/>}/>
                <Route exact path = "/home" render={props => <Home loggedIn = {loggedIn}/>}/>
                <Route exact path = "/login" render={props => <Login origin = {props.location.pathname} setLoginStatus = {() => setLoginStatus(true)}/>}/>
                <PrivateRoute loginUser = {() => setLoginStatus(true)} loggedIn = {loggedIn} path = "/leaderboard" component = {Leaderboard}/>
                <PrivateRoute loginUser = {() => setLoginStatus(true)} loggedIn = {loggedIn} path = "/stock/:id/" component = {Stock}/>
                <PrivateRoute loginUser = {() => setLoginStatus(true)} loggedIn = {loggedIn} path = "/search" component = {Search}/>
                <Route exact path = "/about" component = {About}/>
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default Content;