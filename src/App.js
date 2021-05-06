import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={() => requestStockData()}>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function requestStockData() {
  console.log("post request");
  axios.get(`/stock`, {
    params: {
      symbol: "AAPL"
    }
  })
    .then(res => {
      console.log(res.data.price.regularMarketPrice);
    });
}

export default App;
