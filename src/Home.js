import { useHistory } from "react-router-dom";
function Home(props) {
  const history = useHistory();

    return (
      /*
      Show user stock fluctuation
      Stock fluctuation of main stock markets (NASDAQ)
      Show current amt of money you have 
      Show portfolio (link to page 4)
      Add tips and educational links if u suck
      */
      <div className="page">
        <h1>Welcome to the best way to learn about stocks: StockEd.</h1>
        <p>{props.loggedIn ? "Trade stocks or learn more about a specific stock in each of the tabs above!" : "Login or Signup to get started! (Top right)"}</p>
      </div>
    );
  }
  export default Home;