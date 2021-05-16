import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from './components/Nav';
import Stock from './Stock';
import Home from './Home';
import Search from './Search/Search';
import About from './About';
import Leaderboard from './Leaderboard/Leaderboard';
import Login from './Login';
import NotFound from './NotFound'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from "react-router-dom";  

ReactDOM.render(
  <BrowserRouter>
    <Navbar> </Navbar>
    <Switch>
      <Route exact path = "/" component = {Home}/>
      <Route exact path = "/home" component = {Home}/>
      <Route path = "/login" component = {Login}/>
      <Route path = "/leaderboard" component = {Leaderboard}/>
      <Route path = "/stock/:id/" component = {Stock}/>
      <Route path = "/search" component = {Search}/>
      <Route path = "/about" component = {About}/>
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
