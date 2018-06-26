<template>
  <div id="app">
    <router-view class="main-view"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style lang="less">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.main {
  position: relative;
  max-width: 1024px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

html, body {
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  word-wrap: break-all;
}
body {
  margin: 0;
  padding: 0;
  background-color: #f8f8f8;
}
</style>
