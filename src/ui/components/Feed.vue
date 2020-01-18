<template>
    <div>
        <h1>Scrapdash Feed</h1>
        <template v-for="feed in currentFeed">
            <FeedEvent :current="feed" />
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
            currentFeed: helpers.feedData
        }
    }
}
</script>
<style lang="less" scoped>

</style>
