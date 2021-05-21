<template>
  <div id="app">
    <main-page/>
  </div>
</template>

<script>
import MainPage from './pages/MainPage.vue'

export default {
  name: 'App',
  components: {
    MainPage
  }
}
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }

</style>