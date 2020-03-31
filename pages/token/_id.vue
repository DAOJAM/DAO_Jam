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
              <h2>{{ minetokenToken.symbol }} - {{ minetokenToken.name }}</h2>
              <el-tooltip
                class="pentagram"
                effect="dark"
                :content="pentagram ? 'Unstar' : 'Star'"
                placement="top"
              >
                <div @click="setBookmark">
                  <svg-icon
                    v-if="pentagram"
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
                <span>{{ minetokenUser.nickname || minetokenUser.username || '&nbsp;' }}</span>
              </router-link>
            </div>
            <p>
              {{ minetokenToken.brief || 'Not' }}
            </p>
            <div class="dao__info__number">
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
                {{ cnyReserve }}
              </div>
              <div class="dao__info__number__block">
                <svg-icon
                  icon-class="tickets"
                  class="icon"
                />
                {{ totalSupply }}
              </div>
            </div>
          </div>
        </div>
        <div class="head-info">
          <div>
            <a
              :href="'http://rinkeby.etherscan.io/address/' + minetokenToken.contract_address"
              target="_blank"
              class="head-btn"
            >
              <el-button
                class="link-btn"
                size="small"
              >
                <svg-icon icon-class="eth_mini" />
                View on chain
              </el-button>
            </a>
            <router-link
              v-if="showTokenSetting"
              :to="{ name: 'editminetoken' }"
              class="head-btn"
            >
              <el-button
                class="btn"
                size="small"
                icon="el-icon-setting"
              >
                Manage
              </el-button>
            </router-link>
            <el-button
              size="small"
              class="head-btn"
              @click="shareModalShow = true"
            >
              <svg-icon icon-class="share_new" />
              Share
            </el-button>
          </div>
          <div>
            <router-link
              class="head-btn"
              :to="{name: 'exchange', hash: '#swap', query: { output: minetokenToken.symbol }}"
            >
              <el-button size="small" icon="el-icon-setting">
                Transaction
              </el-button>
            </router-link>
            <el-button
              class="head-btn"
              size="small"
              icon="el-icon-setting"
              @click="buyDialog = true"
            >
              Buy
            </el-button>
            <el-button
              size="small"
              icon="el-icon-setting"
              @click="teamApply"
            >
              Join
            </el-button>
          </div>
          <p class="head-amount">
            Held: {{ balance }} {{ minetokenToken.symbol }}
          </p>
        </div>
      </div>

      <div class="repo">
        <svg-icon icon-class="github" />
        Github Repo Address:
        <a
          :href="minetokenToken.repo"
          target="_blank"
        >{{ minetokenToken.repo }}</a>
      </div>

      <nav class="token-nav">
        <n-link
          :to="{name: 'token-id', params: { id: $route.params.id }}"
          :class="$route.name === 'token-id' && 'active'"
        >
          INFORMATION
        </n-link>
        <n-link
          :to="{name: 'token-id-progress', params: { id: $route.params.id }}"
          :class="$route.name === 'token-id-progress' && 'active'"
        >
          PROGRESS
        </n-link>
        <n-link
          :to="{name: 'token-id-capital', params: { id: $route.params.id }}"
          :class="$route.name === 'token-id-capital' && 'active'"
        >
          CAPITAL
        </n-link>
      </nav>
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
      title="Buy"
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


export default {
  components: {
    avatar,
    Share,
    tokenBuyCard,
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
      }
    }
  },
  computed: {
    ...mapGetters(['currentUserInfo', 'isLogined']),
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
    const res = await $axios({
      url: `/minetoken/${route.params.id}`,
      methods: 'get',
      headers: { 'x-access-token': accessToekn }
    })

    if (res.code === 0) {
      return {
        minetokenToken: res.data.token || Object.create(null),
        minetokenUser: res.data.user || Object.create(null),
        minetokenExchange: res.data.exchange || Object.create(null)
      }
    } else {
      console.error(res.message)
    }
  },
  mounted() {
    if (process.browser) {
      if (this.currentUserInfo.id) this.tokenUserId(this.currentUserInfo.id)
      if (this.isLogined) {
        this.getBookmarkStatus()
        this.getUserBalance()
      }
    }
  },
  methods: {
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
      try {
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
  }
}
</script>

<style lang="less" scoped>

.token {
  min-height: calc(100% - (60px + 120px));
  background-color: #0E2144;
}
.token-main {
  max-width: 1200px;
  padding: 0 20px 60px;
  margin: 0 auto;
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
      content: '';
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
    font-size:24px;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:33px;
  }
  .head-user__founder {
    display: flex;
    align-items: center;

    font-size:16px;
    font-weight:400;
    color:rgba(178,178,178,1);
    line-height:22px;

    a {
      display: flex;
      align-items: center;
    }

    span {
      font-size:16px;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:22px;
      margin-left: 5px;
    }
  }

  p {
    padding: 0;
    margin: 0;
    font-size:16px;
    font-weight:400;
    color:rgba(178,178,178,1);
    line-height:22px;
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
    font-size:20px;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:28px;

    .dao__info__number__block {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-left: 26px;

      font-size:16px;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:22px;

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
  font-size:16px;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:22px;
  text-align: right;
  padding: 0;
  margin: 0;
}


.token-nav {
  margin: 40px 0 0 0;
  display: flex;
  align-items: center;
  a {
    padding: 0 0 5px 0;
    margin: 0 0 0 68px;
    display: block;
    font-size:20px;
    font-weight:500;
    color:rgba(178,178,178,1);
    line-height:28px;
    box-sizing: border-box;
    border-bottom: 3px solid transparent;
    &:hover {
      color: #fff;
    }
    &.active {
      color: #fff;
      border-bottom-color: #6236FF;
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

.join-btn {
  text-align: right;
}
.pentagram {
  margin-left: 10px;
  cursor: pointer;
  user-select: none;
}
</style>
