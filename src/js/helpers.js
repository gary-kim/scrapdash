const browser = require('webextension-polyfill');

export let feedData;
export let feedOptions;

/**
 * Update cached feed info
 */
async function preloadData() {
    const data = await browser.storage.local.get({feedData: [], feedOptions: []});
    feedData = data.feedData;
    feedOptions = data.feedOptions;
}

preloadData();

/**
 * Get the feed associated with a feedItem
 * @param {Number} feedItem
 * @returns {Object|undefined} associated feed from feedOptions
 */
export function getAssociatedOrigin(feedItem) {
    return feedOptions.filter(e => e.id === feedItem.associatedFeed)[0];
}

export function getFeedData() {
    return feedData;
}

export function getFeedOptions() {
    return feedOptions;
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
