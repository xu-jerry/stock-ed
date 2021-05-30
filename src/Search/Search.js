import React from "react";
import Scroll from "./scroll"
import './Search.css'
import { useHistory } from "react-router-dom";

const popularStocks = ["AAL", "AAPL", "ABEV", "AMC", "AMD", "AMZN", "AR", "ARKK", "AUY", "BA", "BABA", "BAC", "BBD",
 "BMY", "BNTX", "C", "CCL", "CLF", "CMCSA", "COIN", "COTY", "CSCO", "CVE", "CVX", "DDD", "DKNG", "DVN", "EBAY", "EDU",
 "ES=F", "ET", "F", "FB", "FCEL", "FSLY", "FSR", "GE", "GGB", "GM", "GME", "GOLD", "HBAN", "HST", "INTC", "IQ", "ITUB", 
 "JD", "JPM", "KGC", "KMI", "KO", "LUMN", "M", "MARA", "MGNI", "MRK", "MRO", "MSFT", "MU", "NCLH", "NIO", "NOK", "NQ=F", 
 "NVAX", "OPEN", "ORCL", "OXY", "PBR", "PDD", "PFE", "PINS", "PLTR", "PLUG", "PTON", "QCOM", "QQQ", "RBLX", "RIG", "RIOT", 
 "RKT", "SIRI", "SKLZ", "SLB", "SNAP", "SPCE", "SQ", "SWN", "T", "TDOC", "TLRY", "TME", "TSLA", "TSM", "TTD", "TWTR", "U", 
 "UAL", "VEON", "VIAC", "VIPS", "VTRS", "VZ", "WFC", "WYNN", "X", "XOM", "XPEV", "ZNGA", "^IXIC", "GOOGL", "GOOG", "NVDA", "DAC",
 "KIRK", "AMTX", "CMBM", "RFP", "RCON", "BGFV", "HOV", "RRD", "JYNT", "NTP", "SPLP", "RICK", "UAN", "TGLS", "TGB", "EGLX"];

function Search() {
  const [searchStock, setSearchStock] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const history = useHistory();

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
    event.preventDefault();
    // console.log('A name was submitted: ' + searchStock);
    if (searchStock !== "") {
      goToPage(searchStock);
    }
  };

  const goToPage = (ticker) => {
    history.push(`/Stock/${ticker}`);
  }

  return (
    <>
    <div className="page">
      <h1>Search</h1>
      <p> Search for your favorite stock, or click on any of the popular stocks down below to see their recent fluctuations in price! </p>
      <div className = "Search">
        <form onSubmit={handleSubmit}>
          <label>
            <input type= "text" value= {searchStock} onChange = {handleChange} placeholder = "Type Stock Ticker Symbol" />
          </label>
          <input className = "niceButton submitInput" type="submit" value="Search"/>
        </form>
      </div>
      <br></br>
      <br></br>
      <div className = "results">
        <div style = {{fontWeight: "bold"}}> {searchResults.length == 0 ? " " : "Results: "} </div> 
        <ul className = "results-list" style = {{ listStyleType: "none" }}>
            {searchResults.map(item => (
              <li  key = {item}> <button className="niceButton" onClick = {() => goToPage(item)}> {item} </button></li>
            ))}
        </ul>
      </div>
      <br></br>
      <br></br>
      <h1>Popular Stocks</h1>
    </div>
    
    <div className = "Main-Page">
      <div className = "scroll"> 
            <Scroll stocks = {popularStocks} goToPage = {goToPage}>  </Scroll>
      </div>
    </div>
    </>
  );

}


export default Search;
