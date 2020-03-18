<template>
  <div>
    <div
      v-for="(notification, index) in notifications"
      :key="index"
      class="card"
    >
      <!-- Possible an eslint issue: https://github.com/vuejs/eslint-plugin-vue/issues/869 Remove next workaround if resolved -->
      <!-- eslint-disable-next-line vue/require-component-is -->
      <component
        :is="COMPONENTS[notification.kind]"
        :avatar="notification.avatar"
        :source="notification.source"
        :timestamp="notification.timestamp"
        :message="notification.message"
        :actions="notification.actions"
      />
    </div>
  </div>
</template>
<script>
import NewFanNotification from '@/components/notification/NewFanNotification.vue'
const COMPONENTS = {
  follow: NewFanNotification.name
  // ADD MORE NOTIFICATION
}
export default {
  name: 'NotificationList',
  /* eslint-disable vue/no-unused-components */
  components: { NewFanNotification },
  props: {
    notifications: { type: Array, default: () => [] }
  },
  data() {
    return {
      COMPONENTS
    }
  }
}
</script>
<style lang="less" scoped>
.card {
  height: 80px;
  border-radius: 10px;
  padding: 20px;
  margin: 0 0 20px 20px;
  box-sizing: border-box;
  background: #132d5e;
  position: relative;
  /deep/ .soruce-avatar {
    position: absolute;
    top: 20px;
    left: 20px;
  }
  /deep/ .message {
    margin: 0 0 20px 60px;
    font-size: 16px;
    color: #b2b2b2;
    p {
      margin: 0;
      padding: 0;
      font-size: 14px;
      font-weight: 400;
      color: rgba(178, 178, 178, 1);
      line-height: 20px;
    }
    b {
      font-size: 16px;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
    }
    time {
      font-size: 14px;
      line-height: 20px;
      color: #b2b2b2;
    }
  }
  /deep/ .action {
    position: absolute;
    top: 25px;
    right: 20px;
    button {
      width: 80px;
      height: 30px;
      padding: 0;
      border-radius: 6px;
      background: #6236FF;
      font-weight: 500;
      border-color: #6236FF;
      color:  #fff;
      line-height: 20px;
      letter-spacing: 1px;
      svg {
        width: 12px;
      }
      &:disabled {
        background: transparent;
        border: 1px solid #6236FF;
        color: #6236FF;
        line-height: 20px;
      }
    }
  }
}
</style>
