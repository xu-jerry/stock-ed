import React from "react";
import Stock from './searchcomponents/stock'
import axios from "axios";

const popularStocks = [
  "TSLA", "TTD", "NQ=F", "AMC", "SPCE", "PLTR", "NIO", "RBLX", "GME", "ARKK", "AMZN", 
  "NVAX", "AAPL", "COIN", "PLUG", "^IXIC", "FB", "QQQ", "SQ", "QCOM", "DDD", "MGNI", 
  "AMD", "ES=F", "TDOC", "MSFT", "U", "PFE", "BNTX", "WYNN", "ITUB", "TME", "BBD", "AAL", 
  "T", "INTC", "CLF", "PTON", "PBR", "ET", "BAC", "DKNG", "X", "F", "GE", "NOK", "TLRY", 
  "VTRS", "MSFT", "WFC", "XOM", "RIG", "GGB", "MU", "FCEL", "CSCO", "SNAP", "VEON", "COTY", 
  "ZNGA", "MRO", "ABEV", "C", "GOLD", "FSR", "CMCSA", "OXY", "IQ", "VIPS", "KGC", "VZ", "CCL", 
  "SIRI", "KMI", "VIAC", "TWTR", "PINS", "M", "SLB", "JD", "MARA", "EDU", "PDD", "SKLZ", "KO", 
  "ORCL", "QCOM", "CVE", "RKT", "RIOT", "BA","BABA", "GM", "AUY", "JPM", "CVX", "DVN", "XPEV", 
  "NCLH", "OPEN", "LUMN", "TSM", "EBAY", "UAL", "AR", "MRK", "HBAN", "BMY", "SWN", "FSLY", "HST"
];

function Search() {
  const [searchStock, setSearchStock] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  React.useEffect(() => {
    const results = popularStocks.filter(stock =>
      stock.toLowerCase().includes(searchStock.toLocaleLowerCase())
    );
    if(searchStock.length == 0)
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
    <div>
      <p> This is the search page {popularStocks.length}</p>
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
            Scrolling to be implemented here
      </div>
    </div>
  );

}


export default Search;
