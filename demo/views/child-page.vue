<template>
    <div class="main">
      Hello, I am the child page.<button @click="back">click me to back to my parent</button>
    </div>
</template>

<script>
/* eslint no-return-assign: 0 */
export default {
  methods: {
    back (id) {
      this.$router.back()
    }
  }
}
</script>

<style lang="less">
</style>
