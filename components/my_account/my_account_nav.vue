<template>
  <div>
    <div class="info">
      <h3>
        <svg-icon
          icon-class="voted_users"
        />
        PERSONAL SETTING
      </h3>
      <router-link
        v-for="(tag, index) in tagsList"
        :key="index"
        :to="{ name: tag.url }"
        :class="$route.name === tag.url && 'active'"
      >
        {{ tag.title }}
      </router-link>
    </div>
    <div class="info">
      <h3>
        <svg-icon
          icon-class="project_team"
        />
        DAO SETTING
      </h3>
      <router-link
        v-for="(tag, index) in projectTagsList"
        :key="index"
        :to="{ name: tag.url }"
        :class="$route.name === tag.url && 'active'"
      >
        {{ tag.title }}
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
  },
  data() {
    return {
      tagsList: [
        { title: this.$t('user.userInformation'), url: 'setting' },
        { title: this.$t('user.accountSetting'), url: 'setting-account' },
        { title: this.$t('user.wallet'), url: 'account' },
        { title: this.$t('user.fanWallet'), url: 'tokens' },
        // { title: this.$t('user.myBookmark'), url: 'bookmark' },
        // { title: this.$t('user.buyHistory'), url: 'buy' },
        { title: this.$t('user.invite'), url: 'invite' },
        // { title: this.$t('user.systemSetting'), url: 'setting-system' }
      ],
      projectTagsList: [
        { title: this.$t('user.mission'), url: '' },
        { title: this.$t('user.applycoins'), url: 'tokens-apply' },
        { title: this.$t('user.projectProgress'), url: '' },
      ],
      tokens: false
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    this.whichButtonToShow()
  },
  mounted() {
  },
  methods: {
    async whichButtonToShow() {
      await this.getMyUserData()
      const i = this.projectTagsList.findIndex(tag => tag.url === 'tokens-apply')
      if (i !== -1 && this.tokens) {
        this.projectTagsList[i].title = this.$t('user.editcoins')
        this.projectTagsList[i].url = 'editminetoken'
        this.tokenDetail()
      }
    },
    async tokenDetail() {
      await this.$API.tokenDetail().then(res => {
        if (res.code === 0) {
          if (!res.data.token) {
            const i = this.projectTagsList.findIndex(tag => tag.url === 'editminetoken')
            if (i !== -1) {
              this.projectTagsList[i].url = 'postminetoken'
            }
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    async getMyUserData() {
      await this.$API.getMyUserData().then(res => {
        const statusToken = (res.data.status & this.$userStatus.hasMineTokenPermission)
        if (res.code === 0 && statusToken) this.tokens = true
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  overflow: hidden;
  background-color: #132D5E;
  border-radius: @br10;
  padding: 10px 20px;
  a {
    display:block;
    color: #B2B2B2;
    font-size: 18px;
    padding: 10px 0;
    &.active {
      font-weight:bold;
      color: #fff;
    }
  }
  h3 {
    font-size:20px;
    color: white;
    line-height:28px;
  }
  &:nth-child(2) {
    margin-top: 20px;
  }
}
</style>
