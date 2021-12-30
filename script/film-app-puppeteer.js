const puppeteer = require("puppeteer");

module.exports = {
  start: async (data) => {
    const browser = await puppeteer.launch({
      headless: false,
    });

    const pageFilms = await browser.newPage();
    const filmIndex = data.id.split("-")[1];
    try {
      console.log("Opening https://www.rottentomatoes.com/top...");
      await pageFilms.goto(`https://www.rottentomatoes.com/top`, {
        waitUntill: "networkidle2",
      });
    } catch (err) {
      console.log("The page www.rottentomatoes didn't load");
    }

    try {
      await pageFilms.waitForSelector(
        `#main_container > div.container-masonry > div:nth-child(3) > section > div > ul > li:nth-child(${filmIndex}) > a > div`
      );
    } catch (err) {
      console.log("Can not find necessary genre");
    }

    await pageFilms.click(
      `#main_container > div.container-masonry > div:nth-child(3) > section > div > ul > li:nth-child(${filmIndex}) > a > div`
    );
    await pageFilms.waitForSelector(
      "#top_movies_main > div > table > tbody > tr:nth-child(1) > td:nth-child(3) > a"
    );

    const title = await pageFilms.evaluate(
      () =>
        document.querySelector(
          "#top_movies_main > div > table > tbody > tr:nth-child(1) > td:nth-child(3) > a"
        ).innerText
    );
    console.log(`Title of '${data.title}' random film: '${title}'`);

    const pageEbay = await browser.newPage();
    try {
      console.log("Opening Ebay...");
      await pageEbay.goto("https://www.ebay.com/b/Movies-TV/11232/bn_1857671");
    } catch (err) {
      console.log("Ebay page didn't load");
    }
    try {
      await pageEbay.click("#gh-ac");
      console.log("Typing film title...");
      await pageEbay.type("#gh-ac", title);
      await pageEbay.click("#gh-btn");
      console.log("Finding the film...");
      await pageEbay.waitForSelector(
        "#srp-river-results > ul > li:nth-child(2) > div > div.s-item__info.clearfix > span > a > span > svg"
      );
      await pageEbay.click(
        "#srp-river-results > ul > li:nth-child(2) > div > div.s-item__info.clearfix > span > a > span > svg"
      );
      console.log("login to your Ebay account");
    } catch (err) {
      console.log("Something wrong with work on Ebay");
    }
  },
};
