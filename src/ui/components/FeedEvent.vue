<template>
    <md-card>
        <md-card-header>
            <div class="md-title" :title="associatedFeed" ><a style="color: inherit;" :href="feed.url">{{ associatedFeed }}</a></div>
            <div v-if="'time' in current" class="md-subhead" :title="time">{{ relativeTime }}</div>
        </md-card-header>
        <md-card-content v-if="'data' in current">
            <div v-if="feed.type === Constants.FeedData.Type.SCREENSHOT">
                <div class="images" v-viewer>
                    <img :src="'data:image/png;base64,' + current.data" />
                </div>
            </div>
            <div v-else-if="feed.type === Constants.FeedData.Type.TEXT">
                {{ current.data }}
            </div>
        </md-card-content>
        <md-card-content v-if="! ('data' in current)">
            Data is currently being fetched
        </md-card-content>
    </md-card>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)

import * as helpers from '../../js/helpers';
import moment from 'moment';
import Constants from '../../js/Constants';


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
        relativeTime() {
            return moment(this.time).fromNow();
        },
        time() {
            return helpers.getFeedDate(this.current);
        },
        associatedFeed() {
            if (!this.feed) {
                return "Remote Lost";
            }
            return this.current.title || this.feed.url;
        },
        Constants() {
            return Constants;
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

    .images {
        max-height: 50vh;
        overflow: hidden;
        cursor: pointer;

        img {
            width: 100%;
        }
    }
}
</style>
