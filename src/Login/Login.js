import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import jscookie from "js-cookie";
import React from 'react';

const Login = (props) =>{
  const history = useHistory();
  const [message, setmessage] = useState(["Please log in here: ", "Don't have an account? Make one "]);
  const [signup, setsignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleHomeClick = () => {
    history.push("/Home");
  }

  async function checkLogin() {
    // In the future, this will send a post request to verify the cookie is valid
    if (jscookie.get("user") !== undefined) {
        return true;
    }
    return false; // Just for now always say they aren't logged-in
  }

  function loginUser() {
    let pageOrigin;
    // Redirect to page of origin if possible
    if (typeof props.origin.location.state === undefined) {
      pageOrigin = props.origin.location.state.from.pathname;
    } else {
      pageOrigin = "/home";
    }
    console.log(pageOrigin);
    props.setLoginStatus();
    history.push(pageOrigin);
  }

  React.useEffect(() => {
    checkLogin().then((status) => {
        if (status) {
          loginUser();
        }
    });
  }, []);

  const handleSubmitClick = () => {
    console.log(username, password);
    axios.post("/loginauth", {
        username: username,
        password: password
      }).then(res => {
        setUsername("");
        setPassword("");
        // Set cookie, will add expiration in the future
        jscookie.set('user', res.data);
        loginUser();
      }).catch(err => {
        setUsername("");
        setPassword("");
        // TODO: Handle login fail
        console.log("Failed to login");
      })
  }

  const handleSignupClick = () => {
    if (!signup) {
      setmessage(["Please sign up for an account here: ", "Have an account? Login "]);
    }
    else {
      setmessage(["Please log in here: ", "Don't have an account? Make one "]);
    }
    setsignup(!signup);
  }

  return (
    <div className="page">
      <h1>Welcome!</h1>
      <p>{message[0]}</p>
      <form>
        <p>Username</p>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)}></input>
        <p>Password</p>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
      </form>
      <br></br>
      <div className="button loginButton" onClick={() => handleHomeClick()}>Back</div>
      <div className="button loginButton" onClick={() => handleSubmitClick()}>Submit</div>
      <br/>
      <span>{message[1]}<a onClick={() => handleSignupClick()}>here!</a></span>
    </div>
  );
}
export default Login;