<template>
  <div class="user">
    <g-header></g-header>
    <main class="user-main">
      <div class="user-head">
        <div class="user-avatar">
          <avatar :src="userAvatar"></avatar>
          <h1>{{ userInfo.nickname || userInfo.username || '&nbsp;' }}</h1>
        </div>
        <div class="user-edit">
          <a v-if="userAddress" :href="'http://rinkeby.etherscan.io/address/' + userAddress" target="_blank">
            <el-button size="small">
              <svg-icon icon-class="eth_mini" />
              链上查看
            </el-button>
          </a>
          <followBtn
            v-if="!isMe(Number($route.params.id))"
            :id="Number($route.params.id)"
          />
          <router-link v-else :to="{name: 'setting'}">
            <el-button size="small">
              {{ $t('user.editProfile') }}
            </el-button>
          </router-link>
          <el-button @click="shareModalShow = true" size="small">
            <svg-icon icon-class="share_new" />
            {{ $t('share') }}
          </el-button>
        </div>
      </div>


      <nav class="user-nav">
        <n-link :to="{name: 'user-id', params: { id: $route.params.id }}" :class="$route.name === 'user-id' && 'active'">INFORMATION</n-link>
        <n-link :to="{name: 'user-id-capital', params: { id: $route.params.id }}" :class="$route.name === 'user-id-capital' && 'active'">CAPITAL</n-link>
        <n-link :to="{name: 'user-id-capital', params: { id: $route.params.id }}" :class="$route.name === 'user-id-capital' && 'active'">CAPITAL</n-link>
        <n-link :to="{name: 'user-id-capital', params: { id: $route.params.id }}" :class="$route.name === 'user-id-capital' && 'active'">CAPITAL</n-link>
      </nav>
      <router-view></router-view>

      <Share
      :share-modal-show="shareModalShow"
      :minetoken-user="{nickname: userInfo.name}"
      :page-type="1"
      :img="userInfo.avatar"
      @input="val => shareModalShow = val"
    />
    </main>
  </div>
</template>


<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import avatar from '@/common/components/avatar/index.vue'
import followBtn from '@/components/follow_btn'
import Share from '@/components/token/token_share.vue'

export default {
  components: {
    avatar,
    followBtn,
    Share
  },
  data() {
    return {
      shareModalShow: false, // share dialog
      userAddress: '', // user address
      userInfo: Object.create(null) // 用户信息
    }
  },
  computed: {
    ...mapGetters(['isMe', 'currentUserInfo']),
    userAvatar() {
      if (this.userInfo.avatar) {
        return this.$ossProcess(this.userInfo.avatar, { h: 200 })
      } else {
        return ''
      }
    }
  },
  mounted() {
    if (process.browser) {
      this.getUserData()
    }
  },
  methods: {
    async getUserData() {
      
      // 工厂函数 返回接口数据
      const factory = async api => {
        try {
          const res = await api
          if (res.code === 0) {
            return res.data
          } else {
            console.log(res.message)
            return
          }
        } catch (error) {
          console.log(error)
          return
        }
      }

      // get user info
      const userInfo = await factory(this.$API.getUser(this.$route.params.id))
      this.userInfo = userInfo || Object.create(null)

      // 获取自己的address
      this.userAddress = await factory(this.$API.userAddress({
        uid: this.currentUserInfo.id
      }))
    },
  }
}
</script>

<style lang="less" scoped>

.user {
  padding: 60px 0 0 0;
  min-height: calc(100% - (60px + 200px));
  background-color: #0E2144;
}

.user-main {
  max-width: 1200px;
  padding: 0 20px 60px;
  margin: 0 auto;
}

.user-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;
}
.user-avatar {
  display: flex;
  align-items: center;
  .components-avatar {
    width: 120px;
    height: 120px;
  }
  h1 {
    margin-left: 20px;
    font-size:24px;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:33px;
  }
}

.user-nav {
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
</style>