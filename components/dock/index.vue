<template>
  <div
    v-if="isLevelOnePage"
    class="dock-bg"
  >
    <div class="fl dock">
      <n-link
        v-for="(page, item) in pageList"
        :key="item"
        :to="{name: page.name}"
        tag="div"
        class="dock-link"
        :class="$route.name === page.name && 'active'"
      >
        <i :class="page.icon" />
        <p>{{ page.label }}</p>
      </n-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageList: [
        {
          name: 'article',
          label: 'HOME',
          icon: 'el-icon-s-home'
        },
        {
          name: 'daos',
          label: 'PROJECTS',
          icon: 'el-icon-menu'
        },
        {
          name: 'stat',
          label: 'LEADERBOARD',
          icon: 'el-icon-s-marketing'
        },
        {
          name: 'tasks',
          label: 'TASKS',
          icon: 'el-icon-s-claim'
        }
      ]
    }
  },
  computed: {
    isLevelOnePage() {
      return  this.pageList.find(page => page.name === this.$route.name) ? true : false
    }
  }
}
</script>


<style lang="less" scoped>
.dock-bg {
  background: #372ba1;
  width: 100%;
  height: 60px;
}
.dock {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2;
  padding: 0 20px;
  background: rgba(98, 54, 255, 0.1);
  transition: all 0.3s;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  overflow: hidden;
  color: white;
  justify-content: space-around;
  align-items: center;
  &-link {
    cursor:pointer;
    text-align: center;
    font-size: 25px;
    &.active {
      color: #6236ff;
    }
    p {
      margin: 5px 0 0;
      font-size: 12px;
    }
  }
}

@media screen and (min-width: 760px) {
  .dock-bg {
    display: none;
    opacity: 0;
    visibility: hidden;
  }
}
</style>