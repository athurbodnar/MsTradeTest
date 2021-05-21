<template>
    <div class="quotes-history">
            <div class="row row-header">
                <div class="row__element">Time</div>
                <div class="row__element">Open</div>
                <div class="row__element">High</div>
                <div class="row__element">Low</div>
                <div class="row__element">Close</div>
                <div class="row__element">Gross</div>
            </div>
            <div v-for="(item, index) in quoteHistory" :key="`${index}-key`" class="row">
                <div class="row__element">{{item.timestamp}}</div>
                <div class="row__element">{{item.open}}</div>
                <div class="row__element">{{item.high}}</div>
                <div class="row__element">{{item.low}}</div>
                <div class="row__element">{{item.close}}</div>
                <div class="row__element">{{item.trades}}</div>
            </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        computed: {
            ...mapGetters(['quoteHistory'])
        }
    }
</script>
<style>
    .quotes-history {
        overflow: scroll;
        overflow-x: hidden
    }
    .quotes-history > div > div:first-child {
        width: 100%
    }
</style>