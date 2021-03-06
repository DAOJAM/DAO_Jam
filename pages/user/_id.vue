<template>
  <div class="user">
    <g-header />
    <main class="user-main">
      <div class="user-head">
        <div class="user-avatar">
          <avatar :src="userAvatar" />
          <h1>{{ userInfo.nickname || userInfo.username || '&nbsp;' }}</h1>
          <!-- <el-tooltip
            effect="dark"
            content="专业评委"
            placement="bottom"
          >
            <div class="judge">
              <svg-icon
                icon-class="judge"
                class="icon-judge"
              />
            </div>
          </el-tooltip> -->
        </div>
        <div class="user-edit">
          <el-button
            icon="el-icon-share"
            round
            @click="shareModalShow = true"
          >
            {{ $t('share') }}
          </el-button>
          <followBtn
            v-if="!isMe(Number($route.params.id))"
            :id="Number($route.params.id)"
          />
          <el-button
            v-else
            type="primary"
            icon="el-icon-s-tools"
            round
            @click="$router.push({name: 'setting'})"
          >
            {{ $t('user.editProfile') }}
          </el-button>
        </div>
      </div>


      <nav class="user-nav">
        <n-link
          :to="{name: 'user-id', params: { id: $route.params.id }}"
          :class="$route.name === 'user-id' && 'active'"
          replace
        >
          Information
        </n-link>
        <n-link
          :to="{name: 'user-id-relationship', params: { id: $route.params.id }}"
          :class="$route.name === 'user-id-relationship' && 'active'"
          replace
        >
          Relationship
        </n-link>
        <n-link
          :to="{name: 'user-id-dao', params: { id: $route.params.id }}"
          :class="$route.name === 'user-id-dao' && 'active'"
          replace
        >
          Projects
        </n-link>
        <n-link
          :to="{name: 'user-id-vote', params: { id: $route.params.id }}"
          :class="$route.name === 'user-id-vote' && 'active'"
        >
          Voted
        </n-link>
      </nav>
      <router-view />

      <share
        v-model="shareModalShow"
        :social-img="userInfo.avata"
        :social-title="socialTitle"
        :social-link="socialLink"
        social-summary="Support quality projects"
        :copy-link="socialTitle"
        :social-wechat="socialLink"
      />
    </main>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import avatar from '@/common/components/avatar/index.vue'
import followBtn from '@/components/follow_btn'
import share from '@/components/share'

export default {
  components: {
    avatar,
    followBtn,
    share
  },
  data() {
    return {
      shareModalShow: false, // share dialog
      userInfo: Object.create(null) // 用户信息
    }
  },
  computed: {
    ...mapGetters(['isMe', 'currentUserInfo']),
    socialTitle() {
      if (process.browser) {
        return `${this.userInfo && (this.userInfo.nickname || this.userInfo.username) }'s personal homepage \n${window.location.href}`
      }
      return `${this.userInfo && (this.userInfo.nickname || this.userInfo.username) }'s personal homepage`
    },
    socialLink() {
      if (process.browser) {
        return window.location.href
      }
      return process.env.VUE_APP_URL
    },
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
    },
  }
}
</script>

<style lang="less" scoped>
.user {
  min-height: calc(100% - 120px);
  background-color: #0e2144;
}

.user-main {
  max-width: 1200px;
  padding: 0 20px 140px;
  margin: 0 auto;
}

.user-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 90px;
}
.user-avatar {
  display: flex;
  align-items: center;
  position: relative;
  .judge {
    position: absolute;
    bottom: 0px;
    left: 90px;
    z-index: 1;
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #f7b500;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon-judge {
    font-size: 16px;
    color: #fff;
  }
  .components-avatar {
    width: 120px;
    height: 120px;
  }
  h1 {
    margin-left: 20px;
    font-size: 24px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 33px;
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
@media screen and (max-width: 830px) {
  .user-nav {
    justify-content: space-around;
    a {
      font-size: 16px;
      margin: 0;
    }
  }
  .user-head {
    display: block;
  }
  .user-edit {
    margin-top: 20px;
  }
}
</style>