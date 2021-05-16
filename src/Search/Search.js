import React from "react";
import axios from "axios";
import Scroll from "./scroll"
import './Search.css'

const popularStocks = ["AAL", "AAPL", "ABEV", "AMC", "AMD", "AMZN", "AR", "ARKK", "AUY", "BA", "BABA", "BAC", "BBD",
 "BMY", "BNTX", "C", "CCL", "CLF", "CMCSA", "COIN", "COTY", "CSCO", "CVE", "CVX", "DDD", "DKNG", "DVN", "EBAY", "EDU",
 "ES=F", "ET", "F", "FB", "FCEL", "FSLY", "FSR", "GE", "GGB", "GM", "GME", "GOLD", "HBAN", "HST", "INTC", "IQ", "ITUB", 
 "JD", "JPM", "KGC", "KMI", "KO", "LUMN", "M", "MARA", "MGNI", "MRK", "MRO", "MSFT", "MU", "NCLH", "NIO", "NOK", "NQ=F", 
 "NVAX", "OPEN", "ORCL", "OXY", "PBR", "PDD", "PFE", "PINS", "PLTR", "PLUG", "PTON", "QCOM", "QQQ", "RBLX", "RIG", "RIOT", 
 "RKT", "SIRI", "SKLZ", "SLB", "SNAP", "SPCE", "SQ", "SWN", "T", "TDOC", "TLRY", "TME", "TSLA", "TSM", "TTD", "TWTR", "U", 
 "UAL", "VEON", "VIAC", "VIPS", "VTRS", "VZ", "WFC", "WYNN", "X", "XOM", "XPEV", "ZNGA", "^IXIC"];

function Search() {
  const [searchStock, setSearchStock] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  React.useEffect(() => {
    const results = popularStocks.filter(stock =>
      stock.toLowerCase().includes(searchStock.toLocaleLowerCase())
    );
    if(searchStock.length === 0)
      setSearchResults([]);
    else {
      if(results.length > 5)
        setSearchResults(results.slice(0,5));
      else
        setSearchResults(results);
    }
      
  }, [searchStock]);


  const handleChange = event => {
    setSearchStock(event.target.value);
  };

  const handleSubmit = event => {
    alert('A name was submitted: ' + searchStock);
    event.preventDefault();
  };

  const goToPage = () => {
    /* Take the user to the Stocks Page */
  }

  return (
    <div className = "Main-Page">
      <p> This is the search page </p>
      <div className = "Search">
        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" value={searchStock} onChange = {handleChange} placeholder = "Type Stock Ticker Symbol" />
          </label>
          <input type="submit" value="Search"/>
        </form>
        <ul style = {{ listStyleType: "none" }}>
          Results:
          {searchResults.map(item => (
            <li key = {item}> <button onClick = {/*Take the user to the stocks page*/ goToPage}> {item} </button></li>
          ))}
        </ul>
      </div>

      <div className = "scroll"> 
            <Scroll stocks = {popularStocks} goToPage = {goToPage}> Hey </Scroll>
      </div>
    </div>
  );

}


export default Search;
