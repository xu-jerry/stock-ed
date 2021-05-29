import React from 'react';
import { checkLoginStatus, getUserStockData} from "../base";
import "./Portfolio.css"
import axios from "axios";

function Portfolio() {

    /* This data simulates the kind of data the server will return.
     * Work on using the static data first then deal with the post requests and api.
     */
    // const data = [
    //     {ticker: "AAPL", companyName: "Apple", amount: 500, purchasePrice: 20, currentPrice: 32},
    //     {ticker: "ABC", companyName: "Something", amount: 400, purchasePrice: 30, currentPrice: 45},
    //     {ticker: "XYZ", companyName: "Something2", amount: 100, purchasePrice: 40, currentPrice: 410},
    //     {ticker: "AAA", companyName: "Something3", amount: 10, purchasePrice: 50, currentPrice: 440},
    //     {ticker: "TTT", companyName: "Something4", amount: 10, purchasePrice: 700, currentPrice: 450}
    // ]
	const [accountDetails, setAccountInfo] = React.useState(["", ""]);
	const [tableBody, setTable] = React.useState([]);


    /**
     * Print a table out using the data that looks something like this
     * (this is flexible, so feel free to not do it like this)
     * 
     * Symbol  Company Name     Amount    Purchase Price    Current Price    Total Value
     * AAPL    Apple            500       20                32               Calc using 20 * 500
     * 
     * Also, maybe additional columns for the total % change.
     * 
     * Look at Leaderboard for examples of using tables (you could use a div or custom component
     *  if you want)
     * 
     * 
     * Later we can make the symbol a link to the search page
     */

	async function updatePortfolio() {
		// await tradeStock("AAPL", 20);
		const data = (await getUserStockData(await checkLoginStatus()));
		const stocks = data.stocks;
		let totalValue = 0;
		const tableTemp = [];
		
		

		for (const stock in stocks) {
			const url = "/Stock/" + stock;
			const updatedPrice = (await axios.get("/stock", {params: {symbol: stock}})).data.price.regularMarketPrice;
			const diff = (stocks[stock].currentValue - (updatedPrice * stocks[stock].amount));
			tableTemp.push(<tr key={stock}><th><a href = {url}>{stock}</a></th>
				<th>{stocks[stock].longName}</th>
				<th>{stocks[stock].amount}</th> 			
				<th>{(stocks[stock].currentValue / stocks[stock].amount).toFixed(2)}</th>
				<th>{(updatedPrice).toFixed(2)}</th>
				<th>{(stocks[stock].currentValue).toFixed(2)}</th>
				<th>{diff}</th>
				</tr>);
			totalValue += (updatedPrice * stocks[stock].amount);
		}

		setAccountInfo([totalValue, data.cash]);
		setTable(tableTemp);
	}

	React.useEffect(() => {
		updatePortfolio();
	}, []);
	

    return (
	<div className="page">
		<h1>My Portfolio</h1>
	  <p>
	  	ACCOUNT DETAILS
	  </p>
	  <table>
	    <thead>
	      <tr>
		<th>Total Value: {accountDetails[0]}</th>
		<th>Cash: {accountDetails[1]}</th>
	      </tr>
	    </thead>
	  </table> 

	  <hr></hr>
	  <p>ORDER STOCK</p>
	  <table>
	    <thead>
	      <tr>
	        <th>Symbol</th>
			<th>Company</th>
			<th>Amount</th>
			<th>Purchase Price</th>
			<th>Current Price</th>
			<th>Total Value</th> 
			<th>Total Gain/Loss</th>
	      </tr>
	    </thead>		
	    <tbody>
			{tableBody}
	    </tbody>
	  </table> 
	  </div>
    )
}

export default Portfolio;
