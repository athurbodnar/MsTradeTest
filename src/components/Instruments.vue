<template>
  <div class="instruments">
    <div class="row row-header">
      <div class="row__element row-header__element">
        Symbol
      </div>
      <div class="row__element row-header__element">
        Price
      </div>
    </div>
    <div
            v-for="(item, index) in instruments"
            :key="`${index}-item`"
            class="row"
            :class="focusedRowIndex === index ? 'row-focused' : ''"
            @click="changeSelectedQuote(item.symbol, index)"
    >
      <div class="row__element">{{item.symbol}}</div>
      <div class="row__element">{{item.price}}</div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
export default {
  data() {
    return {
      initialized: false,
      focusedRowIndex: 0
    }
  },
  methods: {
    ...mapActions(['getInstruments', 'selectQuote']),
    changeSelectedQuote(symbol, index) {
      this.selectQuote(symbol)
      this.focusedRowIndex = index
    }
  },
  computed: {
    ...mapGetters(['instruments'])
  },
  created() {
      this.getInstruments()
  },
  watch: {
    instruments() {
      if(!this.initialized) {
        this.selectQuote(this.instruments[0].symbol)
      }
    }
  }
}
</script>
<style>
  .instruments {
    overflow: scroll;
    overflow-x: hidden;
  }

</style>