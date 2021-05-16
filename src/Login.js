import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Login(props) {
  const history = useHistory();
  const [message1, setmessage1] = useState("Please log in here: ");
  const [message2, setmessage2] = useState("Have an account? Login here!");
  const [signup, setsignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleHomeClick = () => {
    history.push("/Home");
  }

  const handleSubmitClick = () => {
    console.log(username, password);
    axios.post("/loginauth", {
        username: username,
        password: password
      }).then(res => {
        setUsername("");
        setPassword("");
      }).catch(err => {
        // TODO: handle what happens when the user fails to login
        console.log("Log in failed");
      })
  }

  const handleSignupClick = () => {
    setsignup(!signup);
    console.log(signup);
    if (signup) {
      setmessage1("Please sign up for an account here: ");
      setmessage2("Have an account? Login here!");
    }
    else {
      setmessage1("Please log in here: ");
      setmessage2("Don't have an account? Make one here!");
    }
  }

  return (
    <div className="page">
      <h1>Welcome!</h1>
      <p>{message1}</p>
      <form>
        <p>Username</p>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)}></input>
        <p>Password</p>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
      </form>
      <br></br>
      <div className="button" onClick={() => handleHomeClick()}>Back</div>
      <div className="button" onClick={() => handleSubmitClick()}>Submit</div>
      <p>{message2}</p>
      <div className="button" onClick={() => handleSignupClick()}>Signup</div>
    </div>
  );
}
export default Login;