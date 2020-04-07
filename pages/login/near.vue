<template>
  <div
    v-loading="loading"
    style="height: 100%;"
    element-loading-text="near登录中..."
  />
</template>

<script>
export default {
  layout: 'empty',
  name: 'NearLoginPage',
  data() {
    return {
      loading: true
    }
  },
  computed: {},
  async mounted() {
    const from = this.$route.query.from
    if (from === 'login') {
      this.nearLogin()
    } else {
      this.nearBinding()
    }
  },
  methods: {
    nearLogin() {
      console.log('===========nearLogin============')
      const isSignedIn = window.walletConnection.isSignedIn()
      if (isSignedIn) {
        const account = window.walletConnection.getAccountId()
        this.$API.auth({
          platform: 'near',
          publickey: account
        }).then(res => {
          this.$store.commit('setAccessToken', res.data)
          this.$store.commit('setUserConfig', { idProvider: 'near' })
          this.$router.push({
            name: 'index'
          })
        }).finally(() => {
          this.loading = false
        })
      } else {
        window.walletConnection.requestSignIn(
          window.nearConfig.contractName,
          'DAOJAM'
        )
      }
    },
    nearBinding() {
      console.log('===========nearBinding============')
      const isSignedIn = window.walletConnection.isSignedIn()
      if (isSignedIn) {
        const account = window.walletConnection.getAccountId()
        this.$API.accountBind({
          platform: 'near',
          publickey: account
        })
          .then(res => {
            if (res.code === 0) {
              this.$message.success(res.message)
            } else {
              this.$message.warning(res.message)
            }
            this.$router.push({
              name: 'index'
            })
          })
          .catch(err => {
            console.log(err)
            this.$message.error('绑定失败')
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        window.walletConnection.requestSignIn(
          window.nearConfig.contractName,
          'DAOJAM'
        )
      }
    }
  }
}
</script>

<style scoped></style>
