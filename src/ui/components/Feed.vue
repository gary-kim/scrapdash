<template>
    <div>
        <template v-for="(feed, index) in currentFeed">
            <FeedEvent :current="feed" :key="index" />
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

</style>
