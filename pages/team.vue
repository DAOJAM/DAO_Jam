<template>
  <div class="team-container">
    <g-header />
    <main class="team">
      <div
        v-if="status"
        class="team-main"
      >
        <router-link
          :to="{name: 'token-id', params: { id: tokenData.token.id || query.t }}"
          target="_blank"
        >
          <c-avatar :src="avatar" />
          <p class="team-token">{{ tokenData.token.symbol }}-{{ tokenData.token.name }}</p>
        </router-link>

        <div class="team-invite">
          <router-link :to="{name: 'user-id', params: { id: tokenData.user.id || query.i }}" target="_blank">
            {{ tokenData.user.nickname || tokenData.user.username }}
          </router-link>
          邀请您(
          <router-link :to="{name: 'user-id', params: { id: userData.id || query.u }}" target="_blank">
            {{ userData.nickname || userData.username }}
          </router-link>
          )加入他的团队
        </div>
        <el-button type="primary" class="team-btn" @click="inviteSuccess">
          接受邀请
        </el-button>
      </div>
      <div v-else>
        <svg-icon
          class="icon-error"
          icon-class="lapse"
        />
        <p class="team-error">
          邀请链接失效!!!
        </p>
        <a
          class="tem-error__link"
          href="/"
        >回到首页</a>
      </div>
    </main>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import queryString from 'query-string'
export default {
  data() {
    return {
      status: true,
      query: {},
      tokenData: {
        user: {},
        token: {},
      },
      userData: {}
    }
  },
  computed: {
    ...mapGetters(['isLogined']),
    avatar() {
      const logo = this.tokenData.token.logo
      return logo ? this.$ossProcess(logo) : ''
    }
  },
  created() {
    if (process.browser) {
      try {
        const query = queryString.parse(window.location.search)
        this.query = query

        this.getAllInfo(query)

        this.status = true
      } catch (error) {
        this.status = false
        console.log(error)
      }
    }
  },
  methods: {
    // 得到相关信息
    async getAllInfo(data) {
      await this.$API.minetokenId(data.t)
        .then(res => {
          // token的拥有人必须与邀请人一致
          if (res.code === 0 && res.data.user.id === Number(data.i)) {
            this.tokenData = res.data
          } else {
            this.status = false
            console.log(res.message)
          }
        })
        .catch(err => {
          this.status = false
          console.log(err)
        })

      await this.$API.getUser(data.u)
        .then(res => {
          if (res.code === 0) {
            this.userData = res.data
          } else {
            this.status = false
            console.log(res.message)
          }
        })
        .catch(err => {
          this.status = false
          console.log(err)
        })
    },
    // 同意邀请
    async inviteSuccess() {
      if (!this.isLogined) {
        this.$message.info('请登录后操作')
        return
      }
      await this.$API.teamMemberInviteSuccess(this.query.t, {
        teamMember: {
          invite_id: this.query.i
        }
      })
        .then(res => {
          if (res.code === 0) {
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.team-container {
  min-height: calc(100% - 60px - 120px);
  padding: 60px 0 0 0;
  background-color: #0e2144;
}
.team {
  max-width: 800px;
  min-height: 300px;
  margin: 40px auto 0;
  background-color: #fff;
  border-radius: 3px;
}
.icon-error {
  font-size: 40px;
  margin: 0px auto;
  display: block;
  padding: 40px 0 0;
  color: #333;
}
.team-error {
  color: #333;
  text-align: center;
  padding: 20px 0 0;
  font-size: 18px;
  margin: 0;
}
.tem-error__link {
  text-decoration: underline;
  text-align: center;
  display: block;
  margin: 30px 0 0 0;
  color: #333;
  cursor: pointer;
}

.team-main {
  text-align: center;
  padding: 40px 0;
  .components-avatar {
    width: 60px;
    height: 60px;
    margin: 0 auto;
    padding: 0px 0 0;
  }
  .team-token {
    padding: 0;
    margin: 10px 0;
    font-size: 20px;
    font-weight: bold;
  }
  .team-invite {
    font-size: 16px;
    padding: 0;
    margin: 10px 0;
    color: #333;
    a {
      cursor: pointer;
      text-decoration: underline;
      color: #333;
    }
  }
  .team-btn {
    margin: 40px auto 0;
  }
}
</style>