<template>
    <md-card>
        <md-card-header>
            <div class="md-title">{{ associatedFeed }}</div>
            <div v-if="'time' in current" class="md-subhead">{{ time }}</div>
        </md-card-header>
        <md-card-content v-if="'data' in current">
            <img :src="'data:image/png;base64,' + current.data" />
        </md-card-content>
        <md-card-content v-if="! ('data' in current)">
            Data is currently being fetched
        </md-card-content>
    </md-card>
</template>

<script>
import * as helpers from '../../js/helpers';
import moment from 'moment';


export default {
    name: "FeedEvent",
    props: {
        current: {
            type: Object,
            required: true
        },
        dashboardMode: {
            type: Boolean,
            default: true,
            required: true
        },
        feed: {
            type: Object
        }
    },
    computed: {
        time() {
            return moment(helpers.getFeedDate(this.current)).fromNow();
        },

        associatedFeed() {
            if (!this.feed) {
                return "Remote Lost";
            }
            return this.current.title || this.feed.url;
        }
    }
}
</script>

<style lang="less" scoped>
.md-card {
    margin: 10px;

    .md-card-header * {
        display: block ruby;
        overflow-x: hidden;
        text-overflow: ellipsis;
    }
}
</style>
