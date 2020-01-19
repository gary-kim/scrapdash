<template>
    <div>
        <div>
            <label>Remote Server: <input type="text" v-model="settings.serverURL"></label> | <label>Shared Secret: <input type="password" v-model="settings.serverSecret"></label>
        </div>
        <div v-for="(origin, index) in origins" :key="origin.id">
            <md-card>
                <md-card-header>
                    <div class="md-title">{{ origin.url }}</div>
                    <div class="md-subhead">{{ origin.type }} | {{ origin.selector }}</div>
                </md-card-header>
                <md-card-content>
                    Creating a {{ origin.type }} object using <code>{{ origin.selector }}</code>
                </md-card-content>
                <md-card-actions>
                    <md-button @click="remove(index)">Remove</md-button>
                </md-card-actions>
            </md-card>
        </div>
    </div>
</template>

<script>
import * as helpers from '../../js/helpers';

export default {
    name: "Remotes",
    data() {
        return {
            feed: helpers.feed
        }
    },
    computed: {
        origins: {
            get() {
                return helpers.feed.options;
            },
            set(e) {
                helpers.setFeedOptions(e);
            }
        },
        settings: {
            get() {
                return helpers.feed.settings;
            },
            set(e) {
                helpers.setSettings(e);
            }
        }
    },
    methods: {
        remove(index) {
            this.origins.splice(index, 1);
            this.origins = this.origins;
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
