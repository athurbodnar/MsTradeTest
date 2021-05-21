import Vue from 'vue'
import Vuex from 'vuex'
import {getRequest, concatArrays, postRequest} from '@/services/shared'
let socket = new WebSocket("wss://testnet.bitmex.com/realtime/")
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initialInstruments: [],
    concatedInstruments: [],
    selectedQuote: [],
    selectedSymbol: '',
    ordersHistory: []
  },
  getters: {
    instruments(state) {
      return state.concatedInstruments
    },
    ordersHistory(state) {
      return state.ordersHistory
    },
    quoteHistory(state) {
      return state.selectedQuote
    }
  },
  mutations: {
    SET_INSTRUMENTS(state, payload) {
      state.initialInstruments = payload
    },
    UPDATE_INSTRUMENT(state, payload) {
        state.concatedInstruments.map(item => {
            if(item.symbol === payload[0].symbol)
          item.price = payload[0].markPrice
        })
    },
    SET_SELECTED_QUOTE(state, payload) {
      state.selectedQuote = payload
    },
    SET_SELECTED_SYMBOL(state, payload) {
      state.selectedSymbol = payload
    },
    INSERT_QUOTE_ELEMENT(state, payload) {
      state.selectedQuote.unshift(payload)
    },
    SET_ORDERS_HISTORY(state, payload) {
      state.ordersHistory = payload
    },
    SET_CONCATED_INSTRUMENTS(state, payload) {
      state.concatedInstruments = concatArrays(state.initialInstruments, payload)
      state.initialInstruments = []
      state.concatedInstruments.map(item => {
        state.initialInstruments[item.symbol] = true
      })
    }
  },
  actions: {
    getInstruments({state, commit}) {
      getRequest('/instrument/active').then(res => {
         socket.send(`{"op": "subscribe", "args": "instrument"}`);
          commit('SET_INSTRUMENTS', res.data)
       })
      socket.onmessage = function(event) {
        if (JSON.parse(event.data).action === 'partial' && JSON.parse(event.data).table === "instrument") {
          commit('SET_CONCATED_INSTRUMENTS', JSON.parse(event.data).data)
        }

        if (JSON.parse(event.data).action === 'update') {
          if(state.initialInstruments[JSON.parse(event.data).data[0].symbol]) {
            commit('UPDATE_INSTRUMENT', JSON.parse(event.data).data)
          }
        }
        if(JSON.parse(event.data).table === 'tradeBin1m' && JSON.parse(event.data).action === 'insert') {
          commit('INSERT_QUOTE_ELEMENT', JSON.parse(event.data).data[0])
        }
      }
    },
    selectQuote({commit}, quote) {

      getRequest(`/trade/bucketed?binSize=1m&partial=false&count=100&reverse=true&symbol=${quote}`).then(res => {
        commit('SET_SELECTED_SYMBOL', quote)
        commit('SET_SELECTED_QUOTE', res.data)
      }).then( () => {
        socket.send(`{"op": "subscribe", "args": "tradeBin1m:${quote}"}`)
      })
    },
    postOrder({state}, data) {
      postRequest('/order', {
        ordType: "Market",
        symbol: state.selectedSymbol,
        orderQty: data.quantity,
        side: data.action
      })
    },
    getOrdersHistory({commit}) {
      getRequest('/order').then(res => {
        commit('SET_ORDERS_HISTORY', res.data)
      })
    }
  },
  modules: {
  }
})
