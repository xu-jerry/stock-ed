import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={() => testingManyStocks()}>
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

async function testingManyStocks() {
  const s1 = await requestStockData("AAPL");
  const s2 = await requestStockData("MMM");
  const s3 = await requestStockData("AMD");
  const s4 = await requestStockData("INTU");
  const s5 = await requestStockData("WDC");
  const s6 = await requestStockData("DIS");
  const s7 = await requestStockData("NTDOY");

  console.log(`AAPL: ${s1.price.regularMarketPrice}`);
  console.log(`MMM: ${s2.price.regularMarketPrice}`);
  console.log(`AMD: ${s3.price.regularMarketPrice}`);
  console.log(`INTU: ${s4.price.regularMarketPrice}`);
  console.log(`WDC: ${s5.price.regularMarketPrice}`);
  console.log(`DIS: ${s6.price.regularMarketPrice}`);
  console.log(`NTDOY: ${s7.price.regularMarketPrice}`);
}

async function requestStockData(ticker) {
  console.log(`Requesting data for ${ticker}`);
  let stockData = await axios.get(`/stock`, {
    params: {
      symbol: ticker
    }
  });
  return stockData.data;
}

export default App;
