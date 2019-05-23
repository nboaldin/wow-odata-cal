import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loading: true,
    odata: [],
    attributes: []

  },
  getters: {
    getAtts (state) {
      return state.attributes
    }
  },
  mutations: {
    updateAtts (state) {
      let i = 0
      state.odata.forEach((ticket) => {
        state.attributes.splice(i, -1, {
          date: new Date(ticket.ProgramEventsStartdate),
          dot: 'red',
          customData: {
            programEventsSystemrecordID: ticket.ProgramEventsSystemrecordID
          }
        })
        i++
      })
    },
    updateOdata (state, odata) {
      state.odata = odata
    },
    changeLoadingState (state, loading) {
      state.loading = loading
    }

  },
  actions: {
    loadData ({ commit }) {
      axios.get('https://blackbaud-odata-cal-bizcswpdjy.now.sh')
        .then((response) => {
          commit('updateOdata', response.data)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          commit('changeLoadingState', false)
          commit('updateAtts')
        })
    }

  }
})
store.dispatch('loadData')

export default store
