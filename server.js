const morgan = require("morgan");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const yahooFinance = require('yahoo-finance');

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/stock", async (req, res) => {
    console.log(`Getting data for ${req.query.symbol}`);
    const data = await getStockData(req.query.symbol, function(stockData) {
        res.send(JSON.stringify(stockData));
    });
});

app.listen(port);

function getStockData(symbol, callback) {
    yahooFinance.quote({
        symbol: symbol,
        modules: [ 'price', 'summaryDetail' ]
    }, function (err, quotes) {
        // TODO: Deal with errors (symbol not valid, etc)
        if (err) 
            console.log(err);
        callback(quotes);
    });
}

