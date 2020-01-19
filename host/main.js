#!/usr/bin/env node

const puppeteer = require('puppeteer');
const crypto = require('crypto');
const express = require('express');
const app = express();
const port = 3000;

function atob(str) {
    return Buffer.from(str, 'base64').toString('binary');
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    app.use(express.json());
    app.post('/', async (req, res) => {

        console.log(req.body);
        // {
        //     selector,
        //     cookies,
        //     url
        // }

        if (req.body.cookies) {
            const cookies = JSON.parse(atob(req.body.cookies)).map(e => ({
                name: e.name,
                value: e.value,
                domain: e.domain,
                path: e.path,
                httpOnly: e.httpOnly,
                secure: e.secure,
            }));
            await page.setCookie(...cookies);
        }
        await page.goto(req.body.url);
        try {
            await page.waitForNavigation({
                timeout: 5000,
                waitUntil: 'domcontentloaded',
            });
        } catch (err) {

        }
        const title = await page.title();
        const el = await page.$(req.body.selector);
        const htmlVal = await page.$eval(req.body.selector, el => el.innerHTML);
        const innerText = await page.$eval(req.body.selector, el => el.innerText);
        let md5sum = crypto.createHash('md5');
        md5sum.update(htmlVal);
        let hash = md5sum.digest('hex');

        const data = req.body.type === 'screenshot'?(await el.screenshot({ encoding: 'base64' })):(innerText);
        // const img = await el.screenshot({ encoding: 'base64', type: 'jpeg', 'quality': 80 });
        // await browser.close();
        // console.log(`<img src="data:image/png;base64,${img}"/>\n${hash}\n${title}`);
        // console.log(`${img}\n${hash}\n${title}`);
        res.json({
            data: data,
            hash,
            title,
        });
    });

    app.listen(port, () => console.log(`Example app listening on port ${port}!`));

})();
