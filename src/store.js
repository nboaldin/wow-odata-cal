import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'

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
          dates: new Date(moment(ticket.ProgramEventsStartdate, moment.ISO_8601).toDate()),
          // dot: 'red',
          customData: {
            ProgramEventsStartdate: ticket.ProgramEventsStartdate,
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
    addAllDates (state) {
      state.atts.push({
        dates: { start: null, end: new Date(2019, 31, 12) }
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
      axios.get('https://blackbaud-odata-cal.now.sh')
        .then((response) => {
          commit('updateOdata', response.data)
          // commit('addAllDates')
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          commit('changeLoadingState', false)
          commit('updateAtts')
        })
    }
    // async allDates ({ commit, dispatch }) {
    //   await dispatch('loadData')
    //   commit('addAllDates')
    // }
  }
})
store.dispatch('loadData')

export default store
