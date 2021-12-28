
(function () {
  "use strict";
  const express = require("express");
  const bodyParser = require("body-parser");
  const cors = require("cors");
  const filmAppPuppeteer = require("./film-app-puppeteer.js");
  const app = express();
  app.use(cors())
  app.use(bodyParser.urlencoded({
    extended: false,
  }))
  app.use(bodyParser.json())

  const config = {
    appName: "Taras Live Server",
    port: 3001,
  };

  app.get("/", (req, res) => {
    res.send("OK");
  });
  app.post('/', function (req, res) {
    console.log(req.body);
    filmAppPuppeteer.start(req.body)

    res.send('POST request to the homepage');
    res.sendStatus(200);
    
  });
  

  app.listen(config.port);
  console.log(config.appName + " is running on port " + config.port);
})();
