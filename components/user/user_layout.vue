<template>
  <div class="user user-layout">
    <g-header />
    <el-row class="user-container mw">
      <el-col :span="6">
        <div class="position-sticky top70">
          <slot name="nav" />
        </div>
      </el-col>
      <el-col :span="18">
        <div :class="needFrame && 'user-main'">
          <slot name="main" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    needFrame: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  .minHeight();
  background-color: #0E2144;
}
.user-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.user-main {
  // width: 890px;
  // height: 998px;
  background-color: #132D5E;
  padding: 20px;
  border-radius: @br10;
  box-sizing: border-box;
  margin-bottom: 120px;
}

.position-sticky {
  margin-top: 0px;
}
</style>
