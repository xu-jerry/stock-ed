import { React, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Login.css";
import jscookie from "js-cookie";
import app from "./../base";

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
      app.auth().createUserWithEmailAndPassword(username, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
      });
    } else {
      try {
        await app.auth().signInWithEmailAndPassword(username, password);
      } catch(e) {
        console.log("Failed to login");
      }
    }
      
    await app.auth().onAuthStateChanged(function(user) {
      console.log("LOGGED IN!!!");
      if (user) {
        props.setLoginStatus();
        if ((props.origin).toString().toLowerCase() === "/login") {
          handleHomeClick();
        }
      }
    });
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