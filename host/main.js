#!/usr/bin/env node

const puppeteer = require('puppeteer');
const crypto = require('crypto');

function atob(str) {
  return Buffer.from(str, 'base64').toString('binary');
}

(async () => {
  // console.log(process.argv);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const cookies = JSON.parse(atob(process.argv[4])).map(e => ({
    name: e.name,
    value: e.value,
    domain: e.domain,
    path: e.path,
    httpOnly: e.httpOnly,
    secure: e.secure,
  }));
  await page.setCookie(...cookies);
  await page.goto(process.argv[2]);
  try {
    await page.waitForNavigation({
      timeout: 10000,
      waitUntil: 'networkidle0',
    });
  } catch (err) {

  }
  const title = await page.title();
  const el = await page.$(process.argv[3]);
  const htmlVal = await page.$eval(process.argv[3], el => el.innerHTML);
  let md5sum = crypto.createHash('md5');
  md5sum.update(htmlVal);
  let hash = md5sum.digest('hex');

  const img = await el.screenshot({ encoding: 'base64' });
  await browser.close();
  console.log(`<img src="data:image/png;base64,${img}"/>\n${hash}\n${title}`);

})();