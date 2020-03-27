<template>
  <div>
    <div class="project-people">
      <div
        v-for="(item, index) in teamData.list"
        :key="index"
        class="project-people__block"
      >
        <router-link target="_blank" :to="{name: 'user-id', params: { id: item.uid }}">
          <c-avatar />
          <p>{{ item.uid }}</p>
        </router-link>
        <svg-icon
          icon-class="close"
          class="icon-close"
          @click="removeTeamPeople(index)"
        />
      </div>
    </div>
    <el-button
      class="project-btn"
      type="primary"
      size="small"
      @click="searchUserDialog = true"
    >
      邀请队员
    </el-button>
    <p class="project-text">
      队员加入48h后不能变动(当前队员数: {{ teamData.count }})
    </p>
    <searchUser
      v-model="searchUserDialog"
      @searchResult="searchResult"
    />
    <m-dialog 
      v-model="inviteSuccess"
      title="邀请提示"
      width="600px"
    >
      <div class="invite">
        <div>
          <p>邀请信息已经发送成功, 您还可以复制链接发送给好友!</p>
          <a
            :href="inviteAddress"
            target="_blank"
          >{{ inviteAddress }}</a>
          <el-button
            size="small"
            @click="copyText(inviteAddress)"
          >
            <svg-icon icon-class="copy" />
            复制
          </el-button>
        </div>
        <el-button @click="inviteSuccess = false">
          确定
        </el-button>
      </div>
    </m-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import searchUser from '@/components/search_user'
export default {
  components: {
    searchUser
  },
  props: {
    tokenId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      searchUserDialog: false, // 添加队员
      inviteSuccess: false, // 邀请成功
      inviteAddress: '',
      teamData: []
    }
  },
  computed: {
    ...mapGetters(['currentUserInfo']),
  },
  watch: {
    tokenId() {
      this.teamMember()
    }
  },
  mounted() {
    this.teamMember()
  },
  methods: {
    // 获取所有队员
    async teamMember() {
      if (this.tokenId === -1) return
      await this.$API.teamMember(this.tokenId)
        .then(res => {
          if (res.code === 0) {
            this.teamData = res.data
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 移除项目成员
    async removeTeamPeople(i) {
      const removeTeam = async () => {
        await this.$API.teamMemberRemove(this.tokenId, {
          teamMember: {
            uid: this.teamData.list[i].uid
          }
        }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.message)
            this.teamMember()
          } else {
            this.$message.error(res.message)
          }
        })
          .catch(e => {
            console.log(e)
          })
      }
      this.$confirm('是否删除该队员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(111)
        removeTeam()
      }).catch(() => {})
    
    },
    // 复制邀请链接
    copyText(val) {
      const text = `点击链接加入我的团队 ${val} 快来祝我一臂之力吧!`
      this.$copyText(text).then(
        () => this.$message.success(this.$t('success.copy')),
        () => this.$message.error(this.$t('error.copy'))
      )
    },
    // 邀请
    async inviteTeam(data) {
      if (data) {
        if (data.id === this.currentUserInfo.id) {
          this.$message.error('不能邀请自己')
          return
        }
        // 发送邀请
        await this.$API.teamMemberInvite(this.tokenId, {
          teamMember: {
            uid: data.id
          }
        }).then(res => {
          if (res.code === 0) {

            this.inviteSuccess = true

            if (process.browser) {
              // 字段太长了 缩写
              // t token_id   i invite_id   d date(time)
              const address = `${window.location.origin}/team?t=${this.tokenId}&i=${this.currentUserInfo.id}&u=${data.id}&d=${Date.now()}`
              this.inviteAddress = address
            }

          } else {
            this.$message.error(res.message)
          }

        }).catch(e => {
          console.log(e)
        })

      } else {
        this.$message.error('没有搜索到用户')
      }
    },
    // 搜索结果
    searchResult(data) {
      this.inviteTeam(data)
    }
  }
}
</script>

<style lang="less" scoped>
.project-people {
  &::after {
    display: block;
    content: "";
    width: 0;
    height: 0;
    clear: both;
  }
  .project-people__block {
    float: left;
    margin: 0 20px 20px 0;
    position: relative;
    width: 110px;
    &:nth-last-child(1) {
      margin-right: 0;
    }

    .components-avatar {
      width: 60px;
      height: 60px;
      margin: 0 auto;
    }
    p {
      padding: 0;
      margin: 10px 0 0 0;
      color: #fff;
      font-size: 16px;
      text-align: center;
      line-height: 22px;
    }
    .icon-close{
      position: absolute;
      right: 0;
      top: 0;
            color: #fff;
      font-size: 16px;
      cursor: pointer;
    }
  }
}
.project-text {
  padding: 0;
  margin: 0;
  color: #fff;
  font-size: 14px;
  line-height: 22px;
}
.project-btn {
  margin: 20px 0;
}

</style>