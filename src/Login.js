import { useHistory } from "react-router-dom";
function Login(props) {
  const history = useHistory();

  const handleHomeClick = () => {
    history.push("/Home");
  }

    return (
      <div>
        <p>Welcome! Please log in here: </p>

        <div className="button" onClick={() => handleHomeClick()}><button>Back</button></div>
      </div>
    );
  }
  export default Login;