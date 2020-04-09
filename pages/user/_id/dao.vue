<template>
  <div>
    <div class="user-list">
      <h2 class="user-title">
        Organized
      </h2>
      <!-- todo -->
      <div
        v-loading="organizedLoading"
        element-loading-background="#132D5E"
        class="dao"
      >
        <div 
          v-if="tokenData.id"
          class="dao-list"
        >
          <!-- <router-link
            :to="{name: 'daos-id', params: { id: tokenData.id }}"
            class="dao-block not"
          >
            <avatar :src="cover(tokenData.logo)" />
            <p>{{ tokenData.symbol }}</p>
          </router-link> -->
          <daoCard
            class="dao-col"
            :card="tokenData"
          />
        </div>
        <p
          v-else
          class="user-not"
        >
          暂无
        </p>
      </div>
    </div>

    <div class="user-list">
      <h2 class="user-title">
        Joined
      </h2>
      <!-- todo -->
      <div
        v-loading="joinedLoading"
        element-loading-background="#132D5E"
        class="dao"
      >
        <div class="dao-list">
          <!-- <router-link
            v-for="(item, index) in pull.list"
            :key="index"
            :to="{name: 'daos-id', params: { id: item.token_id }}"
            class="dao-block"
          >
            <avatar :src="cover(item.logo)" />
            <p>{{ item.symbol }}</p>
          </router-link> -->
          <daoCard
            v-for="(item, index) in pull.list"
            :key="index"
            class="dao-col"
            :card="item"
          />
        </div>
        <p
          v-if="pull.list.length === 0"
          class="user-not"
        >
          暂无
        </p>
        <user-pagination
          v-show="!pull.loading"
          :current-page="pull.currentPage"
          :params="pull.params"
          :api-url="pull.apiUrl"
          :page-size="pull.size"
          :total="pull.total"
          :need-access-token="true"
          class="use-pagination"
          @paginationData="paginationData"
          @togglePage="togglePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import avatar from '@/common/components/avatar'
import userPagination from '@/components/user/user_pagination.vue'
import daoCard from '@/components/dao_card2'

export default {
  components: {
    // avatar,
    userPagination,
    daoCard
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
      // 假数据
      fakeData: {
        id: 3,
        pid: 17,
        uid: 1297,
        name: 'daojam官方',
        symbol: 'daojam官方',
        decimals: 18,
        total_supply: 0,
        create_time: '2020-04-07T12:01:34.000Z',
        status: 0,
        logo: '/image/2020/04/07/2d94af1301042bf84983b76669665259.jpeg',
        brief: '快来加入我们，一起快乐coding',
        introduction: '快来加入我们，一起快乐coding',
        contract_address: null,
        cover: '/image/2020/04/07/1ae217f0f97e88d3e9027f514d9f0371.jpg',
        repo: 'https://github.com/DAOJAM',
        block_number: 0,
        trx: '0',
        owner: 'zxplus',
        weight: 8,
        daot: 16
      },
      organizedLoading: true,
      joinedLoading: true
    }
  },
  computed: {
    ...mapGetters(['isLogined']),
  },
  mounted() {
    if (process.browser) {
      this.tokenUserId(this.$route.params.id)
    }
    else this.organizedLoading = false
  },
  methods: {
    // 假数据
    getFakeDataList(quantity) {
      const fakeDataList = []
      for(let i = 0; i < quantity; i++) {
        fakeDataList.push(this.fakeData)
      }
      return fakeDataList
    },
    cover (src) {
      return src ? this.$ossProcess(src, { h: 120 }) : ''
    },
    async tokenUserId(id) {
      await this.$API
        .tokenUserId(id)
        .then(async res => {
          this.organizedLoading = false
          if (res.code === 0 && res.data.id > 0) {
            this.tokenData = res.data
            this.$set(this.tokenData, 'pentagram', await this.getBookmarkStatus(res.data.id))
          } else console.log(res.message)
        })
        .catch(err => console.log('get token user error', err))
    },
    async paginationData(res) {
      // this.pull.list = res.data.list
      this.pull.list = this.getFakeDataList(6)
      this.pull.total = res.data.count || 0
      this.pull.loading = false
      if(this.isLogined) await this.getBookmarkByTokenIds()
      this.joinedLoading = false
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
    async getBookmarkStatus(projectId) {
      try {
        const res = await this.$API.getTokenBookmark(projectId)
        return res.data
      } catch(err) {
        this.$message.error('无法获取星标状态')
        console.error('get token bookmark error', err)
      }
    },
    async getBookmarkByTokenIds() {
      const res = await this.$API.getBookmarkByTokenIds(this.pull.list.map(row => row.id))

      if (res.code === 0) {
        res.data.forEach(item => this.$set(this.pull.list.find(token => token.id === item.token_id), 'pentagram', true))
      } else console.error(res.message)
    }
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
// common end

.dao {
  min-height: 100px;
  .dao-list {
    margin-bottom: 30px;
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
    &.user-not {
      font-size: 16px;
      margin: 0;
      color: #fff;
      padding: 40px 0 0;
    }
  }
}
.dao-col {
  float: left;
  width: calc(33.333% - (80px / 3));
  margin-top: 40px;
  &:nth-of-type(3n + 2) {
    margin-left: 40px;
    margin-right: 40px;
  }
}

@media screen and (max-width: 520px) {
  .dao-col {
    width: 100%;
    margin-top: 20px;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}

@media screen and (min-width: 520px) and (max-width: 768px) {
  .dao-col {
    width: calc(50% - (10px));
    margin-top: 20px;
    &:nth-of-type(odd) {
      margin-left: 0;
      margin-right: 10px;
    }
    &:nth-of-type(even) {
      margin-left: 10px;
      margin-right: 0;
    }
  }
}

@media screen and (min-width: 769px) and (max-width: 992px) {
  .dao-col {
    width: calc(33.333% - (40px / 3));
    margin-top: 20px;
    &:nth-of-type(3n + 2) {
      margin-left: 20px;
      margin-right: 20px;
    }
  }
}

</style>