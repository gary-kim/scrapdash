<template>
    <div>
        <div class="title">
            <h1>Scrapdash Feed</h1>
        </div>
        <template v-for="feed in currentFeed">
            <FeedEvent :current="feed" :key="feed" />
        </template>
    </div>
</template>
<script>
import * as helpers from '../../js/helpers';
import FeedEvent from "./FeedEvent";
const browser = require('webextension-polyfill');

export default {
    name: "Feed",
    components: {
        FeedEvent
    },
    data() {
        return {
            feed: helpers.feed
        }
    },
    computed: {
        currentFeed() {
            return this.feed.data.slice().reverse();
        }
    }
}
</script>
<style lang="less" scoped>
.title {
    padding: 10px;
    border-radius: 7px;
    background-color: #FFFFFF;
    box-shadow: 2px 2px 0px 0px #52BFB9;
    border: 1px solid #52BFB9;
    background: rgba(255, 255, 255, 0.75);
    width: max-content;
    margin-bottom: 15px;

    h1 {
        margin: 0;
    }
}
</style>
