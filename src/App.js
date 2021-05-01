import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={() => testServer()}>
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

function testServer() {
  console.log("post request");
  axios.post(`http://localhost:9000/test`, {})
    .then(res => {
      console.log('here')
      console.log(res);
      console.log(res.data);
    });
}

export default App;
