<template>
  <div id="app">
    <Calendar />
  </div>
</template>

<script>
import Calendar from './components/Calendar.vue'

export default {
  name: 'app',
  components: {
    Calendar
  },
  methods: {

  }

}
</script>

<style>
#app {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-family: 'Josefin Sans'
}
</style>
