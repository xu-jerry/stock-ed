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
  const [errorMessage, setErrorMessage] = useState("");

  const handleHomeClick = () => {
    history.push("/home");
  }

  const handleSubmitClick = async () => {
    if (signup) {
      const madeUser = await createUser(username, password)
      if (madeUser !== true) {
        setErrorMessage(madeUser);
      }
    } else {
      const signedIn = await signIn(username, password)
      if (signedIn !== true) {
        setErrorMessage(signedIn);
      }
    }
    setUsername("");
    setPassword("");
    if (await checkLoginStatus()) {
      if ((props.origin).toString().toLowerCase() === "/login") {
        handleHomeClick();
      }
      props.setLoginStatus();
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
      <div className="blueBackground topSection">
      <h1>Welcome!</h1>
      </div>
      <p>{message[0]}</p>
      <form>
        <p>Username</p>
        <input className={errorMessage === "" ? "" : "invalid"} type="text" value={username} onChange={e => setUsername(e.target.value)}></input>
        <p>Password</p>
        <input className={errorMessage === "" ? "" : "invalid"} type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
      </form>
      <br></br>
      <div id="firstButton" className="button loginButton" onClick={() => handleHomeClick()}>Back</div>
      <div className="button loginButton" onClick={() => handleSubmitClick()}>Submit</div>
      <br/>
      <span>{message[1]}<span id="switchForm" onClick={() => handleSignupClick()}>here!</span></span>
      <div id="errorMessage" className={errorMessage === "" ? "hidden": ""}>{errorMessage}</div>
    </div>
  );
}
export default Login;