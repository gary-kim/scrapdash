const browser = require('webextension-polyfill');

export let feed = {
    data: [],
    options: [],
    latestData: [],
};

/**
 * Update cached feed info
 */
async function preloadData() {
    const data = await browser.storage.local.get({feedData: [], feedOptions: [], latestData: []});
    feed.data = data.feedData;
    feed.options = data.feedOptions;
    feed.latestData = data.latestData;
}

preloadData();

/**
 * Get the feed associated with a feedItem
 * @param {Object} feedItem
 * @returns {Object|undefined} associated feed from feedOptions
 */
export function getAssociatedOrigin(feedItem) {
    return feed.options.filter(e => e.id === feedItem.associatedFeed)[0];
}

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
    browser.storage.local.set({feedOptions: feedOptions});
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
