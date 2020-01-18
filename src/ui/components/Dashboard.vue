<template>
    <div>
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <span class="md-title">Scrapdash {{ modeName }}</span>
                    <md-tabs class="md-primary">
                        <md-tab id="tab-feed" md-label="Feed" @click="mode = Constants.Dashboard.Mode.FEED"></md-tab>
                        <md-tab id="tab-dashboard" md-label="Dashboard" @click="mode = Constants.Dashboard.Mode.Dashboard"></md-tab>
                    </md-tabs>
                </div>
            </md-app-toolbar>
            <md-app-content>
                <template v-if="mode === Constants.Dashboard.Mode.FEED">
                    <Feed />
                </template>
            </md-app-content>
        </md-app>
    </div>
</template>
<script>
    import * as helpers from '../../js/helpers';
    import Constants from "../../js/Constants";
    import Feed from "./Feed";
    const browser = require('webextension-polyfill');

    export default {
        name: "Dashboard",
        components: {
            Feed
        },
        data() {
            return {
                mode: Constants.Dashboard.Mode.FEED,
                Constants: Constants
            }
        }
    }
</script>
<style lang="less" scoped>
.md-app-content {
    background-color: rgb(30, 34, 29) !important;
}
</style>
