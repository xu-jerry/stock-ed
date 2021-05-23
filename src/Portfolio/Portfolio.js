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

    return (
	<div className="page">
	  <div className="portfolio">
      	    <h1>My Portfolio</h1>
	  </div>
	  <table width="100%">
	    <thead>
	      <tr>
	        <th colspan="1" width="50%">ORDER STOCK</th>
		<th colspan="1">ACCOUNT DETAILS</th>
	      </tr>
	    </thead>		
	    <tbody>
	      <tr>
		<td colspan="1">Stock symbol</td>
		<td colspan="1">Value</td>
	      </tr>
	      <tr>
		<td colspan="1">Transaction</td>
		<td colspan="1">Buying power</td>
	      </tr>
	      <tr>
		<td colspan="1">Quantity</td>
		<td colspan="1">Cash</td>
	      </tr>
	      <tr>
		<td>Price</td>
	      </tr>
	      <tr>
		<td>Duration</td>
	      </tr> 
	    </tbody>
	  </table> 
	  </div>
    )
}

export default Portfolio;
