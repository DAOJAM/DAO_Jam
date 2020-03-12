<template>
  <div>

    <div class="token-list">
      <h2 class="token-title">Live of development</h2>
      <!-- todo -->
      <div class="live">
        <p class="token-not">暂无</p>
      </div>
    </div>

    <div class="token-list">
      <h2 class="token-title">Progress of development</h2>
      <!-- todo -->
      <div class="progress">
        <p class="token-not">暂无</p>
      </div>
    </div>

  </div>
</template>


<script>
export default {
}
</script>

<style lang="less" scoped>
// common
.token-list {
  margin: 40px 0 0 0;
}
.token-title {
  padding: 0;
  margin: 0;
  font-size:20px;
  font-weight:500;
  color:rgba(255,255,255,1);
  line-height:28px;
}
.token-not {
  font-size: 16px;
  padding: 0;
  margin: 0;
  color: #fff;
}
// common end

.live,
.progress {
  margin-top: 20px;
}
</style>