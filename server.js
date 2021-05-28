const morgan = require("morgan");
const express = require("express");
const cheerio = require('cheerio');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3001;
const yahooFinance = require('yahoo-finance');
const leaderBoardData = [
    {id:45676543, username:"jason", accountValue: -1, todayChange: 30, overallChange: 20},
    {id:45676544, username:"jerry", accountValue: 3, todayChange: 20, overallChange: 21},
    {id:45676545, username:"arpit", accountValue: 2, todayChange: -30, overallChange: 22},
    {id:45676546, username:"kevin", accountValue: 500, todayChange: 50, overallChange: 8},
    {id:45676547, username:"james", accountValue: 1, todayChange: 20, overallChange: 3},
    {id:45676548, username:"annie", accountValue: 1, todayChange: -30, overallChange: 1}
];

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/stock", (req, res) => {
    const data =  getStockData(req.query.symbol, function(stockData) {
        res.json(stockData);
    });
});
app.get("/historical", (req, res) => {
    const data =  getHistoricalData(req.query.symbol, req.query.fromDate, req.query.toDate,function(historicalData) {
        res.json(historicalData);
    });
});
app.get("/leaderboardData", (req, res) => {
    /* Normally you would get the data from the database, 
     * but since there is not one here yet, we just test 
     * leaderboard using some static json above
     */
    res.json(leaderBoardData);
});
app.get("/stocknews", async (req, res) => {
    // let forbesNews = await getLatestNews("https://www.forbes.com/investing/?sh=3a24170110ba", 5, ($, i) => {
    //     let articleTitle = $(`.pop-picks__content > div.editors-picks > div:nth-child(${i}) > a`).text();
    //     let articleLink = $(`.pop-picks__content > div.editors-picks > div:nth-child(${i}) > a`).attr('href');
    //     return [articleTitle, articleLink];
    // });
    let economistNews = await getLatestNews("https://www.economist.com/finance-and-economics", 5, ($, i) => {
        let articleTitle = $(`main > div > div.layout-section-collection > div:nth-child(${i}) > div.teaser__text >
            h2 > a.headline-link > span.teaser__headline`).text();
        let articleLink = $(`main > div > div.layout-section-collection > div:nth-child(${i}) > div.teaser__text >
            h2 > a.headline-link`).attr('href');
        return [articleTitle, "https://www.economist.com/" + articleLink];
    });
    res.send(JSON.stringify(economistNews));
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
function getHistoricalData(symbol, fromDate, toDate,callback){
    yahooFinance.historical({
        symbol: symbol,
        from: fromDate,
        to: toDate,    
    }, (err, quotes) => {
        if (err) {
            callback(null);  
            return;
        }
        callback(quotes); 
    });
}

async function getLatestNews(url, linkNums, getData) {
    const data = [];
    let response = await axios.get(url);
    let $ = cheerio.load(response.data);

    for (let i = 1; i <= linkNums; i++) {
        data.push(getData($, i));
    }
    return data;
}