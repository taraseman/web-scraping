const puppeteer = require("puppeteer");

module.exports = {
  start: async (data) => {
    const browser = await puppeteer.launch({
       headless: false,
    });
    const pageFilms = await browser.newPage();
    const urlSortIndex = data.id.split("-")[1];
    await pageFilms.goto(
      `https://www.rottentomatoes.com/browse/dvd-streaming-all?minTomato=0&maxTomato=100&services=amazon;hbo_go;itunes;netflix_iw;vudu;amazon_prime;fandango_now&genres=${urlSortIndex}&sortBy=release`,
      { waitUntill: "networkidle2" }
    );
    const textContent = await pageFilms.evaluate(
      () =>
        document.querySelector(
          "#content-column > div:nth-child(5) > div.mb-movies > div:nth-child(2) > div.movie_info > a > h3"
        ).textContent
    );

    console.log(textContent);

    const pageEbay = await browser.newPage();

    await pageEbay.goto("https://www.ebay.com/b/Movies-TV/11232/bn_1857671");
    await pageEbay.click("#gh-ac");
    await pageEbay.type("#gh-ac", textContent);

    await pageEbay.click("#gh-btn");

    await pageEbay.waitForSelector('#srp-river-results > ul > li:nth-child(2) > div > div.s-item__info.clearfix > span > a > span > svg')

    await pageEbay.click(
      "#srp-river-results > ul > li:nth-child(2) > div > div.s-item__info.clearfix > span > a > span > svg"
    );
  },
};
