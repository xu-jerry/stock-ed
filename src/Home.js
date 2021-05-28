import axios from "axios";
import React from "react";

function Home(props) {
  const [stockNews, setNews] = React.useState([]);


  React.useEffect(() => {
    axios.get('/stocknews')
      .then((response) => {
        setNews(response.data);
      });
  }, []);

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
        <p>{props.loggedIn ? "Trade stocks or learn more about a specific stock to get started!" : "Login or Signup to get started!"}</p>
        
        <div className="blueBackground">
        <h2>Latest Stock News</h2>
        <ul>
          {stockNews.map((item, index) => {
            return <li key = {index}><a href={item[1]}>{item[0]}</a></li>
          })}
        </ul>
        </div>
      </div>
    );
  }
  export default Home;
