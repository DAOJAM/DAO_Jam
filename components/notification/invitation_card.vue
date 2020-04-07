<template>
  <div class="card">
    <div class="fl ac jsb">
      <router-link :to="{name: 'token-id', params: {id: card.token_id}}" class="fl ac">
        <c-avatar :src="teamMemberAvatar(card.logo)" />
        <div class="card-user">
          <p>{{ card.symbol }} 邀请您加入团队</p>
          <time>{{ time }}</time>
        </div>
      </router-link>

      <div>
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
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    card: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    time() {
      return moment(this.card.create_time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    // 团队头像
    teamMemberAvatar(src) {
      return src ? this.$ossProcess(src, { h: 90 }) : ''
    },
    accept() {
      this.$emit('accept', this.index)
    },
    deny() {
      this.$emit('deny', this.index)
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