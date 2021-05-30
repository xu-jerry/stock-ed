import React from 'react';
import { checkLoginStatus, getUserStockData} from "../base";
import "./Portfolio.css"
import axios from "axios";
import { formatNumbers } from '../baseUtils';

function Portfolio() {

    /* This data simulates the kind of data the server will return.
     * Work on using the static data first then deal with the post requests and api.
     */

	const [accountDetails, setAccountInfo] = React.useState(["", ""]);
	const [tableBody, setTable] = React.useState([]);

	async function updatePortfolio() {
		const data = (await getUserStockData(await checkLoginStatus()));
		const stocks = data.stocks;
		let totalValue = 0;
		const tableTemp = [];
		
		// If the user has no stocks
		if (Object.keys(stocks).length === 0) {
			setAccountInfo([data.cash, data.cash]);
			return;
		}

		for (const stock in stocks) {
			const url = "/Stock/" + stock;
			const updatedPrice = (await axios.get("/stock", {params: {symbol: stock}})).data.price.regularMarketPrice;
			const diff = (stocks[stock].currentValue - (updatedPrice * stocks[stock].amount));
			tableTemp.push(<tr key={stock}><th><a href = {url}>{stock}</a></th>
				<th>{stocks[stock].longName}</th>
				<th>{stocks[stock].amount.toLocaleString()}</th> 			
				<th>{formatNumbers(stocks[stock].currentValue / stocks[stock].amount)}</th>
				<th>{formatNumbers(updatedPrice)}</th>
				<th>{formatNumbers(stocks[stock].currentValue)}</th>
				<th>{diff}</th>
				</tr>);
			totalValue += (updatedPrice * stocks[stock].amount);
		}

		setAccountInfo([formatNumbers(totalValue + data.cash), formatNumbers(data.cash)]);
		setTable(tableTemp);
	}

	React.useEffect(() => {
		updatePortfolio();
	}, []);
	
	return (
		<div className="page">
			<div className="blueBackground topSection">
				<h1>My Portfolio</h1>
			</div>
			<p>Account Details</p>
			<table>
				<thead>
					<tr>
						<th>Total Value: {accountDetails[0]}</th>
						<th>Cash: {accountDetails[1]}</th>
					</tr>
				</thead>
			</table> 
			<hr></hr>
			<p>Order Stock</p>
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
