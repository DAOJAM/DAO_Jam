<template>
  <div>
    <header class="header">
      <div class="header-content">
        <a
          href="/"
          class="logo-link"
        >
          <img
            class="logo"
            src="@/assets/img/daojam_logo.png"
            alt="logo"
          >
        </a>

        <svg-icon
          v-if="isLevelOnePage"
          icon-class="menu"
          class="menu-icon"
          @click.stop="showSidebar"
        />
        <div
          v-else
          class="menu-icon"
          @click.stop="$router.go(-1)"
        >
          <i class="el-icon-arrow-left" />
        </div>

        <div class="header-right">
          <ul class="header-tag">
            <li>
              <n-link :to="{name: 'daos'}">
                PROJECTS
              </n-link>
            </li>
            <li>
              <n-link :to="{name: 'leaderboard'}">
                LEADERBOARD
              </n-link>
            </li>
            <li>
              <n-link :to="{name: 'tasks'}">
                PRIZES
              </n-link>
            </li>
          </ul>
          <!-- <div
            v-if="isLogined"
            class="daos"
          >
            <svg-icon
              class="icon"
              icon-class="daos"
            />
            0
          </div> -->
          <votingDropdownMenu class="daos-margin" />
          <a
            v-if="!isLogined"
            href="javascript:;"
            class="sign-btn"
            @click="login"
          >{{ $t('home.signIn') }}</a>
          <el-dropdown
            v-else
            class="user-menu"
          >
            <avatar :src="avatarSrc" />
            <el-dropdown-menu
              slot="dropdown"
              class="user-dorpdown"
            >
              <!-- 个人主页 -->
              <n-link
                :to="{name: 'user-id', params:{id: currentUserInfo.id}}"
                class="link"
              >
                <el-dropdown-item>
                  {{ currentUserInfo.nickname || currentUserInfo.name }}
                </el-dropdown-item>
              </n-link>

              <el-divider class="divider" />

              <!-- 我的项目 -->
              <n-link
                v-if="token.id"
                :to="{name: 'daos-id', params:{ id: token.id }}"
                class="link"
              >
                <el-dropdown-item>
                  <avatar
                    class="project-logo"
                    :src="logoSrc"
                  />
                  {{ token.name }}
                </el-dropdown-item>
              </n-link>

              <!-- 通知中心 -->
              <n-link
                :class="{ badge: hasNewNotification }"
                to="/notification"
                class="link">
                <el-dropdown-item>
                  <svg-icon
                    class="icon"
                    icon-class="bell"
                  />
                  Notification
                </el-dropdown-item>
              </n-link>

              <!-- 设置 -->
              <n-link
                :to="{name: 'setting', params:{id: currentUserInfo.id}}"
                class="link"
              >
                <el-dropdown-item>
                  <svg-icon
                    class="icon"
                    icon-class="setting"
                  />
                  Setting
                </el-dropdown-item>
              </n-link>

              <!-- 退出登录 -->
              <div
                class="link"
                @click="signOut"
              >
                <el-dropdown-item>
                  <svg-icon
                    class="icon"
                    icon-class="signout"
                  />
                  {{ $t('home.signOut') }}
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <div
        class="header-sidebar"
        :class="toggle && 'open'"
      >
        <div
          class="header-sidebar__full"
          @click.stop="toggle = false"
        />
        <div class="header-sidebar__content">
          <avatar
            class="user-avatar"
            :src="avatarSrc"
          />
          <p class="user-name">
            {{ currentUserInfo.nickname || currentUserInfo.name }}
          </p>

          <ul>
            <li>
              <svg-icon
                icon-class="user"
                class="icon"
              />
              <n-link :to="{name: 'user-id', params:{id: currentUserInfo.id}}">
                我的主页
              </n-link>
            </li>
            <!-- 我的项目 -->
            <li v-if="token.id">
              <avatar
                class="project-logo"
                :src="logoSrc"
              />
              <n-link :to="{name: 'daos-id', params:{ id: token.id }}">
                {{ token.name }}
              </n-link>
            </li>
            <li>
              <svg-icon
                icon-class="home"
                class="icon"
              />
              <n-link :to="{name: 'setting', params:{id: currentUserInfo.id}}">
                {{ $t('home.account') }}
              </n-link>
            </li>
          </ul>

          <div class="user-footer">
            <div
              class="user-footer__block"
              @click="signOut"
            >
              <svg-icon
                icon-class="logout"
                class="logout-icon"
              />
              {{ isLogined ? $t('home.signOut') : $t('home.signIn') }}
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import throttle from 'lodash/throttle'

import { removeCookie } from '@/utils/cookie'
import store from '@/utils/store.js'
import avatar from '@/common/components/avatar/index.vue'
import votingDropdownMenu from '@/components/voting_dropdown_menu/index.vue'
export default {
  components: {
    avatar,
    votingDropdownMenu
  },
  data() {
    return {
      avatarSrc: '',
      toggle: false,
      scrollEvent: null,
      levelOnePage: [
        'article',
        'daos',
        'stat',
        'tasks',
      ],
      token: {
        id: null,
        name: null,
        logo: null
      }
    }
  },
  computed: {
    ...mapGetters(['currentUserInfo', 'isLogined', 'isMe']),
    ...mapGetters('notification', ['hasNewNotification']),

    isLevelOnePage() {
      return  this.levelOnePage.includes(this.$route.name)
    },
    logoSrc() {
      return this.token.logo ? this.$ossProcess(this.token.logo) : ''
    }
  },
  watch: {
    isLogined(newState) {
      if (newState) {
        this.refreshUser()
        this.tokenDetail()
      }
    },
  },
  created() {
    const { isLogined, refreshUser, tokenDetail } = this
    if (isLogined) {
      refreshUser()
      tokenDetail()
    }
    if (process.browser) {
      this.$nextTick(() => {
        this.setHeader()
        this.scrollEvent = throttle(this.setHeader, 300)
        window.addEventListener('scroll', this.scrollEvent)
      })
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollEvent)
  },
  methods: {
    ...mapActions(['getCurrentUser', 'resetAllStore', ]),
    ...mapActions('notification', ['getNotificationCounters']),
    setHeader() {
      try {
        let domHeader = document.querySelector('.header')
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop

        if (scrollTop > 20) {
          domHeader.style.backgroundColor = 'rgba(98,54,255,0.1)'
        } else {
          domHeader.style.backgroundColor = '#372BA1'
        }
      } catch (error) {
        console.log(error)
      }
    },
    async refreshUser() {
      const { avatar } = await this.getCurrentUser()
      if (avatar) this.avatarSrc = this.$ossProcess(avatar, { h: 60 })
      this.getNotificationCounters()
      this.checkIsVerified()
    },
    // 获取用户创建的项目
    tokenDetail() {
      this.$API.tokenDetail().then(res => {
        if (res.code === 0) {
          if(res.data.token) this.token = res.data.token
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 显示侧边栏
    showSidebar () {
      if (!this.isLogined) {
        this.login()
      } else {
        this.toggle = true
      }
    },
    // 登录
    login() {
      this.$store.commit('setLoginModal', true)
      this.$emit('login')
    },
    // 退出登录
    signOut() {
      if (confirm(this.$t('warning.confirmLogout'))) {

        // 出错后弹出框提示
        const alertDialog = () => {
          this.$alert('很抱歉，退出登录失败，点击确定刷新', '温馨提示', {
            showClose: false,
            type: 'success',
            callback: () => {
              window.location.reload()
            }
          })
        }

        // 重置all store
        this.resetAllStore()
          .then(() => {
            window.walletConnection.signOut()
            removeCookie('ACCESS_TOKEN')
            removeCookie('idProvider')
            removeCookie('referral')
            store.clear()
            sessionStorage.clear()

            if (this.$route.name === 'article') {
              this.$router.go(0)
            } else {
              this.$router.replace({
                name: 'article'
              })
            }

            // 通知刷新其他页面
            setTimeout(() => {
              this.$userMsgChannel.postMessage('logout')
            }, 2000)

          }).catch(err => {
            console.log(err)
            alertDialog()
          })
      }
    },
    viewNotification() {
      if (this.isLogined) {
        this.$router.push('/notification')
      } else {
        this.$store.commit('setLoginModal', true)
      }
    },
    async checkIsVerified() {
      const { data } = await this.$API.getKycStatus()
      console.info('kyc ', data)
      if (!data.verified) {
        // 提示用户去绑定 Email 和 GitHub 实现用户认证
        this.$notify.closeAll() // 先清理掉其他 Notification
        const h = this.$createElement
        this.$notify({
          title: this.$t('kyc.notificationPop.title'),
          type: 'info',
          dangerouslyUseHTMLString: true,
          message: h('p', null, [
            h('p',  null, this.$t('kyc.notificationPop.message')),
            h('el-button', {
              props: {size: 'small', type: 'primary'},
              on: { click: () => { this.$router.push('/setting/account') }}
            }, this.$t('kyc.notificationPop.buttonText')),
          ]),
          duration: 0
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 60px;
  box-sizing: border-box;

  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99;
  padding: 0 20px;

  background: rgba(98,54,255,0.1);
  transition: all .3s;
  -webkit-backdrop-filter: blur(10px);

  overflow: hidden;


  &::after {
    content: '';
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



  .logo {
    height: 32px;
  }

  .header-content {
    max-width: 1200px;
    height: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    margin: 0 auto;
    backdrop-filter: blur(10px);
  }

  &-right {
      display: flex;
      align-items: center;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        margin-right: 40px;
        display: inline-block;
        &:nth-last-child(1) {
          margin-right: 0;
        }
        a {
          font-size:16px;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:22px;
        }
      }
    }
    .notification {
      margin: 0 40px;
      cursor: pointer;
      .icon {
        color: #fff;
        font-size: 23px;
      }
    }

    .badge{
      position: relative;
      &::after{
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 10px;
        background: rgba(251,104,119,1);
        position: absolute;
        z-index: 1000;
        right: 0%;
        margin-right: -3px;
        margin-top: -3px;
      }
    }

    .daos {
      color: #fff;
      font-size:16px;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:22px;
      margin: 0 40px 0 0;
      .icon {
        color: #fff;
        font-size: 20px;
      }
    }
  }

  .sign-btn {
    padding: 0 20px;
    height:36px;
    background:rgba(98,54,255,1);
    border-radius:4px;

    display: block;
    font-size: 16px;
    font-weight: 400;
    color: rgba(255,255,255,1);
    line-height: 36px;
    transition: all .3s;
    cursor: pointer;
    &:hover {
      background:mix(rgba(98,54,255,1), #fff, 90%)
    }
  }
}
.menu-icon {
  color: #fff;
  font-size: 24px;
  display: none;
  opacity: 0;
  visibility: hidden;
}
.header-sidebar {
  &.open {
    .header-sidebar__content {
      transform: translateX(0);
      box-shadow: 0 0 10px rgba(0,0,0,0.6);
    }
    .header-sidebar__full {
      display: block;
      visibility: initial;
      opacity: 1;
    }
  }

}
.header-sidebar__full {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: none;
  visibility: hidden;
  overflow: 0;
  transition: all .2s;
}
.header-sidebar__content {
  transform: translateX(-100%);
  width: 80%;
  background: #fff;
  z-index: 2;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  transition: all .3s;
  padding: 0 0 50px;
  box-sizing: border-box;
  .user-avatar {
    margin: 20px 0 0 20px;
    width: 60px;
    height: 60px;
  }
  .user-name {
    padding: 0;
    margin: 10px 0 0 20px;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 1px;
  }

  ul {
    padding: 10px 20px 0;
    margin: 30px 0 0 0;
    border-top: 1px solid #e2e2e2;
    list-style: none;
    li {
      padding: 10px 0;
      margin: 10px 0 0 0;
      display: flex;
      align-items: center;
      .icon {
        color: #000;
        font-size: 16px;
        margin: 0 10px 0 0;
      }
      a {
        font-size: 14px;
        display: block;
        color: #000;
        letter-spacing: 1px;
      }
    }
  }
  .user-footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1px solid #e2e2e2;
    padding: 0 20px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    height: 50px;
    box-sizing: border-box;
    line-height: 50px;
    cursor: pointer;
  }
}
.daos-margin {
  margin: 0 40px;
}
.project-logo {
  width: 23px;
  height: 23px;
  border-radius: 8px;
  margin-right: 5px;
  margin-left: -7px;
}

.divider {
  margin: 5px auto 10px;
  width: 80%;
  background-color: #979797;
}

@media screen and (max-width: 830px) {
  .header-bg {
    height: 50px;
  }

  .header {
    height: 50px;
    padding: 0;
  }

  .user-menu,
  .logo-link {
    display: none;
    opacity: 0;
    visibility: hidden;
  }

  .header-tag {
    display: none;
    opacity: 0;
    visibility: hidden;
  }

  .sign-btn {
    display: none !important;
    opacity: 0;
    visibility: hidden;
  }
  .header-right ul li:nth-last-child(1) {
    margin-right: 0;
  }
  .header-right {
    margin-right: 0;
  }
  .menu-icon {
    display: block;
    visibility: initial;
    opacity: 1;
  }
  .daos-margin{
    margin: 0;
  }
}

@media screen and (max-width: 990px) {
  .header .logo {
    height: 24px;
  }
  .header-right ul li{
    margin-right: 20px;
  }
  .header-right ul li a {
    font-size: 14px;
  }
}
</style>


<style lang="less">
.user-dorpdown {
  background-color: #333333 !important;
  border: 1px solid #333 !important;
  .popper__arrow, .popper__arrow::after {
    border-bottom-color:  #333 !important;
  }
  .el-dropdown-menu__item {
    color: #fff;
    display: flex;
    align-items: center;
    .icon {
      margin-right: 6px;
      font-size: 16px;
    }
    &:hover,
    &:active {
      background-color: #3f3f3f !important;
      color: #fff !important;
    }
  }
}
</style>