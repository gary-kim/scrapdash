#!/usr/bin/env node

const puppeteer = require('puppeteer');

(async () => {
  // console.log(process.argv);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(process.argv[2]);
  const el = await page.$(process.argv[3])
  const img = await el.screenshot({encoding: 'base64'});
  await browser.close();
  console.log(`<img src="data:image/png;base64,${img}"/>`);
  
})();