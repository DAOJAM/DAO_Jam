<template>
  <nav class="nav">
    <a
      v-for="(item, index) in user"
      :key="index"
      :class="tabPageCopy === index && 'active'"
      @click="tabPageCopy = index"
    >
      {{ item.title }}
    </a>
  </nav>
</template>

<script>
export default {
  props: {
    tabPage: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tabPageCopy: Number(this.$route.query.tab) || 0
    }
  },
  computed: {
    user() {
      return [
        { title: 'Fan票持仓', icon: 'minetokens_details' },
        { title: 'Fan票流水', icon: 'minetokens_detail' },
        { title: '流动金持仓', icon: 'minetokens_details' },
        { title: '流动金流水', icon: 'minetokens_detail' }
      ]
    }
  },
  watch: {
    tabPage(val) {
      this.tabPageCopy = val
    },
    // 子组件 改变的就是这段代码
    tabPageCopy(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
.nav {
  margin: 0 auto;
  padding: 0;
  display: flex;
  a {
    text-decoration: none;
    margin-right: 40px;
    cursor: pointer;
    color: #B2B2B2;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    font-weight:400;
    line-height:28px;

    &:last-child {
      margin-right: 0;
    }
    &.active {
      color:#fff;
    }
  }
}

.icon-tokens {
  width:60px;
  height:60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  &.minetokens_detail{
    background: #542DE0;
  }
  &.minetokens_details{
    background: #F7B500;
  }
}
</style>
