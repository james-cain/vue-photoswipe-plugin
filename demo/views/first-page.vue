<template>
  <v-page class="api-list" effect="slid">
    <div class="main">
      Hello, I am the first page.<button @click="next">click me to change to my child page</button>
    </div>
  </v-page>
</template>

<script>
import '../../dist/vue-animate-page.min.css'
import VPage from '../../dist/vue-animate-page.min.js'

/* eslint no-return-assign: 0 */
export default {
  components: {
    VPage
  },
  methods: {
    next (id) {
      this.$router.push({ name: 'childpage'})
    }
  }
}
</script>

<style lang="less">
</style>
