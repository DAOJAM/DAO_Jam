<template>
  <div class="token">
    <g-header />
    <div class="token-main">
      <div class="token-banner">
        <img
          :src="tokenCover"
          alt="banner"
        >
      </div>

      <div class="token-head">
        <div class="head-user">
          <avatar
            :src="tokenAvatar"
            class="token-avatar"
          />
          <div class="head-user__info">
            <div class="fl ac">
              <h2>{{ pj.name }}</h2>
              <el-tooltip
                class="pentagram"
                effect="dark"
                :content="pentagram ? '取消收藏该项目' : '收藏该项目'"
                placement="top"
              >
                <div @click="setBookmark">
                  <i
                    v-if="loading"
                    class="el-icon-loading"
                  />
                  <svg-icon
                    v-else-if="pentagram"
                    icon-class="pentagram_active"
                  />
                  <svg-icon
                    v-else
                    icon-class="pentagram"
                  />
                </div>
              </el-tooltip>
            </div>
            <div class="head-user__founder">
              Founder:
              <router-link :to="{name: 'user-id', params: {id: minetokenToken.uid}}">
                <avatar
                  :src="userAvatar"
                  class="user-avatar"
                />
                <span>{{ minetokenUser.nickname || minetokenUser.username || pj.owner }}</span>
              </router-link>
            </div>
            <p>Creation Time: 2020.3.24</p>
            <p>
              {{ minetokenToken.brief || '暂无' }}
            </p>
            <!-- <div class="dao__info__number">
              <div class="dao__info__number__block">
                <svg-icon
                  icon-class="members"
                  class="icon"
                />
                {{ 0 }}
              </div>
              <div class="dao__info__number__block">
                <svg-icon
                  icon-class="daos"
                  class="icon"
                />
                {{ pj.daot }}
              </div>
              <div class="dao__info__number__block">
                <svg-icon
                  icon-class="tickets"
                  class="icon"
                />
                {{ pj.weight }}
              </div>
            </div> -->
          </div>
        </div>
        <div class="head-info">
          <div>
            <router-link
              v-if="showTokenSetting"
              class="dao-btn"
              :to="{ name: 'editminetoken' }"
            >
              <svg-icon
                icon-class="dao_setting"
                class="dao-icon setting"
              />
              Manage
            </router-link>

            <div class="dao-btn" @click="teamApply">
              <svg-icon
                icon-class="dao_join"
                class="dao-icon join"
              />
              Join
            </div>

            <div class="dao-btn" @click="shareModalShow = true">
              <svg-icon
                icon-class="dao_share"
                class="dao-icon share"
              />
              Share
            </div>
          </div>
          <div class="dao-data__content">
            <div class="dao-data">
              <p class="dao-data__help">
                Rank
                <el-tooltip
                  effect="dark"
                  content="Rank"
                  placement="top"
                >
                  <svg-icon
                    icon-class="dao_help"
                    class="icon"
                  />
                </el-tooltip>
              </p>
              <p class="dao-data__number">
                <svg-icon
                  icon-class="rank"
                  class="icon rank"
                />
                {{ rank }}
              </p>
            </div>
            <div class="dao-data">
              <p class="dao-data__help">
                Vote
                <el-tooltip
                  effect="dark"
                  content="Vote"
                  placement="top"
                >
                  <svg-icon
                    icon-class="dao_help"
                    class="icon"
                  />
                </el-tooltip>
              </p>
              <p class="dao-data__number">
                <svg-icon
                  icon-class="tickets"
                  class="icon"
                />
                {{ pj.weight }}
              </p>
            </div>
          </div>
          <!-- <span class="head-amount">
            已持有：{{ balance }} {{ minetokenToken.symbol }}
          </span> -->
        </div>
      </div>

      <div class="fl ac jsb dao-link-vote">
        <div class="dao-link">
          <a
            :href="'https://explorer.nearprotocol.com/transactions/' + pj.trx"
            target="_blank"
          >
            <el-tooltip
              effect="dark"
              content="Near Explorer"
              placement="top"
            >
              <div class="dao-link__block">
                <svg-icon
                  icon-class="near_icon_wht"
                  class="icon"
                />
              </div>

            </el-tooltip>
          </a>
          
          <a
            v-if="minetokenToken.repo"
            :href="minetokenToken.repo"
            target="_blank"
          >
            <el-tooltip
              effect="dark"
              content="Github"
              placement="top"
            >
              <div class="dao-link__block">
                <svg-icon
                  icon-class="github"
                  class="icon"
                />
              </div>
            </el-tooltip>
          </a>
          
          <div v-if="resourcesSocialss.length !== 0" class="dao-link__line" />
          <socialIconDao
            v-for="(item, index) in resourcesSocialss"
            :key="index"
            class="dao-link-social"
            :show-tooltip="true"
            :icon="item.type"
            :content="item.content"
          />
        </div>
        <div class="dao-vote">
          <div class="vote-container">
            <el-tooltip
              effect="dark"
              content="Voting Power"
              placement="top"
            >
              <div class="vote-cost">
                <span>cost:{{ voteCost }}</span>
                <svg-icon icon-class="daot" class="icon" />
              </div>
            </el-tooltip>

            <div class="vote-group">
              <el-input-number
                v-model="voteNum"
                class="daojam-vote-input"
                :min="1"
                label="Vote"
                @change="changeVote"
              />

              <div class="daojam-vote-btn" @click="vote">
                VOTE
                <svg-icon
                  icon-class="tickets"
                  class="ticket-icon"
                />
              </div>
            </div>
            <!-- <div class="vote-box" @click="setVoteNum(1)">
              +1
            </div>
            <div class="vote-box" @click="setVoteNum(5)">
              +5
            </div>
            <div class="vote-box" @click="setVoteNum('max')">
              MAX
            </div> -->
          </div>
        </div>
      </div>
      <router-view />
    </div>

    <Share
      :share-modal-show="shareModalShow"
      :img="logo"
      :minetoken-token="minetokenToken"
      :minetoken-user="minetokenUser"
      @input="val => shareModalShow = val"
    />
    <m-dialog
      v-model="buyDialog"
      width="600px"
      title="购买"
    >
      <tokenBuyCard :token="minetokenToken" />
    </m-dialog>

    <!-- 团队申请 start -->
    <m-dialog
      v-model="joinDialog"
      width="600px"
      title="Join"
    >
      <el-form
        ref="joinForm"
        :model="joinForm"
        :rules="joinRules"
        label-width="80px"
      >
        <el-form-item label="Email" prop="contact">
          <el-input
            v-model="joinForm.contact"
            maxlength="50"
            show-word-limit
            placeholder="Please input your email"
          />
        </el-form-item>
        <el-form-item label="Reason" prop="content">
          <el-input
            v-model="joinForm.content"
            class="join-content"
            type="textarea"
            :rows="6"
            maxlength="100"
            show-word-limit
            placeholder="Please enter a reason for joining"
          />
        </el-form-item>
        

        <div class="join-btn">
          <el-button @click="sendJoinForm('joinForm')">
            Send
          </el-button>
        </div>
      </el-form>
    </m-dialog>
    <!-- 团队申请 end -->
  </div>
</template>

<script>
import avatar from '@/common/components/avatar/index.vue'
import { mapGetters } from 'vuex'
import { extractChar } from '@/utils/reg'
import utils from '@/utils/utils'
import { precision } from '@/utils/precisionConversion'
import Share from '@/components/token/token_share.vue'
import tokenBuyCard from '@/components/token/token_buy_card.vue'
// import qv from '@/api/voting/qvvoting.js'
import socialTypes from '@/config/social_types'
import socialIconDao from '@/components/social_icon_dao'

export default {
  components: {
    avatar,
    Share,
    tokenBuyCard,
    socialIconDao
  },
  head() {
    return {
      title: `${this.minetokenToken.symbol}-${this.minetokenToken.name}`,
      meta: [
        { hid: 'description', name: 'description', content: `${this.minetokenToken.brief}` || `${this.minetokenToken.symbol}-${this.minetokenToken.name}` },
        /* <!--  Meta for Twitter Card --> */
        { hid: 'twitter:card', name: 'twitter:card', property: 'twitter:card', content: 'summary' },
        { hid: 'twitter:site', name: 'twitter:site', property: 'twitter:site', content: '@Andoromeda' },
        { hid: 'twitter:title', name: 'twitter:title', property: 'twitter:title', content: `${this.minetokenToken.symbol}-${this.minetokenToken.name}` },
        { hid: 'twitter:description', name: 'description', property: 'twitter:description', content: `${this.minetokenToken.brief}` || `${this.minetokenToken.symbol}-${this.minetokenToken.name}` },
        { hid: 'twitter:url', name: 'twitter:url', property: 'twitter:url', content: `${process.env.VUE_APP_PC_URL}/token/${this.$route.params.id}` },
        { hid: 'twitter:image', name: 'twitter:image', property: 'twitter:image', content: this.$API.getImg(this.minetokenToken.logo) },
        /* <!--  Meta for OpenGraph --> */
        { hid: 'og:site_name', name: 'og:site_name', property: 'og:site_name', content: '瞬MATATAKI' },
        { hid: 'og:title', name: 'og:title', property: 'og:title', content: `${this.minetokenToken.symbol}-${this.minetokenToken.name}` },
        { hid: 'og:type', name: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:url', name: 'og:url', property: 'og:url', content: `${process.env.VUE_APP_PC_URL}/token/${this.$route.params.id}` },
        { hid: 'og:image', name: 'og:image', property: 'og:image', content: this.$API.getImg(this.minetokenToken.logo) },
        { hid: 'og:description', name: 'description', property: 'og:description', content: `${this.minetokenToken.brief}` || `${this.minetokenToken.symbol}-${this.minetokenToken.name}` }
        /* end */
      ],
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' }
      ]
    }
  },
  data() {
    return {
      showTokenSetting: false, // 显示设置按钮
      balance: 0, // 余额
      shareModalShow: false, // share dialog
      buyDialog: false, // buy dialog
      joinDialog: false, // 申请加入
      pentagram: false, // 收藏
      voteNum: 0,
      daot: 0,
      joinForm: {
        contact: '',
        content: ''
      },
      joinRules: {
        contact: [
          { type: 'email', required: true, message: '请输入合法的邮箱地址', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入申请理由', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
      },
      resourcesSocialss: [], // 社交联系方式
      loading: false,
      rank: 0, // 排名
    }
  },
  async asyncData({ $axios, route, req }) {
    // 获取cookie token
    let accessToekn = ''
    // 请检查您是否在服务器端
    if (process.server) {
      const cookie = req && req.headers.cookie ? req.headers.cookie : ''
      const token = extractChar(cookie, 'ACCESS_TOKEN=', ';')
      accessToekn = token ? token[0] : ''
    }
    let projectResult = {}
    try {
      projectResult = await $axios({
        url: `/daojam/project/${route.params.id}`,
        methods: 'get',
        headers: { 'x-access-token': accessToekn }
      })
    } catch (e) {
      console.log(e)
    }

    let minetokenResult = {}
    try {
      minetokenResult = await $axios({
        url: `/minetoken/${route.params.id}`,
        methods: 'get',
        headers: { 'x-access-token': accessToekn }
      })
    } catch (e) {
      console.log(e)
    }

    let result = {}
    if (projectResult.code === 0) {
      result.pj = projectResult.data || Object.create(null)
    }
    if (minetokenResult.code === 0) {
      result.minetokenToken = minetokenResult.data.token || Object.create(null),
      result.minetokenUser= minetokenResult.data.user || Object.create(null),
      result.minetokenExchange= minetokenResult.data.exchange || Object.create(null)
    }

    return result
  },
  computed: {
    ...mapGetters(['currentUserInfo', 'isLogined']),
    voteCost() {
      return this.voteNum ** 2
    },
    logo() {
      if (!this.minetokenToken.logo) return ''
      return this.minetokenToken.logo
        ? this.$ossProcess(this.minetokenToken.logo, { h: 160 })
        : ''
    },
    // 转换k
    totalSupply() {
      let amount = this.amount
      return amount < 10000 ? amount : amount / 1000 + 'K'
    },
    amount() {
      const tokenamount = precision(
        this.minetokenToken.total_supply || 0,
        'CNY',
        this.minetokenToken.decimals
      )
      return this.$publishMethods.formatDecimal(tokenamount, 4)
    },
    cnyReserve() {
      const tokenamount = precision(
        this.minetokenExchange.cny_reserve || 0,
        'CNY',
        this.minetokenToken.decimals
      )
      return this.$publishMethods.formatDecimal(tokenamount, 4)
    },
    tokenAvatar() {
      if (!this.minetokenToken.logo) return ''
      return this.minetokenToken.logo
        ? this.$ossProcess(this.minetokenToken.logo, { h: 200 })
        : ''
    },
    tokenCover() {
      if (!this.minetokenToken.cover) return 'https://blog.ulifestyle.com.hk/blogger/s030186/wp-content/blogs.dir/0/12177/files/2018/02/10.jpg'
      return this.minetokenToken.cover
        ? this.$ossProcess(this.minetokenToken.cover, { h: 400 })
        : 'https://blog.ulifestyle.com.hk/blogger/s030186/wp-content/blogs.dir/0/12177/files/2018/02/10.jpg'
    },
    userAvatar() {
      if (!this.minetokenUser.avatar) return ''
      return this.minetokenUser.avatar
        ? this.$ossProcess(this.minetokenUser.avatar, { h: 60 })
        : ''
    }
  },
  watch: {
    isLogined(newVal) {
      if (newVal) {
        this.getBookmarkStatus()
        this.getUserBalance()
      }
    },
    currentUserInfo() {
      if (this.currentUserInfo.id) {
        this.tokenUserId(this.currentUserInfo.id)
      }
    }
  },
  mounted() {
    this.balanceOfDaot()
    if (process.browser) {
      this.minetokenGetResources(this.$route.params.id)

      if (this.currentUserInfo.id) {
        this.tokenUserId(this.currentUserInfo.id)
      }
      if (this.isLogined) {
        this.getBookmarkStatus()
        this.getUserBalance()
      }

      this.rankFunc()
    }
  },
  methods: {
    async rankFunc() {
      await this.$API.rank(this.$route.params.id).then(res=> {
        if (res.code === 0) {
          this.rank = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    async balanceOfDaot() {
      try {
        const result = await this.$API.balanceOf()
        this.daot = parseInt(result.data)
      } catch (error) {
        console.log(error)
      }
    },
    async vote() {
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
      this.$alert(`Do you confirm cost ${this.voteCost} Voting Power(s) to vote this project?`, {
        confirmButtonText: 'Confirm',
        callback: async action => {
          if (action === 'confirm' && this.isLogined) {
            const loading = this.$loading({
              text: 'Voting'
            })
            // const web3 = window.web3
            // const QVVoting = qv.contractInstance()
            // const coinbase = await web3.eth.getCoinbase()
            const id = this.pj.pid
            const votes = this.voteCost
            try {
              const result = await window.unpackContract.cast_vote({
                proposal_id: parseInt(id),
                num_tokens: votes,
                vote: true
              })
              console.log('vote', result)
              const txHash = result.transaction.hash
              const blockHash = result.transaction_outcome.block_hash
              const res = await this.$API.voteProposal({
                id,
                txHash,
                blockHash
              })
              console.log('vote', res)
              loading.close()
              this.$notify.success({
                title: 'Hooray~',
                message: 'You just vote for this project!'
              })
              window.location.reload()
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
          }
        }
      })
    },
    async setVoteNum(n) {
      if (n === 'max') {
        this.voteNum = Math.floor(Math.sqrt(this.daot))
      } else {
        if (this.daot < (n**2)) {
          this.$notify.error({
            title: '错误',
            message: '能量点不足'
          })
        } else {
          this.voteNum = n
        }
      }
    },
    async tokenUserId(id) {
      await this.$API
        .tokenUserId(id)
        .then(res => {
          if (res.code === 0 && res.data.id > 0) {
            this.showTokenSetting = res.data.id === Number(this.$route.params.id)
          }
        })
        .catch(err => console.log('get token user error', err))
    },
    async getUserBalance() {
      await this.$API.getUserBalance(Number(this.$route.params.id)).then(res => {
        if (res.code === 0) {
          this.balance = parseFloat(utils.fromDecimal(res.data, 4))
        } else console.log(res.message)
      })
    },
    async getBookmarkStatus() {
      try {
        const res = await this.$API.getTokenBookmark(this.$route.params.id)
        this.pentagram = res.data
      } catch(err) {
        this.$message.error('无法获取星标状态')
        console.error('get token bookmark error', err)
      }
    },
    async setBookmark() {
      if(!this.isLogined) return this.$store.commit('setLoginModal', true)
      if(this.loading) return
      try {
        this.loading = true
        if (!this.pentagram) {
          const res = await this.$API.addTokenBookmark(this.$route.params.id)
          if (res.code === 0) {
            this.$message.success('添加星标')
            this.pentagram = true
          }
          else this.$message.error(res.message)
        } else {
          const res2 = await this.$API.unTokenbookmark(this.$route.params.id)
          if (res2.code === 0) {
            this.pentagram = false
            this.$message.success('取消星标')
          }
          else this.$message.error(res2.message)
        }
      } catch (err) {
        console.error('ToggleBookmark err', err)
        this.$message.error('无法修改星标状态')
        if (err.response.status === 401) {
          this.$store.commit('setLoginModal', true)
        }
      }
      this.loading = false
    },
    changeVote(value) {
      if (!value) {
        this.voteNum = 0
      }
    },
    // 团队申请 显示dialog
    teamApply() {
      // 登录
      if(!this.isLogined) {
        this.$store.commit('setLoginModal', true)
        return
      }

      // 不能申请加入自己的团队
      if (this.minetokenUser.id === this.currentUserInfo.id) {
        this.$message.warning('不能申请加入自己的团队')
        return
      }

      this.joinDialog = true

    },
    // 发送加入请求
    async sendJoin() {
      await this.$API.teamMemberApply(Number(this.$route.params.id), {
        teamMember: {
          uid: this.currentUserInfo.id,
          contact: this.joinForm.contact,
          content: this.joinForm.content,
        }
      })
        .then(res => {
          if (res.code === 0) {
            this.$message.success('发送成功')
            this.joinForm.contact = ''
            this.joinForm.content = ''

            this.joinDialog = false
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 发送加入请求 表单验证
    async sendJoinForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sendJoin()
        } else {
          return false
        }
      })
    },
    // 得到token的相关资源
    async minetokenGetResources(id) {
      await this.$API
        .minetokenGetResources(id)
        .then(res => {
          if (res.code === 0) {
            const socialFilter = res.data.socials.filter(i =>
              socialTypes.includes(i.type)
            ) // 过滤
            const socialFilterEmpty = socialFilter.filter(i => i.content) // 过滤
            this.resourcesSocialss = socialFilterEmpty
          } else {
            console.log(res.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>

<style lang="less" scoped>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vote-container {
  margin-bottom: 10px;
  .flex-center();
  .vote-cost {
    cursor: pointer;
    .flex-center();
    margin-right: 20px;
    span {
      margin-right: 5px;
      font-size:16px;
      font-weight:400;
      color:rgba(178,178,178,1);
      line-height:22px;
    }
    .icon {
      font-size: 22px;
    }
  }
  .vote-box {
    padding: 10px 0;
    width: 44px;
    white-space: nowrap;
    line-height: normal;
    border-radius: 8px;
    background-color: #6236ff;
    .flex-center();
    color: #ffffff;
    margin-left: 10px;
    cursor: pointer;
    &:hover {
      background: #6200ff;
    }
  }
}
.vote-group {
  line-height: normal;
  display: inline-table;
  border-collapse: separate;
  border-spacing: 0;
  .ticket-icon {
    font-size: 20px;
  }
}
.daojam-vote-input {
  width: 140px;
  border: none;
  outline: none;
  /deep/ .el-input-number__decrease, 
  /deep/ .el-input-number__increase {
    color: #fff;
    background-color: #294F98 !important;
    border-color: #294F98 !important;
  }
  /deep/ .el-input-number__increase {
    border-radius: 0;
  }
  /deep/ .el-input {
    outline: none;
  }
  /deep/ .el-input__inner {
    background-color: #1C4085;
    border: 1px solid #294e98;
    color: #fff;
    border-radius: 4px 0 0 4px;
  }
}
.daojam-vote-btn {
  border-radius: 8px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 0;
  background-color: #6236ff;
  color: #ffffff;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  padding: 0 10px;
  white-space: nowrap;
  border-collapse: separate;
  border-spacing: 0;
  cursor: pointer;
  width: 110px;
  text-align: center;
  box-sizing: border-box;
  font-size:16px;
  font-weight:500;
  line-height:22px;
  &:hover {
    background: #6200ff;
  }
}
.token {
  padding: 60px 0 0 0;
  min-height: calc(100% - (60px + 120px));
  background-color: #0e2144;
}
.token-main {
  max-width: 1200px;
  padding: 0 20px 60px;
  margin: 0 auto;
  box-sizing: border-box;
}

.token-banner {
  height: 290px;
  margin-top: 40px;
  border-radius: 8px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.token-head {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}

.head-user {
  display: flex;
  align-items: center;
  max-width: 70%;
  .token-avatar {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    flex: 0 0 120px;
  }
  .user-avatar {
    width: 20px;
    height: 20px;
    flex: 0 0 20px;
    margin-left: 5px;
  }
}
.head-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > div {
    display: flex;
    justify-content: flex-end;
    .head-btn {
      float: left;
      display: block;
      margin-left: 20px;
      &:nth-child(1) {
        margin-left: 0;
      }
    }
    &::after {
      display: block;
      content: "";
      width: 0;
      height: 0;
      clear: both;
    }
  }
}

.head-user__info {
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;

  h2 {
    padding: 0;
    margin: 0;
    font-size: 24px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 33px;
  }
  .head-user__founder {
    display: flex;
    align-items: center;

    font-size: 16px;
    font-weight: 400;
    color: rgba(178, 178, 178, 1);
    line-height: 22px;

    a {
      display: flex;
      align-items: center;
    }

    span {
      font-size: 16px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
      margin-left: 5px;
    }
  }

  p {
    padding: 0;
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    color: rgba(178, 178, 178, 1);
    line-height: 22px;
    max-height: 44px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    white-space: normal;
    word-break: break-all;
  }

  .dao__info__number {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 28px;

    .dao__info__number__block {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-left: 26px;

      font-size: 16px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;

      &:nth-child(1) {
        margin-left: 0;
      }
    }
    .icon {
      font-size: 20px;
    }
  }
}

.head-amount {
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 22px;
}

.token-nav {
  margin: 40px 0 0 0;
  display: flex;
  align-items: center;
  a {
    padding: 0 0 5px 0;
    margin: 0 0 0 68px;
    display: block;
    font-size: 20px;
    font-weight: 500;
    color: rgba(178, 178, 178, 1);
    line-height: 28px;
    box-sizing: border-box;
    border-bottom: 3px solid transparent;
    &:hover {
      color: #fff;
    }
    &.active {
      color: #fff;
      border-bottom-color: #6236ff;
    }
    &:nth-child(1) {
      margin-left: 0;
    }
  }
}

.repo {
  color: #fff;
  font-size: 16px;
  margin: 40px 0 0 0;
  a {
    color: #fff;
    text-decoration: underline;
  }
}
.join-content {
  margin: 20px 0;
}

.pentagram {
  margin-left: 10px;
  cursor: pointer;
  user-select: none;
  color: #fce812;
}
.dao-btn {
  color: #fff;
  cursor: pointer;
  margin-left: 20px;
}
.dao-icon {
  color: #fff;
  &.join {
    font-size: 22px;
  }
  &.setting,
  &.share {
    font-size: 20px;
  }
}

.dao-data__content {
  margin-top: 40px;
}
.dao-data {
  text-align: center;
  &:nth-child(1) {
    margin-right: 20px;
  }
  &__help {
    font-size: 16px;
    font-weight: 400;
    color: rgba(178, 178, 178, 1);
    line-height: 22px;
    padding: 0;
    margin: 0;
    cursor: pointer;
    .icon {
      font-size: 16px;
    }
  }
  &__number {
    font-size: 24px;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    line-height: 28px;
    padding: 0;
    margin: 5px 0 0 0;
    .icon {
      font-size: 22px;
      &.rank {
        color: #6BD701;
      }
    }
  }
}

.dao-link {
  display: flex;
  align-items: center;
  &__block {
    width: 30px;
    height: 30px;
    background-color: #542de0;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    .icon {
      color: #fff;
      font-size: 16px;
    }
  }
  &__line {
    width: 1px;
    height: 20px;
    background-color: #979797;
    margin-right: 20px;
  }
}
.dao-link-social {
  margin-right: 20px;
}
.dao-link-vote {
  margin-top: 20px;
}

.supporter-count {
  font-size: 14px;
  color: #542de0;
  vertical-align: super;
}
</style>
