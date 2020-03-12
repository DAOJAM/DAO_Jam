<template>
  <div>
    <div class="user-list">
      <h2 class="user-title">DAOs That He/She Organized</h2>
      <!-- todo -->
      <div class="dao">
        <div class="dao-list">
          <router-link :to="{name: 'token-id', params: { id: tokenData.id }}" class="dao-block not">
            <avatar :src="cover(tokenData.logo)"></avatar>
            <p>{{tokenData.symbol}}</p>
          </router-link>
        </div>
        <p class="user-not" v-if="!tokenData.id">暂无</p>
      </div>
    </div>

    <div class="user-list">
      <h2 class="user-title">DAOs That He/She Joined</h2>
      <!-- todo -->
      <div class="dao">
        <div class="dao-list">
          <router-link :to="{name: 'token-id', params: { id: item.id }}"  class="dao-block" v-for="(item, index) in pull.list" :key="index">
            <avatar :src="cover(item.avatar)"></avatar>
            <p>{{item.symbol}}</p>
          </router-link>
        </div>
        <p class="user-not" v-if="pull.list.length === 0">暂无</p>
        <user-pagination
          v-show="!pull.loading"
          :current-page="pull.currentPage"
          :params="pull.params"
          :api-url="pull.apiUrl"
          :page-size="pull.size"
          :total="pull.total"
          :need-access-token="true"
          @paginationData="paginationData"
          @togglePage="togglePage"
          class="use-pagination"
        />
      </div>
    </div>
  </div>
</template>

<script>
import avatar from '@/common/components/avatar'
import userPagination from '@/components/user/user_pagination.vue'

export default {
  components: {
    avatar,
    userPagination
  },
  data() {
    return {
      tokenData: {},
      pull: {
        loading: false,
        params: {
          userId: this.$route.params.id,
          pagesize: 20,
          order: 0
        },
        apiUrl: 'daothonTokenlist',
        list: [],
        currentPage: Number(this.$route.query.page) || 1,
        size: 20,
        total: 0,
      },
    }
  },
  mounted() {
    if (process.browser) {
      this.tokenUserId(this.$route.params.id)
    }
  },
  methods: {
    cover (src) {
      return src ? this.$ossProcess(src, { h: 120 }) : ''
    },
    async tokenUserId(id) {
      await this.$API
        .tokenUserId(id)
        .then(res => {
          if (res.code === 0 && res.data.id > 0) {
            this.tokenData = res.data
          } else console.log(res.message)
        })
        .catch(err => console.log('get token user error', err))
    },
    paginationData(res) {
      this.pull.list = res.data.list
      this.pull.total = res.data.count || 0
      this.pull.loading = false
    },
    togglePage(i) {
      this.pull.loading = true
      this.pull.list = []
      this.pull.currentPage = i

      const query = Object.assign({}, this.$route.query)
      const pageQuery = Object.assign(query, { page: i })
      
      this.$router.push({
        query: pageQuery
      })
    },
  }
}
</script>

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

.dao {
  margin-top: 20px;
  .dao-list {
    &::after {
      display: block;
      content: '';
      width: 0;
      height: 0;
      clear: both;
    }
  }
  .dao-block {
    display: block;
    float: left;
    margin-bottom: 40px;
    margin-right: 40px;
    width: 90px;
    text-align: center;
    &:nth-last-child(1) {
      margin-right: 0;
    }
    &.not {
      margin-bottom: 0;
    }
  }
  .components-avatar {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    margin: 0 auto;
  }
  p {
    font-size:16px;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:22px;
    padding: 0;
    margin: 10px 0 0;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>