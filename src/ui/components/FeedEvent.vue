<template>
    <md-card>
        <md-card-header>
            <div class="md-title">{{ associatedFeed }}</div>
            <div class="md-subhead">{{ time }}</div>
        </md-card-header>
        <md-card-content v-html="current.data" />
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
    data() {
        return {
            time: moment(helpers.getFeedDate(this.current)).fromNow(),
        }
    },
    computed: {
        associatedFeed() {
            if (!this.origin) {
                return "Remote Lost";
            }
            return this.origin.title || this.origin.url;
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
