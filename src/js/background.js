import * as helpers from './helpers.js';
const browser = require('webextension-polyfill');

const hostName = 'io.github.tcode2k16.scrapdash';


chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(tab.id, {
        file: 'js/main.js',
    });
});


(async function () {
    console.log('started');

    let queue = [];
    let {
        latestData
    } = await browser.storage.local.get({ latestData: {} });



    while (true) {
        if (queue.length < 1) {
            let result = await browser.storage.local.get({ feedOptions: [] });
            for (let each of result.feedOptions) queue.unshift(each);
        }
        // console.log(latestData);
        if (queue.length > 0) {
            let curr = queue.pop();

            if (curr.type === 'screenshot') {
                let cookies = await browser.cookies.getAll({ url: curr.url });
                console.log('hi');
                // let res = await browser.runtime.sendNativeMessage(hostName, {
                //     cmd: 'js',
                //     param: {
                //         url: curr.url,
                //         selector: curr.selector,
                //         cookies: btoa(JSON.stringify(cookies)),
                //     }
                // });

                const rawResponse = await fetch('http://localhost:3000', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        url: curr.url,
                        selector: curr.selector,
                        cookies: btoa(JSON.stringify(cookies)),
                    })
                });
                const res = await rawResponse.json();
                const data = res.data;
                const hash = res.hash;
                const title = res.title;



                if ((!(curr.id in latestData)) || hash !== latestData[curr.id].hash) {
                    latestData[curr.id] = {
                        time: helpers.currentEpoch(),
                        data,
                        hash,
                        title,
                    };
                    await browser.storage.local.set({
                        latestData
                    });
                }
            }
        }
    }
})();

// const update = async function () {
//     let { feedOptions, latestData } = await browser.storage.local.get({ feedOptions: [], latestData: {} });
//     console.log(feedOptions);


//     for (let i = 0; i < feedOptions.length; i++) {
//         let each = feedOptions[i];

//         if (each.type === 'screenshot') {
//             let cookies = await browser.cookies.getAll({ url: each.url });
//             console.log('hi');

//             console.log(cookies);

//             let res = await browser.runtime.sendNativeMessage(hostName, {
//                 cmd: 'js',
//                 param: {
//                     url: each.url,
//                     selector: each.selector,
//                     cookies: btoa(JSON.stringify(cookies)),
//                 }
//             });
//             const data = res.result;
//             const hash = res.hash;
//             const title = res.title;
//             console.log(data);
//             console.log(each);



//             if ((!(each.id in latestData)) || hash !== latestData[each.id].hash) {
//                 latestData[each.id] = {
//                     time: helpers.currentEpoch(),
//                     data,
//                     hash,
//                     title,
//                 };
//             }
//         }
//     }
//     await browser.storage.local.set({
//         latestData
//     });
//     // setTimeout(update,0);
//     update();
// }

// update();

