<template>
  <div class="notification">
    <g-header />
    <el-row class="notification-container">
      <el-col :span="7">
        <nav>
          <ul>
            <li
              v-for="(nav, index) in navItems"
              :key="index"
              :class="{ active: $route.name === nav.route }"
            >
              <router-link :class="{badge: newNotificationsMap[nav.text]}" :to="{name: nav.route}">
                <svg-icon
                  :icon-class="nav.icon"
                  class="icon"
                />
                {{ nav.text }}
              </router-link>
            </li>
          </ul>
        </nav>
      </el-col>
      <el-col :span="17">
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
        { name: 'follow', route: 'notification-index', text: 'Follower', icon: 'follow' },
        { name: 'recommend', route: 'notification-index-application', text: 'Application', icon: 'follow' },
        { name: 'recommend', route: 'notification-index-achievement', text: 'Achievement', icon: 'follow' },
        { name: 'recommend', route: 'notification-index-invitation', text: 'Invitation', icon: 'follow' },
      ],
      notifications: []
    }
  },
  computed: {
    ...mapState('notification', ['notificationCounters']),
    newNotificationsMap() {
      // Number() is becuz cached data is string, not number
      const isNew = (num) => Boolean(Number(num))
      const Follower = isNew(this.notificationCounters.follow)
      const Application = isNew(this.notificationCounters.teamApplyRequest)
      const Invitation = isNew(this.notificationCounters.teamInviteRequest)
      // @todo, no actual Achievement, so no real Achievement notify
      const Achievement = Boolean(false)
      return {
        Follower,
        Application,
        Invitation,
        Achievement
      }
    }
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
<style lang="less" scoped>
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
</style>