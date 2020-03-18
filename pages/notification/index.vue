<template>
  <div class="notification">
    <g-header />
    <el-row class="notification-container">
      <el-col :span="5">
        <nav>
          <ul>
            <li
              v-for="(nav, index) in navItems"
              :key="index"
              :class="{ active: $route.name === nav.route }"
            >
              <router-link :to="{name: nav.route}">
                <svg-icon
                  :icon-class="nav.icon"
                  class="icon"
                />
                {{ nav.text }}
                <span class="count">+{{ notificationCounters[nav.name] || 0 }}</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </el-col>
      <el-col :span="19">
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'NotificationPage',
  data() {
    return {
      navItems: [
        { name: 'follow', route: 'notification-index', text: '粉丝', icon: 'follow' },
        { name: 'recommend', route: 'notification-index-application', text: '申请', icon: 'follow' },
        { name: 'recommend', route: 'notification-index-achievement', text: '成就', icon: 'follow' },
      ],
      notifications: []
    }
  },
  computed: {
    ...mapState('notification', ['notificationCounters']),
  },
  created() {
    this.getNotificationCounters()
    console.log(this.$route)
    console.log(this.$router)
  },
  methods: {
    ...mapActions('notification', ['getNotificationCounters']),
  }
}
</script>
<style lang="less" scoped src="./index.less"></style>