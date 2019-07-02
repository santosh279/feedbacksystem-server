var config = require("config");
var app = require("express")();
var mongoose = require("mongoose");
var cors = require("cors");
var morgan = require("morgan");
var path = require("path");
const multer = require("multer");
var express = require("express");
// var glob = require("glob");
var chalk = require("chalk");
const bodyParser = require("body-parser");
var fs = require("fs");
//checking the environment

if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = "dev";
}

//setting the values from config

var port = config.get("port");
var host = config.get("mongoDB.host");
var datebase = config.get("mongoDB.database");

//mongoose setup
mongoose
  .connect(`mongodb://${host}/${datebase}`, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(response => {
    chalk.green("[+] mongoDB connected...");
  })
  .catch(error => {
    chalk.red("[-] Error in connecting MongoDB, please check...");
  });

//setting cors
app.use(cors());

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a"
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

// request body parsing into json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
var feedbackRoutes = require("./routes/feedback.routes");

app.use("/feedback", feedbackRoutes);

app.use("/image", express.static(path.join("uploads")));

app.listen(5000, () => {
  console.log(chalk.green(`[+] server is running on port [+] ${port}`));
  console.log(
    chalk.green(`[+] server environment        [+] ${process.env.NODE_ENV}`)
  );
});

module.exports = app;
