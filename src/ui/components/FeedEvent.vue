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
        }
    },
    data() {
        return {
            associatedFeed: (helpers.getAssociatedOrigin(this.current) || { url: "Remote Lost" }).url,
            time: helpers.getFeedDate(this.current),
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
