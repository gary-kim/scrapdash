<template>
    <Draggable v-model="options">
        <FeedEvent v-for="e in options" :key="e.id" :current="getLatest(e)" />
    </Draggable>
</template>

<script>
import FeedEvent from "./FeedEvent";
import Draggable from "vuedraggable";
import * as helpers from "../../js/helpers";
export default {
    name: "DashboardInterface",
    components: {
        FeedEvent,
        Draggable
    },
    data() {
        return {
            feed: helpers.feed
        }
    },
    computed: {
        options: {
            get() {
                return this.feed.options
            },
            set(e) {
                helpers.setFeedOptions(e);
            }
        }
    },
    methods: {
        getLatest(feedOption) {
            return this.feed.data[feedOption.latestData];
        }
    }
}
</script>

<style lang="less" scoped>

</style>
