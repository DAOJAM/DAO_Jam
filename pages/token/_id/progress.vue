<template>
  <div>
    <div class="token-list">
      <h2 class="token-title">
        Live of development
      </h2>
      <div class="live">
        <div
          v-for="(item, index) in pullLives.list"
          :key="index"
          class="live-block fl ac jsb"
        >
          <div class="live-block__user fl ac">
            <c-avatar :src="avatar(item.avatar)" />
            <div class="live-block__info">
              <p class="live-block__username">
                {{ item.nickname || item.username }}
              </p>
              <!-- <span>tag</span> -->
            </div>
          </div>
          <a
            class="live-block__address"
            :href="item.content"
            target="_blank"
          >{{ item.title }}</a>

          <a
            class="live-block__btn"
            :href="item.content"
            target="_blank"
          >
            <el-button type="primary">
              立即观看
            </el-button></a>
        </div>
        <p
          v-if="pullLives.list.length === 0"
          class="token-not"
        >
          暂无
        </p>
        <user-pagination
          v-show="!pullLives.loading"
          :url-replace="$route.params.id + ''"
          :current-page="pullLives.currentPage"
          :params="pullLives.params"
          :api-url="pullLives.apiUrl"
          :page-size="pullLives.size"
          :total="pullLives.total"
          :need-access-token="true"
          class="use-pagination"
          @paginationData="paginationDataLives"
          @togglePage="togglePageLives"
        />
      </div>
    </div>

    <div class="token-list">
      <h2 class="token-title">
        Progress of development
      </h2>
      <div class="progress">
        <div
          v-for="(item, index) in pullNews.list"
          :key="index"
          class="progress-block"
        >
          <p class="progress-block__title">{{ item.title }}</p>
          <p class="progress-block__content">{{ item.content }}</p>
          <p class="progress-block__time">{{ time(item.create_time) }}</p>
        </div>
        <p
          v-if="pullNews.list.length === 0" 
          class="token-not"
        >
          暂无
        </p>
        <user-pagination
          v-show="!pullNews.loading"
          :url-replace="$route.params.id + ''"
          :current-page="pullNews.currentPage"
          :params="pullNews.params"
          :api-url="pullNews.apiUrl"
          :page-size="pullNews.size"
          :total="pullNews.total"
          :need-access-token="true"
          class="use-pagination"
          @paginationData="paginationDataNews"
          @togglePage="togglePageNews"
        />
      </div>
    </div>
  </div>
</template>


<script>
import userPagination from '@/components/user/user_pagination.vue'
import moment from 'moment'
import { isNDaysAgo } from '@/utils/momentFun'

export default {
  components: {
    userPagination
  },
  data() {
    return {
      lives: [],
      news: [],
      pullLives: {
        loading: false,
        params: {
          pagesize: 5
        },
        apiUrl: 'minetokenLives',
        list: [],
        currentPage: Number(this.$route.query.page) || 1,
        size: 5,
        total: 0,
      },
      pullNews: {
        loading: false,
        params: {
          pagesize: 5
        },
        apiUrl: 'minetokenNews',
        list: [],
        currentPage: Number(this.$route.query.pages) || 1,
        size: 5,
        total: 0,
      },
    }
  },
  methods: {
    avatar(src) {
      return src ? this.$ossProcess(src) : ''
    },
    time(create_time) {
      let time = moment(create_time)
      return isNDaysAgo(2, time) ? time.format('MMMDo HH:mm') : time.fromNow()
    },
    paginationDataLives(res) {
      this.pullLives.list = res.data.list
      this.pullLives.total = res.data.count || 0
      this.pullLives.loading = false
    },
    togglePageLives(i) {
      this.pullLives.loading = true
      this.pullLives.list = []
      this.pullLives.currentPage = i

      const query = Object.assign({}, this.$route.query)
      const pageQuery = Object.assign(query, { page: i })
      
      this.$router.push({
        query: pageQuery
      })
    },
    paginationDataNews(res) {
      this.pullNews.list = res.data.list
      this.pullNews.total = res.data.count || 0
      this.pullNews.loading = false
    },
    togglePageNews(i) {
      this.pullNews.loading = true
      this.pullNews.list = []
      this.pullNews.currentPage = i

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
  padding: 20px;
  color: #fff;
  .components-avatar {
    width: 60px;
    height: 60px;
    flex: 0 0 60px;
    margin: 0 10px 0 0;
  }
  &__user,
  &__btn {
    width: 30%;
  }
  &__btn {
    text-align: right;
  }
  &__user {
    overflow: hidden;
  }
  &__info {
    overflow: hidden;
  }
  &__username {
    padding: 0;
    margin: 0;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__address {
    display: inline-block;
    color: #fff;
    text-decoration: underline;
    width: 40%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
.progress-block {
  background: rgba(19, 45, 94, 1);
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0 0;
  color: #fff;
  &__title {
    padding: 0;
    margin: 0;
    font-size: 20px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 28px;
  }
  &__content {
    padding: 0;
    margin: 10px 0 0 0;
    word-break: break-all;
    white-space: pre-wrap;

    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 22px;
  }
  &__time {
    padding: 0;
    margin: 20px 0 0 0;
    font-size: 14px;
    font-weight: 400;
    color: rgba(178, 178, 178, 1);
    line-height: 20px;
    text-align: right;
  }
}

.use-pagination {
  margin-top: 40px;
}
</style>