<template>
    <div>
        <div v-for="(origin, index) in origins" :key="origin.id">
            <md-card>
                <md-card-header>
                    <div class="md-title">{{ origin.url }}</div>
                </md-card-header>
                <md-card-content>
                    Selector: {{ origin.selector }}
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

<style scoped>

</style>
