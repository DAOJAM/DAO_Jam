<template>
  <section
    v-loading="loading"
    class="login"
  >
    <div class="oauth-box">
      <h1 class="oauth-title">
        {{ $t('login') }}
      </h1>
      <div class="oauth">
        <div
          class="oauth-bg bg-near"
          @click="walletLogin('Near')"
        >
          <svg-icon
            class="oauth-icon"
            icon-class="near_login"
          />
        </div>
        <div
          class="oauth-bg bg-github"
          @click="walletLogin('GitHub')"
        >
          <svg-icon
            class="oauth-icon"
            icon-class="github_login"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import { getCookie, setCookie } from '@/utils/cookie'

export default {
  name: "LoginContent",
  data() {
    return {
      referral: false,
      loading: false,
    };
  },
  computed: {
    ...mapState(["loginModalShow"]),
    wxloginHref() {
      const appid = "wx95829b6a2307300b";
      const redirectUri = `${process.env.WX_SHARE_HOST}`;
      const scope = "snsapi_login";
      return `https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`;
    }
  },
  watch: {
    // 登录框关闭 隐藏loading
    loginModalShow(newVal) {
      if (newVal) {
        // 和移动端有点不一样, 这里借用这个func来执行 referral
        this.getReferral();
      } else {
        this.loading = false;
      }

    }
  },
  async mounted() {
    if (process.browser) {
      this.getReferral()
    }
  },
  methods: {
    setPathToSession(name) {
      if (window.sessionStorage) {
        const { pathname, search, hash } = window.location
        sessionStorage.setItem(name, pathname + search + hash)
      } else {
        console.log('don\'t support sessionStorage')
      }
    },
    async walletLogin(type) {
      this.setPathToSession('githubFrom')
      if (type === "GitHub") {
        this.$router.push({
          name: "login-github"
        });
        return;
      } else if (type === 'Near') {
        this.nearLogin()
      } else await this.$message.error(this.$t("error.loginFail"));
    },
    async nearLogin() {
      this.$store.commit('setLoginModal', false)
      this.$router.push({ name: 'login-near', query: { from: 'login' } })
    },
    // 得到邀请状态
    getReferral() {
      let search = window.location.search.slice(1)
      let searchArr = search.split('&')
      let searchFilter = searchArr.filter((i) => i.includes('referral='))
      // 有邀请id
      if (searchFilter.length) {
        setCookie('referral', searchFilter[0].slice(9))
        this.referral = true
      } else {
        let referral = getCookie('referral')
        if (referral) this.referral = true
      }
    }
  }
};
</script>

<style lang="less" scoped>
.oauth-box {
  text-align: center;
  .oauth-title {
    font-size: 18px;
    color: #f1f1f1;
    margin: 0 0 20px;
    font-weight: 400;
  }
  .oauth {
    display: flex;
    flex-direction: column;
    align-items: center;
    .oauth-bg {
      border-radius:8px;
      width: 280px;
      height: 80px;
      display: flex;
      align-items: center;
      transition: all 0.5s;
      cursor: pointer;
      &:nth-child(1) {
        margin-bottom: 20px;
      }
      .oauth-icon {
        height: 40px;
        width: 100%;
      }
      &:hover {
        transform: scale(1.05);
      }
    }
  }
}
.bg-near {
  background: #333333;
}
.bg-github {
  background: #6236FF;
}
</style>
