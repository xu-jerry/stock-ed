const morgan = require("morgan");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/test",(req, res) => {
    console.log("Testing post request on /test!");
});

app.listen(port);