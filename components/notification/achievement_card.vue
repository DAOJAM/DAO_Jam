<template>
  <div class="fl ac jsb card">
    <div class="fl ac">
      <img
        :src="achievement1"
        alt="achievement"
        class="card-img"
      >
      <div>
        <p class="card-name">
          Braver I <span>you get this achievement</span>
        </p>
        <time class="card-time">2hour ago</time>
      </div>
    </div>
    <el-button 
      size="small"
      type="primary"
    >
      <svg-icon icon-class="check" />
      Check
    </el-button>
  </div>
</template>


<script>
import achievement1 from '@/assets/img/achievement1.png'

export default {
  data() {
    return {
      achievement1
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  background: rgba(19, 45, 94, 1);
  border-radius: 8px;
  padding: 20px;
  .components-avatar {
    width: 40px;
    height: 40px;
  }
}
.card-img {
  height: 60px;
  margin-right: 10px;
}
.card-name {
  padding: 0;
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 22px;
  span {
    font-size: 14px;
    font-weight: 400;
    color: rgba(178, 178, 178, 1);
    line-height: 20px;
  }
}
.card-time {
  font-size: 14px;
  font-weight: 400;
  color: rgba(178, 178, 178, 1);
  line-height: 20px;
}
</style>