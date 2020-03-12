<template>
  <div>
    <div class="user-list">
      <h2 class="user-title">Following<span>{{totalFollows}}</span></h2>
      <div class="follow">

        <div class="user-block">
          <router-link :to="{name: 'user-id', params: { id: item.fuid }}" class="user-info" v-for="(item, index) in pullFollowing.list" :key="index">
            <avatar :src="cover(item.avatar)"></avatar>
            <p>{{item.nickname || '暂无昵称'}}</p>
          </router-link>
          <div class="user-not" v-if="pullFollowing.list.length === 0">暂无</div>

        </div>

        <user-pagination
          v-show="!pullFollowing.loading"
          :current-page="pullFollowing.currentPage"
          :params="pullFollowing.params"
          :api-url="pullFollowing.apiUrl"
          :page-size="pullFollowing.size"
          :total="pullFollowing.total"
          :need-access-token="true"
          @paginationData="paginationDataFollowing"
          @togglePage="togglePageFollowing"
          class="use-pagination"
        />

      </div>
    </div>

    <div class="user-list">
      <h2 class="user-title">Followers<span>{{totalFans}}</span></h2>
      <div class="follow">
        <div class="user-block">
          <router-link :to="{name: 'user-id', params: { id: item.uid }}" class="user-info" v-for="(item, index) in pullFollowers.list" :key="index">
            <avatar :src="cover(item.avatar)"></avatar>
            <p>{{item.nickname || '暂无昵称'}}</p>
          </router-link>
          <div class="user-not" v-if="pullFollowers.list.length === 0">暂无</div>

        </div>

        <user-pagination
          v-show="!pullFollowers.loading"
          :current-page="pullFollowers.currentPage"
          :params="pullFollowers.params"
          :api-url="pullFollowers.apiUrl"
          :page-size="pullFollowers.size"
          :total="pullFollowers.total"
          :need-access-token="true"
          @paginationData="paginationDataFollowers"
          @togglePage="togglePageFollowers"
          class="use-pagination"
        />
      </div>
    </div>
  </div>
</template>

<script>
import userPagination from '@/components/user/user_pagination.vue'
import avatar from '@/common/components/avatar'

export default {
  components: {
    userPagination,
    avatar
  },
  data() {
    return {
      totalFollows: 0,
      totalFans: 0,
      pullFollowing: {
        loading: false,
        params: {
          uid: this.$route.params.id,
          pagesize: 20
        },
        apiUrl: 'followsList',
        list: [],
        currentPage: Number(this.$route.query.page) || 1,
        size: 20,
        total: 0,
      },
      pullFollowers: {
        loading: false,
        params: {
          uid: this.$route.params.id,
          pagesize: 20
        },
        apiUrl: 'fansList',
        list: [],
        currentPage: Number(this.$route.query.pages) || 1,
        size: 20,
        total: 0,
      },
    }
  },
  methods: {
    cover (src) {
      return src ? this.$ossProcess(src, { h: 120 }) : ''
    },
    paginationDataFollowing(res) {
      this.totalFollows = res.data.totalFollows

      this.pullFollowing.list = res.data.list
      this.pullFollowing.total = res.data.totalFollows || 0
      this.pullFollowing.loading = false
    },
    togglePageFollowing(i) {
      this.pullFollowing.loading = true
      this.pullFollowing.list = []
      this.pullFollowing.currentPage = i

      const query = Object.assign({}, this.$route.query)
      const pageQuery = Object.assign(query, { page: i })
      
      this.$router.push({
        query: pageQuery
      })
    },
    paginationDataFollowers(res) {
      this.totalFans = res.data.totalFans

      this.pullFollowers.list = res.data.list
      this.pullFollowers.total = res.data.totalFans || 0
      this.pullFollowers.loading = false
    },
    togglePageFollowers(i) {
      this.pullFollowers.loading = true
      this.pullFollowers.list = []
      this.pullFollowers.currentPage = i
      console.log(this.$route.query)

      const query = Object.assign({}, this.$route.query)
      const pageQuery = Object.assign(query, { pages: i })

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
  span {
    font-size: 18px;
    margin-left: 8px;
    color: #fff;
  }
}
.user-not {
  font-size: 16px;
  padding: 0;
  margin: 0;
  color: #fff;
}
// common end
.follow {
  margin-top: 20px;
}


.user-block {
  margin-top: 20px;
  .user-info {
    width: 120px;
    float: left;
    margin-bottom: 40px;
    margin-right: 40px;
    text-align: center;
    &:nth-last-child(1) {
      margin-right: 0;
    }
    .components-avatar {
      width: 60px;
      height: 60px;
      margin: 0 auto;
    }
    p {
      font-size:16px;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:22px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0;
      margin: 10px 0 0 0;
    }
  }
  &::after {
    display: block;
    content: '';
    width: 0;
    height: 0;
    clear: both;
  }
}
</style>