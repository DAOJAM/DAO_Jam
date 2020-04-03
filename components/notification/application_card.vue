<template>
  <div class="card">
    <div class="fl ac jsb">
      <div class="fl ac">
        <c-avatar :src="teamMemberAvatar(card.avatar)" />
        <div class="card-user">
          <p>{{ card.nickname || card.username }}</p>
          <time>{{ time }}</time>
        </div>
      </div>

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
          icon="el-icon-circle-close"
          @click="deny"
        >
          Deny
        </el-button>
      </div>
    </div>

    <p v-if="card.contact" class="card-email">
      Email: {{ card.contact }}
    </p>
    <p
      v-if="card.content"
      class="card-content"
    >
      留言：{{ card.content }}
    </p>
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
    line-height: 22px;
    width: 140px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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