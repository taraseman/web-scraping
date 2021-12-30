(function () {
  "use strict";
  const express = require("express");
  const bodyParser = require("body-parser");
  const cors = require("cors");
  const filmAppPuppeteer = require("./film-app-puppeteer.js");

  const app = express();
  app.use(cors());
  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(bodyParser.json());

  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  const config = {
    appName: "Taras Live Server",
    port: 3001,
  };

  app.get("/", (req, res) => {
    res.send("OK");
  });
  app.post("/", function (req, res) {

    res.status(200).send({status: 0, message: "POST request to the homepage"});

    console.log('start filmAppPuppeter script');
    filmAppPuppeteer.start(req.body);
    
    
  });

  app.listen(config.port);
  console.log(config.appName + " is running on port " + config.port);
})();
