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
                Sort
              </p>
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
            <div class="dao-head__block">
              <p class="dao-head__title">
                Filter
              </p>
              <el-radio-group v-model="sortRadio">
                <el-radio-button label="hold">
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
          </div>

          <div class="dao-head__block">
            <p class="dao-head__title">
              Search
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
                Create New Project（Need 100 DaoT
                <svg-icon
                  icon-class="daot"
                  class="icon-dao"
                />
                )
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

        <user-pagination
          v-show="!loading"
          :current-page="currentPage"
          :params="pull[sortRadio].params"
          :api-url="pull[sortRadio].apiUrl"
          :page-size="8"
          :total="total"
          :need-access-token="true"
          :reload="reload"
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
import daoCard from '@/components/dao_card2'
// import qv from '@/api/voting/qvvoting.js'

export default {
  components: {
    userPagination,
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
            pagesize: 8
          },
          apiUrl: 'projectAll',
          list: [
            {},{},{},{},{},{},{},{}
          ]
        },
        hold: {
          params: {
            pagesize: 8
          },
          apiUrl: 'projectAll',
          list: [
            {},{},{},{},{},{},{},{}
          ]
        },
        bookmark: {
          params: {
            pagesize: 8
          },
          apiUrl: 'tokenBookmarks',
          list: [
            {},{},{},{},{},{},{},{}
          ]
        }
      },
      currentPage: Number(this.$route.query.page) || 1,
      loading: false, // 加载数据
      total: 0,
      assets: {
      },
      viewStatus: 0, // 0 1
      count: 0,

      filterOptions: [{
        value: 'support',
        label: 'Support'
      }, {
        value: 'votes',
        label: 'Votes'
      }, {
        value: 'score',
        label: 'Score'
      }],
      filterValue: 'support',
      sortRadio: this.$route.query.filter || 'all',
      reload: 0
    }
  },
  computed: {
    ...mapGetters(['isLogined']),
  },
  watch: {
    sortRadio(newVal) {
      this.loading = true
      this.pull[newVal].list = []
      this.currentPage = 1
      this.$router.push({
        query: {
          filter: newVal,
          page: 1
        }
      })
    }
  },
  methods: {
    // 创建dao
    async createDao() {
      console.log('-----------createProposal start-------------')
      const loading = this.$loading({
        text: '创建中'
      })
      try {
        const expireTime = 30 * 24 * 60 * 60
        const result = await window.contract.create_proposal({
          name: this.form.name, description: this.form.description, expiration_time: expireTime
        })
        console.log('create_proposal', result)
        const res = await this.$API.createProposal(result)
        console.log('createProposal', res)
        loading.close()
        this.$notify.success({
          title: '成功',
          message: '创建成功'
        })
        window.location.reload()
      } catch (error) {
        console.log(error)
        loading.close()
        this.$notify.error({
          title: '失败',
          message: '创建失败'
        })
      }
      console.log('-----------createProposal end-------------')
    },
    paginationData(res) {
      this.count = res.data.count
      this.pull[this.sortRadio].list = res.data.list
      this.total = res.data.count || 0
      this.loading = false
      if(this.isLogined) this.getBookmarkByTokenIds()
      
      if(this.pull[this.sortRadio].list.length === 0 && this.currentPage > 1) {
        this.togglePage(this.currentPage - 1)
      }
    },
    togglePage(i) {
      this.loading = true
      this.pull[this.sortRadio].list = []
      this.currentPage = i
      this.$router.push({
        query: {
          ...this.$route.query,
          page: i
        }
      })
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