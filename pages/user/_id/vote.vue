<template>
  <div v-loading="pullVote.loading" class="vote">
    <div>
      <div class="table-head">
        <div class="table-head-th">
          Username
        </div>
        <div class="table-head-th" style="flex: 0 0 140px;">
          Vote
        </div>
        <div class="table-head-th" style="flex: 0 0 140px;">
          Vote Power
        </div>
        <div class="table-head-th" style="flex: 0 0 200px;">
          &nbsp;
        </div>
      </div>
      <div class="table-body">
        <div v-for="(item, index) in pullVote.list" :key="index">
          <div class="table-body-tr">
            <div class="table-body-td">
              <router-link class="fl ac" :to="{name: 'daos-id', params: { id: item.pid }}">
                <c-avatar :src="avatar(item.logo)" />
                <span class="username">{{ item.name }}</span>
              </router-link>
            </div>
            <div class="table-body-td" style="flex: 0 0 140px;">
              <div class="fl ac">
                <svg-icon icon-class="tickets" class="icon" />
                <span class="number">{{ item.weight }}</span>
              </div>
            </div>
            <div class="table-body-td" style="flex: 0 0 140px;">
              <div class="fl ac">
                <svg-icon icon-class="daot" class="icon" />
                <span class="number">{{ item.daot }}</span>
              </div>
            </div>
            <div class="table-body-td" style="flex: 0 0 200px;">
              <div class="fl ac jfe"> 
                <span class="toggle" @click="item.status = !item.status">
                  {{ item.status ? 'fold' : 'unfold' }}
                  <svg-icon icon-class="arrow_down" class="toggle-icon" />
                </span>
                <router-link :to="{name: 'daos-id', params: { id: item.pid }}">
                  <el-button type="primary" size="small" class="vote-btn">
                    VOTE
                  </el-button>
                </router-link>
              </div>
            </div>
          </div>
          <transition name="fade">
            <div v-show="item.status" class="table-more">
              <div v-for="(itemData, indexData) in item.data" :key="index+'-'+indexData" class="table-more-tr">
                <div class="table-more-td">
                  {{ time(itemData.create_time) }}
                </div>
                <div class="table-more-td" style="flex: 0 0 140px;">
                  {{ itemData.weight }}
                </div>
                <div class="table-more-td" style="flex: 0 0 140px;">
                  {{ itemData.daot }}
                </div>
                <div class="table-more-td near" style="flex: 0 0 200px;">
                  <a 
                    title="view on near explorer"
                    class="near-trx-box near-btn" 
                    :href="'https://explorer.nearprotocol.com/transactions/' + itemData.trx"
                    target="_blank"
                  >
                    <svg-icon icon-class="near_logo_1" class="near-logo" />
                  </a>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <user-pagination
      v-show="!pullVote.loading"
      :url-replace="$route.params.id"
      :current-page="pullVote.currentPage"
      :params="pullVote.params"
      :api-url="pullVote.apiUrl"
      :page-size="pullVote.size"
      :total="pullVote.total"
      :need-access-token="true"
      class="use-pagination"
      @paginationData="paginationData"
      @togglePage="togglePage"
    />
  </div>
</template>

<script>
import userPagination from '@/components/user/user_pagination.vue'

export default {
  components: {
    userPagination
  },
  data() {
    return {
      pullVote: {
        loading: false,
        params: {
          userId: this.$route.params.id,
          pagesize: 5,
        },
        apiUrl: 'userVotes',
        list: [],
        currentPage: Number(this.$route.query.page) || 1,
        size: 5,
        total: 0,
      },
    }
  },
  methods: {
    avatar(src) {
      return src ? this.$ossProcess(src, { h: 90 }) : ''
    },
    time(time) {
      return this.$moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    paginationData(res) {
      const list = res.data.list.map(item => ({
        ...item,
        status: false,
      }))
      this.pullVote.list = list
      this.pullVote.total = res.data.count || 0
      this.pullVote.loading = false
    },
    togglePage(i) {
      this.pullVote.loading = true
      this.pullVote.list = []
      this.pullVote.currentPage = i

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
.vote {
  max-width: 884px;
  min-height: 420px;
  background: rgba(19, 45, 94, 1);
  border-radius: 8px;
  overflow: hidden;
  margin-top: 40px;
  padding: 20px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.table-head {
  display: flex;
  align-items: center;
  padding: 0 20px;
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
    .icon {
      font-size: 22px;
      margin-right: 4px;
    }
    .number {
      font-size: 16px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
    }
    .toggle {
      font-size: 14px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 20px;
      margin-right: 20px;
      width: 80px;
      text-align: right;
      cursor: pointer;
    }
    .toggle-icon {
      font-size: 12px;
      color: rgba(255, 255, 255, 1);
      margin-left: 4px;
    }
    .vote-btn {
      min-width: 90px;
    }
  }

  .table-body-tr {
    padding: 0 20px;
  }
}

.table-more {
  width: 100%;
  background-color: #1c4085;
  &-tr {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 20px;
    &:nth-last-child(1) .table-more-td {
      border-bottom: 0;
    }
  }
  &-td {
    flex: 1;
    border-bottom: 1px solid #b2b2b2;
    padding: 20px 0;
    font-size: 16px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 22px;
    height: 30px;
    &.near {
          display: flex;
      justify-content: flex-end;
    }
    .near-btn {
      width: 90px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      border: 1px solid #ffffff;
      padding: 4px 10px;
      box-sizing: border-box;
      border-radius: 4px;
      text-align: center;
      color: #6236ff;
      font-size: 16px;
      font-weight: 500;
      .near-logo {
        width: 100%;
        height: 20px;
        font-size: 16px;
      }
    }
  }
}
.use-pagination {
  margin-top: 20px;
}
</style>