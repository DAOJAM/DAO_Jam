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
        :to="{ name: tag.url, query: { hold } }"
        :class="$route.name === tag.url && 'active'"
      >
        {{ tag.title }}
      </router-link>
    </div>
    <div
      v-loading="holdLoading"
      element-loading-background="#132D5E"
      class="info"
    >
      <h3>
        <svg-icon
          icon-class="project_team"
        />
        PROJECT SETTING
      </h3>

      <router-link
        v-for="(tag, index) in projectTagsList"
        :key="index"
        :to="{ name: tag.url, query: { hold } }"
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
      holdLoading: true,
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
        { title: 'Task', url: 'project-task' },
        { title: this.$t('user.applycoins'), url: 'tokens-apply' },
        { title: this.$t('user.projectProgress'), url: '' },
      ],
      // 0：未知 / 1：无项目 / 2：有项目
      hold:  Number(this.$route.query.hold) || 0
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    this.tokenDetail()
  },
  mounted() {
  },
  methods: {
    // 项目菜单中是显示“新建项目”还是“项目信息”
    tokenDetail() {
      const tokenTag = this.projectTagsList.findIndex(tag => tag.url === 'tokens-apply')
      // 根据之前缓存的状态直接显示
      if(this.hold == 2) {
        this.projectTagsList[tokenTag].title = this.$t('user.editcoins')
        this.projectTagsList[tokenTag].url = 'editminetoken'
      }
      if(this.hold) this.holdLoading = false
      // 获取用户是否有项目
      this.$API.tokenDetail().then(res => {
        if (res.code === 0) {
          this.holdLoading = false
          if (res.data.token) {
            if (tokenTag !== -1) {
              this.projectTagsList[tokenTag].title = this.$t('user.editcoins')
              this.projectTagsList[tokenTag].url = 'editminetoken'
              this.hold = 2
            }
          }
          else this.hold = 1
        } else {
          this.$message.error(res.message)
        }
        const query = { ...this.$route.query }
        query.hold = this.hold
        this.$router.push({
          query
        })
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
