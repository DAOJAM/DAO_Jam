<template>
  <div class="dao">
    <g-header />
    <div class="dao-main">
      <div
        v-loading="loading"
        class="dao-content"
      >
        <div class="dao-head">
          <!-- <h2>DAOs ({{ count }})</h2> -->
          <div class="dao-head__filter">
            <div class="dao-head__block">
              <p class="dao-head__title">
                排序
              </p>
              <el-select
                v-model="filterValue"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in filterOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div class="dao-head__block">
              <p class="dao-head__title">
                筛选
              </p>
              <el-radio-group v-model="sortRadio">
                <el-radio-button label="全部" />
                <el-radio-button label="持有" />
                <el-radio-button label="星标" />
              </el-radio-group>
            </div>
          </div>

          <div class="dao-head__block">
            <p class="dao-head__title">
              排序
            </p>

            <el-input
              v-model="searchVal"
              style="width: 192px;"
              size="medium"
              placeholder="Search DAO"
              suffix-icon="el-icon-search"
            />
          </div>
        </div>

        <div class="dao-cow">
          <div class="dao-col">
            <div
              class="dao-block"
              @click="createDaoDialog = true"
            >
              <svg-icon
                icon-class="add"
                class="icon-add"
              />
              <p class="dao-add__text">
                Apply for DAO creation (need 1000
                <svg-icon
                  icon-class="daos"
                  class="icon-dao"
                />
                )
              </p>
            </div>
          </div>
          <daoCard
            v-for="(item, index) in pull.list"
            :key="index"
            class="dao-col"
            :card="item"
          />
        </div>

        <m-dialog
          v-model="createDaoDialog"
          width="400px"
          title="开通项目功能"
        >
          <div class="create-dao">
            <div class="create-dao__cover">
              <img
                src="https://blog.ulifestyle.com.hk/blogger/s030186/wp-content/blogs.dir/0/12177/files/2018/02/10.jpg"
                alt="cover"
              >
            </div>
            <div class="line" />
            <div class="create-dao__footer">
              <div>
                <p>
                  需要支付1000金币
                  <svg-icon
                    icon-class="daos"
                    class="icon-dao"
                  />
                </p>
                <a href="#">如果获得金币?</a>
              </div>

              <div>
                <el-button
                  type="small"
                  @click="createDao(true)"
                >
                  足够支付
                </el-button>
                <el-button
                  type="small" 
                  @click="createDao(false)"
                >
                  不够支付
                </el-button>
              </div>
            </div>
          </div>
        </m-dialog>

        <user-pagination
          v-show="!loading"
          :current-page="currentPage"
          :params="pull.params"
          :api-url="pull.apiUrl"
          :page-size="9"
          :total="total"
          :need-access-token="true"
          class="dao-pagination"
          @paginationData="paginationData"
          @togglePage="togglePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import userPagination from '@/components/user/user_pagination.vue'
import daoCard from '@/components/dao_card'
export default {
  components: {
    userPagination,
    daoCard
  },
  data() {
    return {
      createDaoDialog: false,
      tokenList: [],
      searchVal: '',

      pull: {
        params: {
          pagesize: 8
        },
        apiUrl: 'tokenAll',
        list: [
          {},{},{},{},{},{},{},{},{}
        ]
      },
      currentPage: Number(this.$route.query.page) || 1,
      loading: false, // 加载数据
      total: 0,
      assets: {
      },
      viewStatus: 0, // 0 1
      count: 0,

      filterOptions: [{
        value: 'liquidity',
        label: '流动金总量'
      }, {
        value: 'supporter',
        label: '支持者人数'
      }, {
        value: 'developer',
        label: '开发者数量'
      }],
      filterValue: 'liquidity',
      sortRadio: '全部',
    }
  },
  computed: {
    ...mapGetters(['isLogined']),
  },
  methods: {
    // 创建dao
    createDao(val) {
      if (val) {
        this.$alert('请在 设置-项目管理 中进行进一步设置', '项目开通成功', {
          confirmButtonText: '立即设置',
          callback: action => {
            if (action === 'confirm' && this.isLogined) {
              this.$router.push('/setting')
            }
          }
        })
      } else {
        this.$message.warning('对不起, 您的金币不够!')
      }
    },
    paginationData(res) {
      this.count = res.data.count
      this.pull.list = res.data.list
      this.total = res.data.count || 0
      this.loading = false
      if(this.isLogined) this.getBookmarkByTokenIds()
    },
    togglePage(i) {
      this.loading = true
      this.pull.list = []
      this.currentPage = i
      this.$router.push({
        query: {
          page: i
        }
      })
    },
    async getBookmarkByTokenIds() {
      await this.$API.getBookmarkByTokenIds(this.pull.list.map(row => row.id)).then(res => {
        if (res.code === 0) {
          res.data.forEach(item => this.$set(this.pull.list.find(token => token.id === item.token_id), 'pentagram', true))
        } else console.error(res.message)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.dao {
  padding: 60px 0 0 0;
  min-height: calc(100% - (60px + 200px));
  background: #0c2143;
}

.dao-main {
  min-height: 1120px;
  background-color: #0e2144;
  background-image: url(../../assets/img/index_head_bg.png);
  background-size: contain;
  background-position: top;
  background-repeat: no-repeat;
  overflow: hidden;
  text-align: center;
}

.dao-content {
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
}

.dao-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;
  &__filter {
    display: flex;
  }

  &__title {
    font-size: 16px;
    color: #fff;
    padding: 0;
    margin: 0 0 10px;
  }

  &__block {
    text-align: left;
    &:nth-child(1) {
      margin-right: 20px;
    }
  }
  
}

.dao-cow {
  min-height: 300px;
  &::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    clear: both;
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

.dao-pagination {
  margin: 40px 0;
}

.dao-block {
  min-height: 290px;
  border-radius: 16px;
  box-sizing: border-box;
  color: #fff;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: all 0.2s;
  cursor: pointer;
  // background: rgba(98,54,255,0.3);

  background: rgba(98, 54, 255, 0.1);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .icon-add {
    color: #fff;
    font-size: 80px;
  }
  .icon-dao {
    font-size: 14px;
  }

  .dao-add__text {
    font-size: 14px;
    font-weight: 300;
    color: rgba(255, 255, 255, 1);
    line-height: 20px;
    font-weight: bold;
    padding: 0;
    margin: 20px 0 0 0;
  }

  &:hover {
    background: rgba(98, 54, 255, 1);
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: inherit;
    filter: blur(10px);
    z-index: -1;
    margin: -30px;
  }
}

.create-dao {
  &__cover {
    width: 100%;
    height: 300px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .line {
    width: 100%;
    height: 1px;
    background-color: #aeaeae;
    margin: 20px 0;
  }
  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      padding: 0;
      margin: 0 0 10px 0;
      font-size: 16px;
      color: #333;
      .icon {
        font-size: 18px;
      }
    }
    a {
      font-size: 14px;
      color: #565656;
      text-decoration: underline;
    }
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

@media screen and (min-width: 768px) and (max-width: 992px) {
  .dao-content {
    max-width: 85%;
  }
  .dao-col {
    width: calc(33.333% - (40px / 3));
    margin-top: 20px;
    &:nth-of-type(3n + 2) {
      margin-left: 20px;
      margin-right: 20px;
    }
  }
}

@media screen and (min-width: 992px) and (max-width: 1200px) {
  .dao-content {
    max-width: 80%;
  }
}
</style>