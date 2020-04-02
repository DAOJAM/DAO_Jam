<template>
  <div>
    <invitationCard
      v-for="(notification, index) in notifications"
      :key="index"
      :invitation="notification"
      class="notifications-card"
    />
    <buttonLoadMore
      class="load-more"
      :type-index="1"
      :params="pull.params"
      :api-url="pull.apiUrl"
      return-type="Array"
      @buttonLoadMore="onFetch"
    />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import buttonLoadMore from '@/components/button_load_more/index.vue'
import invitationCard from '@/components/notification/invitation_card'
const PROVIDERS = ['teamInviteRequest']
export default {
  name: 'NotificationPage',
  components: { buttonLoadMore, invitationCard },
  data() {
    const active = this.$route.params.provider && PROVIDERS.indexOf(this.$route.params.provider) >= 0 ? PROVIDERS.indexOf(this.$route.params.provider) : 0
    return {
      PROVIDERS,
      active,
      notifications: []
    }
  },
  computed: {
    ...mapState('notification', ['notificationCounters']),
    provider() {
      return PROVIDERS[this.active]
    },
    pull() {
      return {
        apiUrl: 'notifications',
        params: { 
          page: 1, 
          type: 'check_time', 
          provider: this.provider }
      }
    }
  },
  created() {
    this.getNotificationCounters()
  },
  methods: {
    ...mapActions('notification', ['getNotificationCounters']),
    onFetch({ data }) {
      if (Array.isArray(data) && data.length) {
        this.notifications.push(...data)
        this.$API.readNotifications(this.provider)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.load-more  {
  font-size: 16px !important;
}
.application-card {
  margin: 20px 20px 0 20px;
  &:nth-child(1) {
    margin-top: 0;
  }
}
</style>
