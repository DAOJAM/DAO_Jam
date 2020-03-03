<template>
  <div class="dao">
    <g-header />
    <div class="dao-main">
      <h2 class="dao-title">发现项目</h2>
      <el-row class="dao-content" v-loading="loading">
        <el-col :span="6" v-for="item in tokenList" :key="item.id">
          <router-link class="dao-content__block" :to="{name: 'token-id', params: {id: item.id}}">
            <div class="dao-block">
              <img width="200" :src="cover(item.logo)" alt="avatar" class="dao-block__img">
            </div>
            <p class="dao-block__title">{{item.symbol}}-{{item.name}}</p>
            <p class="dao-block__des">
              {{item.brief || '暂无'}}
            </p>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      tokenList: []
    }
  },
  mounted() {
    if (process.browser) {
      this.loading = true
      this.$API.allToken({
        pagesize: 100
      })
        .then(res => {
          if (res.code === 0) {
            this.tokenList = res.data.list
          } else {
            console.log(res.message)
          }
        })
        .catch(e => {
          console.log(e)
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  methods: {
    cover (src) {
      if (!src) return ''
      return src ? this.$ossProcess(src) : ''
    }
  }
}
</script>

<style lang="less" scoped>
.dao {
  .minHeight();
}

.dao-main {
  width: 1200px;
  min-width: 1100px;
  padding: 0;
  margin: 0 auto 40px;
}
.dao-title {
  padding: 0 15px;
  font-size: 22px;
  font-weight: bold;
  margin: 40px 0 0 0;
}
.dao-content {
  padding: 0 5px;
  min-height: 300px;
  margin-top: 30px;
}
.dao-content__block {
  width: 100%;
  height: 337px;
  margin-bottom: 30px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 5px;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  color: #000;
  text-decoration: none;
  &:hover {
    box-shadow: 0 4px 12px 0 hsla(0,0%,79%,.5);
    transform: translateY(-4px);
    .dao-block  img {
      transform: scale(1.04);
    }
  }
}

.dao-block {
  width: 100%;
  height: 160px;
  overflow: hidden;
  border-bottom: 1px solid #f1f1f1;
  box-sizing: border-box;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all .2s;
  }
}
.dao-block__title {
  font-size: 16px;
  font-weight: bold;
  padding: 0 15px;
  margin: 10px 0;
  color: #000;
}
.dao-block__des {
  font-size: 14px;
  font-weight: 400;
  padding: 0 15px;
  margin: 10px 0;
  line-height: 18px;
  max-height: 108px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;
  color: #b2b2b2;
}
</style>

<style lang="less">
.dao-content .el-col {
  padding: 0 10px;
}
</style>