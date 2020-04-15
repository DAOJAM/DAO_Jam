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
          <div
            v-if="!hadProject"
            class="dao-col new-project-col"
          >
            <div
              class="dao-block new-project"
              @click="newProject"
            >
              <h3>
                CREATE PROJECT
              </h3>
              <p>
                Need 100 Voting Power
                <svg-icon
                  icon-class="daot"
                  class="icon-dao"
                />
              </p>
            </div>
          </div>
          <daoCard
            v-for="(item, index) in pull[sortRadio].list"
            :key="index"
            class="dao-col"
            :card="item"
            @switchStar="switchStar"
          />
        </div>
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
        bookmark: {
          params: {
            pagesize: 9
          },
          apiUrl: 'tokenBookmarks',
          list: []
        },
        hold: {
          params: {
            pagesize: 9
          },
          apiUrl: 'projectAll',
          list: []
        }
      },
      remainderDate: null,
      loading: false, // 加载数据
      assets: {
      },
      viewStatus: 0, // 0 1

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
      hadProject: false,
      pages: 0,
      temporaryPagesize: null
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
      this.pages = 0
      this.reload = Date.now()
    },
    isLogined(newVal) {
      if(newVal) this.tokenDetail()
    },
    hadProject(newVal) {
      if(newVal) {
        // 如果上次有剩余未显示的，则在这次显示出来
        if(this.remainderDate) this.pull[this.sortRadio].list.push(this.remainderDate)
        this.remainderDate = null
      }
    }
  },
  mounted() {
    if(this.isLogined) this.tokenDetail()
  },
  methods: {
    async tokenDetail() {
      const res = await this.$API.tokenDetail()
      if (res.code === 0 && res.data.token) this.hadProject = true
      else this.hadProject = false
    },
    newProject() {
      if(this.isLogined)
        this.$router.push({ name: 'daos-create' })
      else {
        this.$store.commit('setLoginModal', true)
        this.$message.warning('Operate after logging in')
      }
    },
    paginationData(res) {
      // if(this.temporaryPagesize) {
      //   this.pull[this.sortRadio].params.pagesize = this.temporaryPagesize
      //   this.temporaryPagesize = null
      // }

      // 如果上次有剩余未显示的，则在这次显示出来
      if(this.remainderDate) this.pull[this.sortRadio].list.push(this.remainderDate)
      this.remainderDate = null

      if (res.data && res.data.list && res.data.list.length !== 0){
        // 因为第一个是New Project，导致第一次能显示的数据少1条，所以要在最后余出一条数据，并在下次加入。
        if(!this.hadProject && res.data.list.length >= this.pull[this.sortRadio].params.pagesize)
          this.remainderDate = res.data.list.splice(res.data.list.length - 1, 1)[0]

        // 将新的项目列表加入队尾
        this.pull[this.sortRadio].list = this.pull[this.sortRadio].list.concat(res.data.list)
      }
      // this.pages++
      this.loading = false
      if(this.isLogined) this.getBookmarkByTokenIds(res.data.list)
    },
    async getBookmarkByTokenIds(list) {
      await this.$API.getBookmarkByTokenIds(list.map(row => row.id)).then(res => {
        if (res.code === 0) {
          res.data.forEach(item => this.$set(list.find(token => token.id === item.token_id), 'pentagram', true))
        } else console.error(res.message)
      })
    },
    switchStar() {
      if(this.sortRadio === 'bookmark') {
        // this.temporaryPagesize = this.pull[this.sortRadio].params.pagesize
        // this.pull[this.sortRadio].params.pagesize = this.pages * this.pull[this.sortRadio].params.pagesize

        this.loading = true
        this.pull[this.sortRadio].list = []
        this.remainderDate = null
        this.reload = Date.now()
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
    font-size: 24px;
    margin-left: 5px;
  }
  &.new-project {
    min-height: 0;
    height: 358px;
    color: white;

    h3 {
      font-size:20px;
      font-weight:500;
      line-height:28px;
      margin: 0 0 20px;
    }
    p {
      font-size:14px;
      font-weight:500;
      line-height:20px;
      display: flex;
      align-items: center;
      margin: 0;
    }
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