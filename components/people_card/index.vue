<template>
  <div class="card">
    <div class="card-cover">
      <img
        :src="card.photoUrl"
        alt="cover"
      >
    </div>
    <div class="card-content">
      <p class="card-name">
        {{ card.name || '&nbsp;' }}
      </p>
      <p class="card-job">
        CEO of The Best DJ Company
      </p>
      <p class="card-des">
        From France, and he is very famous.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  },
}
</script>


<style lang="less" scoped>
.card {
  width: 200px;
  height: 400px;
  background-color: #132d5e;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
}
.card-cover {
  height: 200px;
  border-bottom: 1px solid #959595;
  box-sizing: border-box;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.card-content {
  padding: 20px;
  .card-name {
    padding: 0;
    margin: 0 0 0;
    font-size: 16px;
    color: rgba(255, 255, 255, 1);
    line-height: 22px;
  }
  .card-job {
    padding: 0;
    margin: 10px 0 0;
    font-size: 16px;
    font-weight: 400;
    color: rgba(247, 181, 0, 1);
    line-height: 22px;
  }
  .card-des {
    padding: 0;
    margin: 10px 0 0;
    font-size: 14px;
    font-weight: 400;
    color: rgba(178, 178, 178, 1);
    line-height: 20px;
  }
}
</style>