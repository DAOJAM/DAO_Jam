<template>
  <div class="dao">
    <g-header />
    <div class="dao-main">
      <div
        v-loading="loading"
        element-loading-background="#0e2144cc"
        class="dao-content"
      >
        <div class="dao-head">
          <div class="dao-head__block">
            <el-input
              v-model="searchVal"
              style="width: 192px;"
              size="medium"
              placeholder="search projects"
              suffix-icon="el-icon-search"
            />
          </div>
          <!-- <h2>DAOs ({{ count }})</h2> -->
          <div class="dao-head__filter">
            <div class="dao-head__block">
              <el-radio-group v-model="sortRadio">
                <el-radio-button label="all">
                  All
                </el-radio-button>
                <el-radio-button
                  :disabled="!isLogined"
                  label="bookmark"
                >
                  Star
                </el-radio-button>
                <el-radio-button label="hold">
                  Support
                </el-radio-button>
              </el-radio-group>
            </div>
            <div class="dao-head__block">
              <el-select
                v-model="filterValue"
                placeholder="please choose"
              >
                <el-option
                  v-for="item in filterOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>

        <div class="dao-cow">
          <div v-if="!hadProject" class="dao-col new-project-col">
            <n-link
              :to="{ name: 'daos-create' }"
            >
              <div
                class="dao-block new-project"
              >
                <svg-icon
                  icon-class="add"
                  class="icon-add"
                />
                <p class="dao-add__text">
                  Create New Project（Need 100 Vote Power
                  <svg-icon
                    icon-class="daot"
                    class="icon-dao"
                  />
                  )
                </p>
              </div>
            </n-link>
          </div>
          <daoCard
            v-for="(item, index) in pull[sortRadio].list"
            :key="index"
            class="dao-col"
            :card="item"
            @switchStar="switchStar"
          />
        </div>

        <m-dialog
          v-model="createDaoDialog"
          width="400px"
          title="Create Your Project"
        >
          <el-form
            ref="form"
            :model="form"
            label-position="top"
            label-width="80px"
          >
            <el-form-item>
              <p class="dao-add__text">
                Apply for project creation (need 100
                <svg-icon
                  icon-class="daos"
                  class="icon-dao"
                />
                )
              </p>
            </el-form-item>
            <el-form-item label="NAME THE Project">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="DESCRIBE THE Project">
              <el-input v-model="form.description" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="createDao">
                SUBMIT
              </el-button>
            </el-form-item>
          </el-form>
        </m-dialog>
        <div class="load-more">
          <buttonLoadMore
            v-show="!loading"
            :type-index="0"
            :params="pull[sortRadio].params"
            :api-url="pull[sortRadio].apiUrl"
            :is-atuo-request="true"
            :auto-request-time="reload"
            @buttonLoadMore="paginationData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

// import userPagination from '@/components/user/user_pagination.vue'
import daoCard from '@/components/dao_card2'
import buttonLoadMore from '@/components/button_load_more/index.vue'
// import qv from '@/api/voting/qvvoting.js'

export default {
  components: {
    // userPagination,
    buttonLoadMore,
    daoCard
  },
  data() {
    return {
      contract: null,
      nearConfig: null,
      walletConnection: null,
      form: {
        name: '',
        description: ''
      },
      createDaoDialog: false,
      tokenList: [],
      searchVal: '',

      pull: {
        all: {
          params: {
            pagesize: 9
          },
          apiUrl: 'projectAll',
          list: []
        },
        hold: {
          params: {
            pagesize: 9
          },
          apiUrl: 'projectAll',
          list: []
        },
        bookmark: {
          params: {
            pagesize: 9
          },
          apiUrl: 'tokenBookmarks',
          list: []
        }
      },
      remainderDate: null,
      currentPage: Number(this.$route.query.page) || 1,
      loading: false, // 加载数据
      assets: {
      },
      viewStatus: 0, // 0 1
      count: 0,

      filterOptions: [{
        value: 'rank',
        label: 'Rank'
      }, {
        value: 'recent',
        label: 'Recent'
      }, {
        value: 'name',
        label: 'Name'
      }],
      filterValue: 'rank',
      sortRadio: this.$route.query.filter || 'all',
      reload: 0,
      hadProject: true
    }
  },
  computed: {
    ...mapGetters(['isLogined']),
  },
  watch: {
    sortRadio(newVal) {
      this.loading = true
      this.pull[newVal].list = []
      this.remainderDate = null
      this.currentPage = 1
      this.$router.push({
        query: {
          filter: newVal,
          page: 1
        }
      })
      this.reload = Date.now()
    }
  },
  mounted() {
    this.tokenDetail()
  },
  methods: {
    async tokenDetail() {
      const res = await this.$API.tokenDetail()
      if (res.code === 0 && res.data.token) this.hadProject = true
      else this.hadProject = false
    },
    // 创建dao
    async createDao() {
      // Detect if you have NEAR bind
      const { data } = await this.$API.getKycStatus()
      if (!data.verified) {
        // 提示用户去绑定 Near 钱包，这样才有 account 可以操作
        this.$alert('DAOJam was built on NEAR protocol, you will need to bind your NEAR wallet with us',
          'Almost there, just missing NEAR wallet binding', {
            confirmButtonText: 'Go to bind my NEAR Wallet',
            callback: () => {
              this.$router.push('/setting')
            }
          })
        return // End of exec
      }
      console.log('-----------createProposal start-------------')
      const loading = this.$loading({
        text: '创建中'
      })
      try {
        const expireTime = 30 * 24 * 60 * 60
        const result = await window.unpackContract.create_proposal({
          name: this.form.name, description: this.form.description, expiration_time: expireTime
        })
        console.log('create_proposal', result)
        const value = Buffer.from(result.status.SuccessValue, 'base64').toString()
        const id = JSON.parse(value)
        const txHash = result.transaction.hash
        const blockHash = result.transaction_outcome.block_hash
        const res = await this.$API.createProposal({
          id,
          txHash,
          blockHash
        })
        console.log('createProposal', res)
        loading.close()
        this.$notify.success({
          title: '成功',
          message: '创建成功'
        })
        this.$router.push({ name: 'editminetoken' })
      } catch (error) {
        console.error(error)
        loading.close()
        if (error.type === 'ActionError::FunctionCallError') {
          this.$notify.error({
            title: 'Error happened in the transaction',
            message: error.message
          })
        } else {
          this.$notify.error({
            title: 'Error happened - ' + error.type,
            message: error.message
          })
        }
      }
      console.log('-----------createProposal end-------------')
    },
    paginationData(res) {
      this.count = res.data.count
      // 如果上次有剩余未显示的，则在这次显示出来
      if(this.remainderDate) this.pull[this.sortRadio].list.push(this.remainderDate)

      if (res.data && res.data.list && res.data.list.length !== 0){
        // 因为第一个是New Project，导致第一次能显示的数据少1条，所以要在最后余出一条数据，并在下次加入。
        if(res.data.list.length >= this.pull[this.sortRadio].params.pagesize)
          this.remainderDate = res.data.list.splice(res.data.list.length - 1, 1)[0]

        // 将新的项目列表加入队尾
        this.pull[this.sortRadio].list = this.pull[this.sortRadio].list.concat(res.data.list)
      }
      this.loading = false
      if(this.isLogined) this.getBookmarkByTokenIds()
    },
    async getBookmarkByTokenIds() {
      await this.$API.getBookmarkByTokenIds(this.pull[this.sortRadio].list.map(row => row.id)).then(res => {
        if (res.code === 0) {
          res.data.forEach(item => this.$set(this.pull[this.sortRadio].list.find(token => token.id === item.token_id), 'pentagram', true))
        } else console.error(res.message)
      })
    },
    switchStar() {
      if(this.sortRadio === 'bookmark') {
        if(this.pull[this.sortRadio].list.length < 2 && this.currentPage > 1) {
          this.togglePage(this.currentPage - 1)
        }
        else this.reload = Date.now()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.dao {
  padding: 50px 0 0 0;
  min-height: calc(100% - (50px + 120px));
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
  justify-content: space-between;
  margin-top: 60px;
  align-items: baseline;
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
  &.new-project-col {
    max-height: 280px;
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
    font-size: 22px;
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
  &.new-project {
    min-height: 0;
    height: 358px;
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
// 避免显示更多按钮隐藏后出现塌陷
.load-more {
  height: 160px;
}



@media screen and (max-width: 520px) {
  .dao-col {
    width: 100%;
    margin-top: 20px;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .dao-head {
    display: block;
    &__filter {
      display: block;
      margin-bottom: 20px;
    }
    &__block {
      &:nth-child(1) {
        margin-right: 0;
        margin-bottom: 20px;
      }
    }
  }
  .dao-block {
    &.new-project {
    height: 200px;
    }
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

  .dao-head {
    &__filter {
      display: block;
    }
    &__block {
      &:nth-child(1) {
        margin-right: 0;
        margin-bottom: 20px;
      }
    }
  }
  .dao-block {
    &.new-project {
    height: 347px;
    }
  }
}

@media screen and (min-width: 769px) and (max-width: 992px) {
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

  .dao-head {
    &__filter {
      display: block;
    }
    &__block {
      &:nth-child(1) {
        margin-right: 0;
        margin-bottom: 20px;
      }
    }
  }
  .dao-block {
    &.new-project {
    height: 315px;
    }
  }
}

@media screen and (min-width: 992px) and (max-width: 1200px) {
  .dao-content {
    max-width: 80%;
  }
  .dao-block {
    &.new-project {
      height: 319px;
    }
  }
}
</style>