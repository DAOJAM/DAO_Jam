<template>
  <div class="card">
    <div class="fl ac jsb">
      <div class="fl ac">
        <c-avatar />
        <div class="card-user">
          <p>有人邀请你加入 <b>{{ inviteDetail.message }}</b> 组织</p>
          <time>{{ inviteDetail.datetime }}</time>
        </div>
      </div>

      <div>
        <template v-if="status === 0">
          <el-button 
            size="small"
            type="primary"
            @click="accept"
          >
            <svg-icon icon-class="accept" />
            Accept
          </el-button>
          <el-button 
            size="small"
            type="primary"
            @click="deny"
          >
            <svg-icon icon-class="accept" />
            Deny
          </el-button>
        </template>
        <span
          v-else
          class="card-status"
        >
          {{ status === 1 ? '同意' : '拒绝' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import cAvatar from '@/common/components/avatar'
export default {
  components: {
    cAvatar
  },
  props: ['invitation'],
  data() {
    return {
      status: 0 // 1 同意 2 拒绝
    }
  },
  computed: {
    inviteDetail() {
      const datetime = new Date(this.invitation.timestamp).toLocaleString()
      return {...this.invitation, datetime}
    }
  },
  methods: {
    accept() {
      // @todo: implement needed.
      alert('Not implemented')
    },
    deny() {
      // @todo: implement needed.
      alert('Not implemented')
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  background: rgba(19, 45, 94, 1);
  border-radius: 8px;
  padding: 20px;
  .components-avatar {
    width: 40px;
    height: 40px;
  }
}
.card-user {
  margin-left: 10px;
  p {
    padding: 0;
    margin: 0;
    color: #fff;
    font-size: 16px;
    line-height:22px;
  }
  time {
    font-size: 14px;
    color: #B2B2B2;
    line-height:20px;
  }
}
.card-email {
  margin: 10px 0 0 0;
  padding: 0;
  font-size: 16px;
  color: #fff;
}
.card-content {
  margin: 10px 0 0 0;
  padding: 0;
  font-size: 16px;
  color: #fff;
  line-height: 22px;
}
.card-status {
  margin: 0;
  padding: 0;
  font-size: 16px;
  color: #fff;
  line-height: 22px;
}
</style>