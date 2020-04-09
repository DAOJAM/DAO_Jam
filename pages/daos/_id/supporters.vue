<template>
  <div class="supporter">
    <div class="supporter-table">
      <div class="table table-4">
        <h3 class="supporter-title">
          Supporters
        </h3>
        <div class="table-content">
          <div>
            <div class="table-head">
              <div class="table-head-th">
                Username
              </div>
              <div class="table-head-th" style="flex: 0 0 120px">
                Vote Amount
              </div>
            </div>
            <div class="table-body">
              <div v-for="(item, index) in pullSupporters.list" :key="index" class="table-body-tr">
                <div class="table-body-td">
                  <router-link class="fl ac" :to="{name: 'user-id', params: { id: item.uid }}">
                    <c-avatar :src="avatar(item.avatar)" />
                    <span class="username">{{ item.nickname || item.username }}</span>
                  </router-link>
                </div>
                <div class="table-body-td" style="flex: 0 0 120px">
                  {{ '+' + item.weight }}
                </div>
              </div>
            </div>
          </div>
          <user-pagination
            v-show="!pullSupporters.loading"
            :url-replace="$route.params.id"
            :current-page="pullSupporters.currentPage"
            :params="pullSupporters.params"
            :api-url="pullSupporters.apiUrl"
            :page-size="pullSupporters.size"
            :total="pullSupporters.total"
            :need-access-token="true"
            class="use-pagination"
            @paginationData="paginationDataSupporters"
            @togglePage="togglePageSupporters"
          />
        </div>
      </div>

      <div class="table table-6">
        <h3 class="supporter-title">
          Supporters
        </h3>
        <div class="table-content">
          <div>
            <div class="table-head">
              <div class="table-head-th">
                Username
              </div>
              <div class="table-head-th">
                Vote Time
              </div>
              <div class="table-head-th" style="flex: 0 0 140px">
                Vote Amount
              </div>
              <div class="table-head-th" style="flex: 0 0 140px">
                
              </div>
            </div>
            <div class="table-body">
              <div v-for="(item, index) in pullVotes.list" :key="index" class="table-body-tr">
                <div class="table-body-td">
                  <router-link class="fl ac" :to="{name: 'user-id', params: { id: item.uid }}">
                    <c-avatar :src="avatar(item.avatar)" />
                    <span class="username">{{ item.nickname || item.username }}</span>
                  </router-link>
                </div>
                <div class="table-body-td">
                  {{ time(item.create_time) }}
                </div>
                <div class="table-body-td" style="flex: 0 0 140px">
                  {{ '+' + item.weight }}
                </div>
                <div class="table-body-td" style="flex: 0 0 140px">
                  <a 
                    class="near-trx-box" 
                    :href="'https://explorer.nearprotocol.com/transactions/' + item.trx"
                    target="_blank">
                    <svg-icon icon-class="near_logo" class="near-logo" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <user-pagination
            v-show="!pullVotes.loading"
            :url-replace="$route.params.id"
            :current-page="pullVotes.currentPage"
            :params="pullVotes.params"
            :api-url="pullVotes.apiUrl"
            :page-size="pullVotes.size"
            :total="pullVotes.total"
            :need-access-token="true"
            class="use-pagination"
            @paginationData="paginationDataVotes"
            @togglePage="togglePageVotes"
          />
        </div>
      </div>
    </div>

    <div class="chart">
      <h3 class="supporter-title">
        chart
      </h3>
      <el-radio-group
        v-model="chartsRadio"
        size="small"
        class="chart-toggle"
        @change="changeCharts"
      >
        <el-radio-button label="day">
          一天
        </el-radio-button>
        <el-radio-button label="week">
          一周
        </el-radio-button>
      </el-radio-group>
      <div class="chart-content">
        <ve-line
          :loading="loading"
          :data="chartData"
          :settings="chartSettings"
          :colors="lineColor"
          :text-style="textStyle"
          :legend="legend"
        />
      </div>
    </div>
  </div>
</template>

<script>
import userPagination from '@/components/user/user_pagination.vue'
import moment from 'moment'

export default {
  components: {
    userPagination
  },
  data () {
    this.chartSettings = {
      area: true,
      labelMap: {
        create_time: '访问用户',
        weight: '投票数'
      }
    }
    return {
      pullSupporters: {
        loading: false,
        params: {
          userId: this.$route.params.id,
          pagesize: 10,
        },
        apiUrl: 'supporters',
        list: [],
        currentPage: Number(this.$route.query.page) || 1,
        size: 10,
        total: 0,
      },
      pullVotes: {
        loading: false,
        params: {
          userId: this.$route.params.id,
          pagesize: 10,
        },
        apiUrl: 'votes',
        list: [],
        currentPage: Number(this.$route.query.pageVote) || 1,
        size: 10,
        total: 0,
      },
      // 图表
      loading: false,
      chartsRadio: 'day',
      chartsData: {}, // 源数据
      chartsDay: [], // 天数据
      chartsWeek: [], // 周数据
      lineColor: ['#5031D9'],
      textStyle: {
        color: '#fff'
      },
      legend: {
        textStyle: {
          color: '#fff'
        }
      },
      chartData: {
        columns: ['create_time', 'weight'],
        rows: []
      }
    }
  },
  mounted() {
    this.chartsVote(this.$route.params.id)
    // this.getVotingLog()
  },
  methods: {
    async getVotingLog() {
      try {
        const result = await this.$API.getVotingLog({
          pid: this.pj.pid
        })
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    },
    avatar(src) {
      return src ? this.$ossProcess(src, { h: 90 }) : ''
    },
    time(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    paginationDataSupporters(res) {
      this.pullSupporters.list = res.data.list
      this.pullSupporters.total = res.data.count || 0
      this.pullSupporters.loading = false
    },
    togglePageSupporters(i) {
      this.pullSupporters.loading = true
      this.pullSupporters.list = []
      this.pullSupporters.currentPage = i

      const query = Object.assign({}, this.$route.query)
      const pageQuery = Object.assign(query, { page: i })
      
      this.$router.push({
        query: pageQuery
      })
    },

    paginationDataVotes(res) {
      this.pullVotes.list = res.data.list
      this.pullVotes.total = res.data.count || 0
      this.pullVotes.loading = false
    },
    togglePageVotes(i) {
      this.pullVotes.loading = true
      this.pullVotes.list = []
      this.pullVotes.currentPage = i

      const query = Object.assign({}, this.$route.query)
      const pageQuery = Object.assign(query, { pageVote: i })
      
      this.$router.push({
        query: pageQuery
      })
    },
    // 获取投票记录
    chartsVote(id) {
      this.loading = true
      this.$API.chartsVote(id).then(res => {
        if (res.code === 0) {
          console.log(res.data)
          this.chartsData = res.data

          if (this.chartsRadio === 'day') {
            this.chartData.rows = res.data.day
          } else if (this.chartsRadio === 'week') {
            this.chartData.rows = res.data.week
          } else {
            //
          }
        }
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        this.loading = false
      })
    },
    // 切换时间
    changeCharts(val) {
      if (val === 'day') {
        this.chartData.rows = this.chartsData.day
      } else if (val === 'week') {
        this.chartData.rows = this.chartsData.week
      } else {
        //
      }
    }
  }
}
</script>

<style lang="less" scoped>
.near-trx-box {
  .near-logo {
    width: 80px;
    height: 40px;
    font-size: 10px;
  }
}
.table-4 {
  width: 35%;
  float: left;
}
.table-6 {
  width: calc(65% - 20px);
  float: left;
  margin: 0 0 0 20px;
}

.supporter-table {
  &::after {
    display: block;
    content: "";
    width: 0;
    height: 0;
    clear: both;
  }
}
.table {
  &-content {
    height: 600px;
    background-color: #132d5e;
    border-radius: 8px;
    overflow: hidden;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.supporter-title {
  font-size: 20px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 28px;
  padding: 0;
  margin: 40px 0 20px 0;
  box-sizing: border-box;
}

.table-head {
  display: flex;
  align-items: center;
  &-th {
    flex: 1;
    font-size: 16px;
    font-weight: 500;
    color: rgba(178, 178, 178, 1);
    line-height: 22px;
  }
}
.table-body {
  &-tr {
    flex: 1;
    display: flex;
    align-items: center;
  }
  &-td {
    flex: 1;
    margin: 10px 0;
    font-size: 16px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 22px;
    .username {
      margin-left: 10px;
      color: rgba(255, 255, 255, 1);
      text-decoration: none;
    }
  }
}
.chart {
    position: relative;
    min-height: 400px;
  &-toggle {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 99;
  }
}
.use-pagination {
  margin-top: 20px;
}
</style>