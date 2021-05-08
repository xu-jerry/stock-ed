const morgan = require("morgan");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const yahooFinance = require('yahoo-finance');
const leaderboardData = {
    
}

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/stock", (req, res) => {
    const data =  getStockData(req.query.symbol, function(stockData) {
        res.json(stockData);
    });
});

app.listen(port);

function getStockData(symbol, callback) {
    yahooFinance.quote({
        symbol: symbol,
        modules: [ 'price', 'summaryDetail']
    }, (err, quotes) => {
        if (err) {
            callback(null);  
            return;
        }
        callback(quotes); 
    });
}

