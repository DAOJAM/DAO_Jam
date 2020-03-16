<template>
  <div>
    <div class="user-list">
      <h2 class="user-title">
        Detail
      </h2>
      <!-- todo -->
      <div class="detail" />
    </div>
  </div>
</template>

<style lang="less" scoped>
// common
.user-list {
  margin: 40px 0 0 0;
}
.user-title {
  padding: 0;
  margin: 0;
  font-size:20px;
  font-weight:500;
  color:rgba(255,255,255,1);
  line-height:28px;
}
.user-not {
  font-size: 16px;
  padding: 0;
  margin: 0;
  color: #fff;
}

// common end
.detail {
  background:rgba(19,45,94,1);
  border-radius:8px;
  margin-top: 20px;
  height: 500px;
}
</style>