<template>
  <div class="soruce-avatar">
    <n-link
      :to="{name: route, params: {id}}"
      :title="name"
      target="_blank"
    >
      <Cavatar
        :src="avatarUrl"
        class="avatar"
        size="40px"
      />
    </n-link>
  </div>
</template>
<script>
import Cavatar from '@/components/avatar/index.vue'
export default {
  name: 'NotificationSource',
  components: { Cavatar },
  props: {
    avatar: { type: String, default: '' },
    name: { type: String, required: true },
    route: { type: String, required: true },
    id: { type: Number, required: true }
  },
  computed: {
    avatarUrl() {
      return this.$ossProcess(this.avatar)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
