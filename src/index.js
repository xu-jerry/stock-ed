import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Stock from './Stock';
import Home from './Home';
import Search from './Search';
import About from './About';
import Leaderboard from './Leaderboard';
import Login from './Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from "react-router-dom";  

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path = "/" component = {App}/>
      <Route exact path = "/home" component = {Home}/>
      <Route path = "/login" component = {Login}/>
      <Route path = "/leaderboard" component = {Leaderboard}/>
      <Route path = "/stock/:id/" component = {Stock}/>
      <Route path = "/search" component = {Search}/>
      <Route path = "/about" component = {About}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();