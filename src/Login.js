import { useState } from "react";
import { useHistory } from "react-router-dom";
function Login(props) {
  const history = useHistory();
  const [message1, setmessage1] = useState("Please log in here: ");
  const [message2, setmessage2] = useState("Have an account? Login here!");
  const [signup, setsignup] = useState(false);

  const handleHomeClick = () => {
    history.push("/Home");
  }

  const handleSubmitClick = () => {
    console.log("Submitted");
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
        <input type="text"></input>
        <p>Password</p>
        <input type="password"></input>
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