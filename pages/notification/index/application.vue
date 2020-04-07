<template>
  <div>
    <template
      v-if="list.length !== 0"
    >
      <applicationCard
        v-for="(item, index) in list"
        :key="index"
        :card="item"
        :index="index"
        :token-id="tokenId"
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
// 拥有team的人可以看到别人申请自己团队的列表
import applicationCard from '@/components/notification/application_card'
export default {
  components: { applicationCard },
  data() {
    return {
      list: [],
      tokenId: -1,
    }
  },
  created() {
    this.getTeamMember()
  },
  methods: {
    async getTeamMember() {
      const tokenId = await this.token()
      if (tokenId) {
        this.tokenId = tokenId
        this.teamMember(tokenId, 'apply')
      }
    },
    // 得到token
    async token() {
      try {
        const token = await this.$API.tokenDetail()
        if (token.code === 0 && token.data) {
          return token.data.token.id
        } else {
          return
        }
      } catch (e) {
        console.log(e)
        return
      }
    },
    async teamMember(tokenId, note = '') {
      // 获取所有队员
      if (this.tokenId === -1) return
      let params = {}
      if (note) params = { 
        note: note
      }
      await this.$API.teamMember(tokenId, params)
        .then(res => {
          if (res.code === 0) {
            this.list = res.data.list
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
      await this.$API.teamMemberApplySuccess(this.tokenId, {
        teamMember: {
          uid: this.list[i].uid,
          note: this.list[i].note,
        }
      })
        .then(res => {
          if (res.code === 0) {
            this.$message.success(res.message)
            this.teamMember(this.tokenId, 'apply')
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    async deny(i) {
      // 删除申请
      let teamMember= {
        uid: this.list[i].uid,
        note: this.list[i].note,
      }
      
      await this.$API.teamMemberRemove(this.tokenId, {
        teamMember: teamMember,
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.message)
          this.teamMember(this.tokenId, 'apply')
        } else {
          this.$message.error(res.message)
        }
      })
        .catch(e => {
          console.log(e)
        })
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
