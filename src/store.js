import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loading: true,
    odata: [],
    atts: []
  },
  getters: {
    getAtts (state) {
      return state.atts
    }
  },
  mutations: {
    updateAtts (state) {
      let i = 0
      state.odata.forEach((ticket) => {
        state.atts.splice(i, -1, {
          dates: new Date(ticket.ProgramEventsStartdate),
          dot: 'red',
          customData: {
            programEventsStarttime: ticket.ProgramEventsStarttime,
            programEventsEndtime: ticket.ProgramEventsEndtime,
            programEventsSystemrecordID: ticket.ProgramEventsSystemrecordID,
            blackbaudLink: `https://17197.blackbaudhosting.com/17197/sslpage.aspx?pid=196&tab=2&txobjid=${ticket.ProgramEventsSystemrecordID}`
          },
          popover: {
            label: '',
            visibility: 'focus',
            hideIndicator: false
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
