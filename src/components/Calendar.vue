<template>
  <v-calendar :attributes='attributes'>
  </v-calendar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'attributes'
    ])
  },
  methods: {
    log: function (message, event) {
    // now we have access to the native event
      // if (event) event.preventDefault()
      console.log(message, event)
    }
  }
}
</script>

<style>
</style>
