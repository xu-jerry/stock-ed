import { useHistory } from "react-router-dom";
function Home(props) {
  const history = useHistory();

    return (
      <div>
        <p>This is the Home page.</p>
      </div>
    );
  }
  export default Home;