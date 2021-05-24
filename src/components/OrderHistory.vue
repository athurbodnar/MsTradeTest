<template>
    <div class="orders-history">
        <div class="row row-header">
            <div class="row__element">Order</div>
            <div class="row__element">Symbol</div>
            <div class="row__element">Quantity</div>
            <div class="row__element">Timestamp</div>
            <div class="row__element">Side</div>
            <div class="row__element">Price</div>
            <div class="row__element">Status</div>
        </div>
        <div class="row" v-for="(item, index) in ordersHistory" :key="`${index}-orderHistoryItem`">
            <div class="row__element">{{item.orderID}}</div>
            <div class="row__element">{{item.symbol}}</div>
            <div class="row__element">{{item.orderQty}}</div>
            <div class="row__element">{{item.timestamp}}</div>
            <div class="row__element">{{item.side}}</div>
            <div class="row__element">{{item.price | correctNumber}}</div>
            <div class="row__element">{{item.ordStatus}}</div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: "OrderHistory",
        methods: {
            ...mapActions(['getOrdersHistory'])
        },
        computed: {
            ...mapGetters(['ordersHistory'])
        },
        created() {
            this.getOrdersHistory()
        }
    }
</script>

<style scoped>
.orders-history {
    overflow: scroll;
    overflow-x: hidden
}
.orders-history > div > div:first-child {
    width: 100%;
}
</style>