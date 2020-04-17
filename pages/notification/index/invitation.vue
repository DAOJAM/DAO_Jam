<template>
  <div>
    <template 
      v-if="list.length !== 0"
    >
      <invitationCard
        v-for="(item, index) in list"
        :key="index"
        :card="item"
        :index="index"
        class="application-card"
        @accept="accept"
        @deny="deny"
      />
    </template>
    <p v-else class="not">暂无</p>
  </div>
</template>
<script>
// 从简 直接请求接口...
// 查看别人邀请自己的列表
import { mapGetters } from 'vuex'
import invitationCard from '@/components/notification/invitation_card'
export default {
  components: { invitationCard },
  data() {
    return {
      list: [],
    }
  },
  computed: {
    ...mapGetters(['isLogined']),
  },
  watch: {
    isLogined() {
      this.teamMemberInviteList()
    }
  },
  created() {
    this.teamMemberInviteList()
  },
  methods: {
    async teamMemberInviteList() {
      // 获取所有队员
      if (!this.isLogined) return

      await this.$API.teamMemberInviteList()
        .then(res => {
          if (res.code === 0) {
            this.list = res.data.list
            this.read()
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    read() {
      this.$API.readNotifications('teamInviteRequest')
    },
    async teamMemberInviteUser(i, from) {
      await this.$API.teamMemberInviteUser({
        teamMember: {
          token_id: this.list[i].token_id,
          uid: this.list[i].uid,
          from: from
        }
      })
        .then(res => {
          if (res.code === 0) {
            this.$message.success(res.message)
            this.teamMemberInviteList()
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 同意
    async accept(i) {
      this.teamMemberInviteUser(i, 'accept')
    },
    async deny(i) {
      // 删除申请
      this.teamMemberInviteUser(i, 'deny')
    }
  }
}
</script>
<style lang="less" scoped>
.application-card {
  margin: 20px 20px 0 20px;
  &:nth-child(1) {
    margin-top: 0;
  }
}
.not {
  color: #fff;
  text-align: center;
  font-size: 16px;
}
</style>
