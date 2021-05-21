<template>
    <div class="form">
        <div class="form__header">Market</div>
        <div class="form__input">
            <span>Quantity</span>
            <input type="number" @input="onInput" value="1" v-model="quantity">
        </div>
        <button @click="makeOrder('buy')" class="form__button">Buy</button>
        <button @click="makeOrder('sell')" class="form__button">Sell</button>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: "Form",
        data() {
            return {
                quantity: 1
            }
        },
        methods: {
            ...mapActions(['postOrder']),
            onInput({ target }) {
                const
                    val = target.value,
                    newVal = 1;

                if (val < 1) {
                    target.value = newVal;
                    target.dispatchEvent(new Event('input'));
                }
            },
            makeOrder(action) {
                if(action === 'buy') {
                    this.postOrder({
                        quantity: this.quantity,
                        action: 'Buy'
                    })
                } else {
                    this.postOrder({
                        quantity: this.quantity,
                        action: 'Sell'
                    })
                }
            }
        },
    }

</script>

<style scoped>
    .form {
        padding: 0 10px;
    }
    .form__header {
        text-align: center;
        margin-top: 30px;
        font-size: 32px;
        font-weight: 600;
    }
    .form__input {
        display: flex;
        margin-top: 50%;
        margin-bottom: 20px;
    }
    .form__input > span {
        display: block;
        margin-right: 15px;
    }
    .form__input > input {
        flex-grow: 1;
    }
    .form__button {
        width: 50%;
    }
</style>