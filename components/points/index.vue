<template>
  <div>
    <div
      v-loading="loading"
      class="card-container"
    >
      <no-content-prompt :list="pointLog.list">
        <div class="point-card">
          <span class="title">{{ $t('user.remainingPoints') }}</span>
          <h1 class="point-pricing">
            {{ balance }}
          </h1>
        </div>
        <pointCard
          v-for="(item, index) in pointLog.list"
          :key="index"
          :asset="item"
        />
      </no-content-prompt>
    </div>
    <user-pagination
      v-show="!loading"
      :current-page="currentPage"
      :params="pointLog.params"
      :api-url="pointLog.apiUrl"
      :page-size="pointLog.params.pagesize"
      :total="total"
      :need-access-token="true"
      class="pagination"
      @paginationData="paginationData"
      @togglePage="togglePage"
    />
  </div>
</template>

<script>
import pointCard from '@/components/point_card/index.vue'
import userPagination from '@/components/user/user_pagination.vue'

export default {
  components: {
    pointCard,
    userPagination
  },
  data() {
    return {
      pointLog: {
        params: {
          pagesize: 10
        },
        apiUrl: 'mintLog',
        list: []
      },
      currentPage: Number(this.$route.query.pointsPage) || 1,
      loading: false, // 加载数据
      total: 0,
      assets: {
      },
      viewStatus: 0, // 0 1
      balance: 0
    }
  },
  methods: {
    paginationData(res) {
      this.pointLog.list = res.data.list || []
      this.assets = res.data
      this.total = res.data.count || 0
      this.balance = res.data.balance || 0
      this.loading = false
    },
    togglePage(i) {
      this.loading = true
      this.pointLog.list = []
      this.currentPage = i
      const query = { ...this.$route.query }
      query.pointsPage = i
      this.$router.push({
        query
      })
    }
  }
}
</script>

<style lang="less">
.card-container {
  margin-bottom: 20px;
}
.point-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 20px 20px 10px;
  border-bottom: 1px solid #DBDBDB;
  .title {
    font-weight: bold;
    font-size: 20px;
    line-height:28px;
    color: #fff;
  }
  .point-pricing {
    padding: 0;
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    line-height: 28px;
  }
}
.points-main {
  padding: 20px;
  border-radius: @br10;
  box-sizing: border-box;
  margin-bottom: 120px;
  background-color: #122d5e;
}
.tag-title {
  font-weight: bold;
  font-size: 20px;
  padding-left: 10px;
  padding-bottom: 10px;
  margin: 0;
  color: #fff;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #DBDBDB;
}
</style>
