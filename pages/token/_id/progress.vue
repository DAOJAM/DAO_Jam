<template>
  <div>
    <div class="token-list">
      <h2 class="token-title">
        Live of development
      </h2>
      <div class="live">
        <div
          v-for="(item, index) in lives"
          :key="index"
          class="live-block"
        >
          <p>{{ item.title }}</p>
          <p>{{ item.content }}</p>
          <p>{{ item.create_time }}</p>
        </div>
        <p
          v-if="lives.length === 0"
          class="token-not"
        >
          暂无
        </p>
      </div>
    </div>

    <div class="token-list">
      <h2 class="token-title">
        Progress of development
      </h2>
      <div class="progress">
        <div
          v-for="(item, index) in news"
          :key="index"
          class="progress-block"
        >
          <p>{{ item.title }}</p>
          <p>{{ item.content }}</p>
          <p>{{ item.create_time }}</p>
        </div>
        <p
          v-if="news.length === 0" 
          class="token-not"
        >
          暂无
        </p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      lives: [],
      news: []
    }
  },
  mounted() {
    this.getLives(this.$route.params.id)
    this.getNews(this.$route.params.id)
  },
  methods: {
    // 得到live
    getLives(id) {
      if (!(~id)) return
      this.$API.minetokenGetLives(id)
        .then(res => {
          if (res.code === 0) {
            this.lives = res.data
          } else {
            this.$message.warning(res.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 得到 news
    getNews(id) {
      if (!(~id)) return
      this.$API.minetokenGetNews(id)
        .then(res => {
          if (res.code === 0) {
            this.news = res.data
          } else {
            this.$message.warning(res.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
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
  font-size: 20px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 28px;
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

.live-block {
  background: rgba(19, 45, 94, 1);
  border-radius: 8px;
  margin: 20px 0 0;
  padding: 10px;
  color: #fff;
}
.progress-block {
  background: rgba(19, 45, 94, 1);
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0 0;
  color: #fff;
  p {
    word-break: break-all;
  }
}
</style>