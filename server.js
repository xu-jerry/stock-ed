const morgan = require("morgan");
const express = require("express");
const cheerio = require('cheerio');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3001;
const yahooFinance = require('yahoo-finance');

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