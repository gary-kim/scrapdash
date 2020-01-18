import { getAssociatedOrigin } from "../helpers";

export default class FeedItem {

    #date
    #data
    #associatedFeed

    constructor(dataObject) {
        this.#date = new Date(dataObject.time);
        this.#data = dataObject.data;
        this.#associatedFeed = getAssociatedOrigin(dataObject.associatedFeed);
    }

}
