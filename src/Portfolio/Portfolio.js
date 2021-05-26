import "./Portfolio.css"

function Portfolio() {

    /* This data simulates the kind of data the server will return.
     * Work on using the static data first then deal with the post requests and api.
     */
    const data = [
        {ticker: "AAPL", companyName: "Apple", amount: 500, purchasePrice: 20, currentPrice: 32},
        {ticker: "ABC", companyName: "Something", amount: 400, purchasePrice: 30, currentPrice: 45},
        {ticker: "XYZ", companyName: "Something2", amount: 100, purchasePrice: 40, currentPrice: 410},
        {ticker: "AAA", companyName: "Something3", amount: 10, purchasePrice: 50, currentPrice: 440},
        {ticker: "TTT", companyName: "Something4", amount: 10, purchasePrice: 700, currentPrice: 450}
    ]


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

	const tickers = [];
	const companyNames = [];
	const amounts = [];
	const purchasePrices = [];
	const currentPrices = [];
	for (const name of data) {
		const url = "/Stock/" + name.ticker;
		tickers.push(<><br></br><a href = {url}>{name.ticker}</a></>);
		companyNames.push(<><br></br>{name.companyName}</>);
		amounts.push(<><br></br>{name.amount}</>);
		purchasePrices.push(<><br></br>{name.purchasePrice}</>);
		currentPrices.push(<><br></br>{name.currentPrice}</>);
	}

    return (
	<div className="page">
	  <div className="portfolio">
      	    <h1>My Portfolio</h1>
	  </div>
	  <table width="100%">
	    <thead>
	      <tr>
		<th colspan="1">ACCOUNT DETAILS</th>
	      </tr>
	      <tr>
		  <td colspan="1">Value</td>
		<td colspan="1">Buying power</td>
		<td colspan="1">Cash</td>
	      </tr>
	    </thead>
	  </table> 
	  <hr></hr>
	  <table width="100%">
	    <thead>
	      <tr>
	        <th colspan="1">ORDER STOCK</th>
	      </tr>
	    </thead>		
	    <tbody>
	      <tr>
		<td colspan="1">Symbol{tickers}</td>
		<td colspan="1">Company{companyNames}</td>
		<td colspan="1">Amount{amounts}</td>
		<td colspan="1">Purchase Price ($){purchasePrices}</td>
		<td colspan="1">Current Price ($){currentPrices}</td>
	      </tr>
	    </tbody>
	  </table> 
	  </div>
    )
}

export default Portfolio;
