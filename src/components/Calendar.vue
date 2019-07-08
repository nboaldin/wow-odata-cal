<template>
  <v-calendar
    :attributes='getAtts'
    :min-date='new Date()'
    :max-date='new Date(Date.parse(getAtts[getAtts.length-1].dates))'
    inline>
  <div
    slot="day-content"
    slot-scope="{ day }"
    class="">
      <p>{{day.day}}</p>
      <a class="get-tickets" :href="day.attributes[0].customData.blackbaudLink" target='_blank'>Get Tickets</a>
      <p class="get-tickets-time">{{getFormattedTime(day.attributes[0].customData.StartTime)}} - {{getFormattedTime(day.attributes[0].customData.EndTime)}}</p>
      <p class="get-tickets-time" >Adult: {{day.attributes[0].customData.AdultPrice}}</p>
      <p class="get-tickets-time" >Child: {{day.attributes[0].customData.ChildPrice}}</p>
  </div>
  <!-- <div
  :min-date='new Date()'
  :max-date='new Date(Date.parse(getAtts[getAtts.length-1].dates))'
    slot="day-popover"
    slot-scope="{ day }"
    class="">
      <a class="get-tickets" :href="day.attributes[0].customData.blackbaudLink" target='_blank'>Get Tickets</a>
      <p class="get-tickets-time">{{getFormattedTime(day.attributes[0].customData.programEventsStarttime)}} - {{getFormattedTime(day.attributes[0].customData.programEventsEndtime)}}</p>
  </div> -->
  </v-calendar>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'atts'
    ]),
    ...mapGetters([
      'getAtts'
    ])

  },
  methods: {
    log: function (message, event) {
    // now we have access to the native event
      // if (event) event.preventDefault()
      console.log(message, event)
    },
    getFormattedTime  (fourDigitTime) {
      var hours24 = parseInt(fourDigitTime.substring(0, 2))
      var hours = ((hours24 + 11) % 12) + 1
      var amPm = hours24 > 11 ? 'pm' : 'am'
      var minutes = fourDigitTime.substring(2, 4)

      return hours + ':' + minutes + amPm
    }
  }
}
</script>

<style>
body .vc-container {
  --day-content-width: 4.8rem;
  --day-content-height: 4.8rem;
  --day-content-margin: 2.1rem;
  --dot-diameter: 7px;
  font-family: 'Josefin Sans'
}
body .vc-bg-white {
  background-color: #0b123a;
}
body .vc-rounded-lg {
  border-radius: 0px;
}
body .vc-text-gray-900 {
  color: #ffffff;
}
body .vc-text-sm {
  font-size: 2.175rem;
}
body .vc-text-lg {
  font-size: 4.125rem;
}
body .get-tickets {
  font-family: 'Josefin Sans';
  font-size: 1.875rem;
  line-height: 1.3em;
  width: 100%;
  display: inline-block;
  text-align: center;
}
body .get-tickets-time {
  font-size: 1.5rem;
  margin: 0;
  text-align: center;
}
body .vc-bg-red-600 {
  background-color: #FDC133;
}
body .vc-items-center {
  font-size: 1.2rem;
}
body .vc-text-gray-800 {
  color: #FDC133;
}
body .vc-dots {
  margin-bottom: 25px;
}
body .vc-grid-container .vc-grid-cell {
  outline: 1px solid;
  outline-color: #ffffff2a;
}
body .vc-day {
  padding: 5px;
}

@media (max-width: 767px) {
  body .vc-reset, .vc-reset * {
    line-height: 1 !important;
  }
  body .vc-container {
    --day-content-width: 1.9rem;
    --day-content-height: 1.9rem;
    --day-content-margin: 1.1rem;
    --dot-diameter: 5px;
  }
  body .vc-text-lg {
  font-size: 3.125rem;
  }
  body .vc-dots {
  margin-bottom: 5px;
  }
  body .get-tickets {
  font-size: 0.78rem;
  line-height: 1.4 !important;
  }
  body .get-tickets-time {
  font-size: 1rem;
  /* line-height: 1 !important; */
  }
  body .vc-day {
    padding: 1px;
  }
  /* body .vc-grid-cell p,
  body .vc-grid-cell .vc-weekday,
  body .vc-header .vc-title {
    line-height: 1 !important;
  } */

}
</style>
