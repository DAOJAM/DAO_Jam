<template>
  <userLayout>
    <template slot="main">
      <points />
    </template>
    <template slot="nav">
      <myAccountNav />
    </template>
  </userLayout>
</template>

<script>
import userLayout from '@/components/user/user_layout.vue'
import myAccountNav from '@/components/my_account/my_account_nav.vue'
import points from '@/components/points/index.vue'
export default {
  components: {
    userLayout,
    myAccountNav,
    points
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.cny-main {
  background-color: #122d5e;
  padding: 20px;
  border-radius: @br10;
  box-sizing: border-box;
  margin-bottom: 20px;
  color: white;
  h2 {
    font-weight: bold;
    font-size: 20px;
    line-height:28px;
    padding-left: 10px;
    margin: 0 0 20px;
  }
  p {
    font-size:16px;
    padding-left: 10px;
    line-height:30px;
    margin: 0 0 20px;
    &.no-bottom {
      margin: 0;
    }
  }
}
</style>
