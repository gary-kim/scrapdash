<template>
    <div>
        <h5>THis is a feed</h5>
        <h3>{{ associatedFeed }} | {{ time }}</h3>
        <div>{{ current.data }}</div>
    </div>
</template>

<script>
import * as helpers from '../../js/helpers';


export default {
    name: "FeedEvent",
    props: {
        current: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            associatedFeed: helpers.getAssociatedOrigin(this.current),
            time: helpers.getFeedDate(this.current),
        }
    }
}
</script>

<style scoped>

</style>
