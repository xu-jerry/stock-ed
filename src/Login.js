import { useHistory } from "react-router-dom";
function Login(props) {
  const history = useHistory();

  const handleHomeClick = () => {
    history.push("/Home");
  }

    return (
      <body>
        <p>Welcome! Please log in here: </p>

        <div class="button" onClick={() => handleHomeClick()}><button>Back</button></div>
      </body>
    );
  }
  export default Login;