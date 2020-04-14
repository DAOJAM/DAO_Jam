<template>
  <div class="stat">
    <g-header />
    <div class="list">
      <minetoken />
    </div>
  </div>
</template>

<script>
import minetoken from '@/components/edit_minetoken.vue'

export default {
  components: {
    minetoken
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.stat {
  padding: 60px 0 0 0;
  background-color: #0e2144;
  align-content: center;
  min-height: calc(100% - 60px - 120px);
}
.list {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  list-style: none;
  box-sizing: border-box;
}
</style>