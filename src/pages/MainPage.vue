<template>
    <div class="wrapper">
        <div class="content">
            <instruments/>
            <QuotesHistory/>
            <Form/>
        </div>
        <div class="content content-bottom">
            <OrderHistory />
        </div>

    </div>

</template>

<script>
    import Instruments from "@/components/Instruments";
    import QuotesHistory from "@/components/QuotesHistory";
    import Form from "@/components/Form";
    import OrderHistory from "@/components/OrderHistory";
    export default {
        name: "MainPage.vue",
        components: {
            OrderHistory,
            Form,
            Instruments,
            QuotesHistory
        }
    }
</script>

<style >
    .content {
        display: flex;
        height: 60vh;
    }
    .content > div {
        width: 25%;
    }
    .content > div:nth-child(2) {
        width: 50%;
        border: 1px solid black;
    }
    .content-bottom {
        border-top: none;
        height: 40vh;
        width: 100%;
    }
    .content-bottom > div {
         width: 100%;
     }
    /* Common styles for tables */
    .row {
        display: flex;
    }
    .row-focused {
        background-color: bisque;
    }
    .row__element {
        flex-grow: 1;
        text-align: center;
        width: 50%;
        margin: 5px 0;
    }
    .row-header {
        position: sticky;
        background-color: #2b373d;
        color: white;
        left:0;
        top:0;
    }


</style>