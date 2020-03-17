<template>
  <div />
</template>

<script>
export default {
  middleware: 'redirect',
  mounted() {
    if (process.browser) {
      this.$router.push({name: 'article'})
    }
  }
}
</script>
