<template>
    <div>
        <md-app md-waterfall md-mode="overlap">
            <md-app-toolbar class="md-primary md-large">
                <div class="md-toolbar-row">
                    <span class="md-title">Scrapdash</span>
                    <md-tabs class="md-primary">
                        <md-tab id="tab-dashboard" md-label="Dashboard" @click="mode = Constants.Dashboard.Mode.DASHBOARD" />
                        <md-tab id="tab-feed" md-label="Feed" @click="mode = Constants.Dashboard.Mode.FEED" />
                        <md-tab id="tab-remotes" md-label="Remotes" @click="mode = Constants.Dashboard.Mode.ORIGINS" />
                    </md-tabs>
                </div>
            </md-app-toolbar>
            <md-app-content>
                <template v-if="mode === Constants.Dashboard.Mode.FEED">
                    <Feed />
                </template>
                <template v-else-if="mode === Constants.Dashboard.Mode.DASHBOARD">
                    <DashboardInterface />
                </template>
                <template v-else-if="mode === Constants.Dashboard.Mode.ORIGINS">
                    <Remotes />
                </template>
            </md-app-content>
        </md-app>
    </div>
</template>
<script>
    import * as helpers from '../../js/helpers';
    import Constants from "../../js/Constants";
    import Feed from "./Feed";
    import DashboardInterface from "./DashboardInterface";
    import Remotes from './Remotes';
    const browser = require('webextension-polyfill');

    export default {
        name: "Dashboard",
        components: {
            Feed,
            DashboardInterface,
            Remotes
        },
        data() {
            return {
                mode: Constants.Dashboard.Mode.DASHBOARD,
                Constants: Constants
            }
        }
    }
</script>
<style lang="less" scoped>

</style>
