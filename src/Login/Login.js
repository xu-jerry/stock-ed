import { React, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Login.css";
import jscookie from "js-cookie";

const Login = (props) =>{
  const history = useHistory();
  const [message, setmessage] = useState(["Please log in here: ", "Don't have an account? Make one "]);
  const [signup, setsignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleHomeClick = () => {
    history.push("/Home");
  }

  const handleSubmitClick = () => {

    axios.post("/loginauth", {
        username: username,
        password: password
      }).then(res => {
        // Reset input fields
        setUsername("");
        setPassword("");
        // Set cookie, will add expiration in the future
        jscookie.set('user', res.data);
        props.setLoginStatus();
        console.log(props.origin);
        // If the user is on the login page then redirect them to the home page
        if (props.origin === "/login") {
          handleHomeClick();
        }
      }).catch(err => {
        // Reset input fields
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
      <div id="firstButton" className="button loginButton" onClick={() => handleHomeClick()}>Back</div>
      <div className="button loginButton" onClick={() => handleSubmitClick()}>Submit</div>
      <br/>
      <span>{message[1]}<a onClick={() => handleSignupClick()}>here!</a></span>
    </div>
  );
}
export default Login;