const browser = require('webextension-polyfill');

let feedData;
let feedOptions;

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
 * @param {Number} associatedFeed id
 * @returns {Object|undefined} associated feed from feedOptions
 */
export function getAssociatedOrigin(associatedFeed) {
    return feedOptions.filter(e => e.id === associatedFeed);
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
    return new Date(feedItem);
}

browser.storage.onChanged.addListener(preloadData);
