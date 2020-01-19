const browser = require('webextension-polyfill');
const getInRange = require('get-in-range');

export let feed = {
    data: [],
    options: [],
    latestData: [],
    settings: {},
};

/**
 * Update cached feed info
 */
async function preloadData() {
    const data = await browser.storage.local.get({feedData: [], feedOptions: [], latestData: [], settings: { "dashboardMax": 1, "serverURL": "http://localhost:3000", "serverSecret": "" }});
    feed.data = data.feedData;
    feed.options = data.feedOptions;
    feed.latestData = data.latestData;
    feed.settings = data.settings;
}

preloadData();

export function getFeedData() {
    return feed.data;
}

export function getFeedOptions() {
    return feed.options;
}

/**
 * Set feed options
 * @param feedOptions
 */
export function setFeedOptions(feedOptions) {
    browser.storage.local.set({"feedOptions": JSON.parse(JSON.stringify(feedOptions))});
}

export function setDashboardMax(val) {
    feed.settings.dashboardMax = getInRange(val, 1, 8);
    browser.storage.local.set({settings: JSON.parse(JSON.stringify(feed.settings))});
}

export function setSettings(settings) {
    browser.storage.local.set({settings: JSON.parse(JSON.stringify(settings))});
}

/**
 * Get the current epoch value.
 * @returns {number}
 */
export function currentEpoch() {
    return new Date().valueOf() / 1000;
}

/**
 * Get a date object that corresponds to
 * @param feedItem
 */
export function getFeedDate(feedItem) {
    return new Date(feedItem.time * 1000);
}

browser.storage.onChanged.addListener(preloadData);
