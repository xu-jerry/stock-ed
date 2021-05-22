import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import {createUser, signIn, checkLoginStatus} from "./../base";

const Login = (props) =>{
  const history = useHistory();
  const [message, setmessage] = useState(["Please log in here: ", "Don't have an account? Make one "]);
  const [signup, setsignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleHomeClick = () => {
    history.push("/home");
  }

  const handleSubmitClick = async () => {
    if (signup) {
      createUser(username, password);
    } else {
      if (!(await signIn(username, password))) {
        console.log("Login failed");
      }
    }
    if (await checkLoginStatus()) {
      props.setLoginStatus();
      if ((props.origin).toString().toLowerCase() === "/login") {
        handleHomeClick();
      }
    }
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