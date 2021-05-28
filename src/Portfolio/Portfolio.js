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

	const tableBody = [];
	for (const name of data) {
		const url = "/Stock/" + name.ticker;
		
		tableBody.push(<tr><th><a href = {url}>{name.ticker}</a></th>
			<th>{name.companyName}</th>
			<th>{name.amount}</th>
			<th>{name.purchasePrice}</th>
			<th>{name.currentPrice}</th></tr>);
	}

    return (
	<div className="page">
		<h1>My Portfolio</h1>
	  <p>
	  	ACCOUNT DETAILS
	  </p>
	  <table>
	    <thead>
	      <tr>
		<th>Total Value: </th>
		<th>Cash: </th>
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
			<th>Purchase Price ($)</th>
			<th>Current Price ($)</th>
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
