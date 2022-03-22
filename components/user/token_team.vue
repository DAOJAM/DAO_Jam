<template>
  <div>
    <div class="project-people">
      <h3 class="project-title">
        Invitation List({{ teamInviteData.count }})
      </h3>
      <div
        v-for="(item, index) in teamInviteData.list"
        :key="item.uid + '-' +index"
        class="apply-list"
      >
        <div class="fl ac jsb">
          <router-link class="apply-list__avatar" target="_blank" :to="{name: 'user-id', params: { id: item.uid }}">
            <c-avatar :src="teamMemberAvatar(item.avatar)" />
            <p>{{ item.nickname || item.username }}</p>
          </router-link>
          <div>
            <span>Still waiting for the other party to confirm...</span>
            <el-button type="primary" @click="copyInviteLink(index)">
              Copy invitation link
            </el-button>
            <el-button type="primary" @click="removeTeamMember(index, 'invite')">
              Cancel invitation
            </el-button>
          </div>
        </div>
      </div>
      <h3 class="project-title">
        Application List({{ teamApplyData.count }})
      </h3>
      <div
        v-for="(item, index) in teamApplyData.list"
        :key="item.uid + '-' +index"
        class="apply-list"
      >
        <div class="fl ac jsb">
          <router-link class="apply-list__avatar" target="_blank" :to="{name: 'user-id', params: { id: item.uid }}">
            <c-avatar :src="teamMemberAvatar(item.avatar)" />
            <p>{{ item.nickname || item.username }}</p>
          </router-link>
          <div>
            <el-button type="primary" @click="agreeApply(index)">
              Agree
            </el-button>
            <el-button type="primary" @click="removeTeamMember(index, 'apply')">
              Ignore
            </el-button>
          </div>
        </div>
        <p v-if="item.contact" class="apply-list__text">Contact: {{ item.contact }}</p>
        <p v-if="item.content" class="apply-list__text content">Reason: {{ item.content }}</p>
      </div>
      <h3 class="project-title">
        Team Members({{ teamData.count }})
      </h3>
      <div
        v-for="(item, index) in teamData.list"
        :key="item.uid + '-' +index"
        class="project-people__block"
      >
        <router-link target="_blank" :to="{name: 'user-id', params: { id: item.uid }}">
          <c-avatar :src="teamMemberAvatar(item.avatar)" />
          <p>{{ item.nickname || item.username }}</p>
        </router-link>
        <svg-icon
          v-if="item.uid !== currentUserInfo.id || item.note !== 'owner'"
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
      Invite team members
    </el-button>
    <!-- <p class="project-text">
      队员加入48h后不能变动
    </p> -->
    <searchUser
      v-model="searchUserDialog"
      @searchResult="searchResult"
    />
    <m-dialog 
      v-model="inviteSuccess"
      title="Invitation tips"
      width="600px"
    >
      <div class="invite">
        <div>
          <p>The invitation message has been sent successfully, you can also copy the link and send it to your friends!</p>
          <a
            :href="inviteAddress"
            target="_blank"
          >{{ inviteAddress }}</a>
          <el-button
            size="small"
            @click="copyText(inviteAddress)"
          >
            <svg-icon icon-class="copy" />
            Copy
          </el-button>
        </div>
        <el-button @click="inviteSuccess = false">
          Confirm
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
      teamData: [],
      teamApplyData: [], // 申请
      teamInviteData: [] // 邀请
    }
  },
  computed: {
    ...mapGetters(['currentUserInfo']),
  },
  watch: {
    tokenId() {
      this.teamMember()
      this.teamMember('invite')
      this.teamMember('apply')
    }
  },
  mounted() {
    this.teamMember()
    this.teamMember('invite')
    this.teamMember('apply')
  },
  methods: {
    // 获取所有队员
    async teamMember(note = '') {
      console.log('11', this.tokenId)
      if (!(~this.tokenId)) return
      let params = {}
      if (note) params = { 
        note: note
      }
      await this.$API.teamMember(this.tokenId, params)
        .then(res => {
          if (res.code === 0) {
            if (note === 'apply') {
              this.teamApplyData = res.data
            } else if (note === 'invite') {
              this.teamInviteData = res.data
            } else {
              this.teamData = res.data
            }
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 移除项目成员 (删除, 邀请, 申请)
    async removeTeamMember(i, note) {
      let teamMember = {}
      if (note === 'apply') {
        // 删除申请
        teamMember= {
          uid: this.teamApplyData.list[i].uid,
          note: this.teamApplyData.list[i].note,
        }
      } else if (note === 'invite') {
        // 删除邀请
        teamMember= {
          uid: this.teamInviteData.list[i].uid,
          note: this.teamInviteData.list[i].note,
        }
      } else {
        // 删除队员
        teamMember = {
          uid: this.teamData.list[i].uid,
          note: this.teamData.list[i].note,
        }
      }
          
      await this.$API.teamMemberRemove(this.tokenId, {
        teamMember: teamMember,
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.message)
          if (note === 'apply') {
            // 删除申请
            this.teamMember('apply')
          } else if (note === 'invite') {
            // 删除邀请
            this.teamMember('invite')
          } else {
            // 删除队员
            this.teamMember()
          }
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
      if (this.teamData.list[i].uid === this.currentUserInfo.id) {
        this.$message.error('Can\'t delete yourself')
        return
      }

      this.$confirm('Are you sure you want to delete this member?', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.removeTeamMember(i)
      }).catch(() => {})
    
    },
    // 复制邀请链接
    copyText(val) {
      const text = `Click the link to join my team ${val} !`
      this.$copyText(text).then(
        () => this.$message.success(this.$t('success.copy')),
        () => this.$message.error(this.$t('error.copy'))
      )
    },
    // 邀请
    async inviteTeam(data) {
      if (data) {
        if (data.id === this.currentUserInfo.id) {
          this.$message.error('Can\'t invite yourself')
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

            // 刷新列表
            this.teamMember('invite')

          } else {
            this.$message.error(res.message)
          }

        }).catch(e => {
          console.log(e)
        })

      } else {
        this.$message.error('No users found!')
      }
    },
    // 搜索结果
    searchResult(data) {
      this.inviteTeam(data)
    },
    // 同意申请
    async agreeApply(i) {
      await this.$API.teamMemberApplySuccess(this.tokenId, {
        teamMember: {
          uid: this.teamApplyData.list[i].uid
        }
      })
        .then(res => {
          if (res.code === 0) {
            this.$message.success(res.message)
            this.teamMember()
            this.teamMember('apply')
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 团队头像
    teamMemberAvatar(src) {
      return src ? this.$ossProcess(src, { h: 90 }) : ''
    },
    // 复制邀请链接
    copyInviteLink(i) {
      if (process.browser) {
        // 字段太长了 缩写
        // t token_id   i invite_id   d date(time)
        const address = `${window.location.origin}/team?t=${this.tokenId}&i=${this.currentUserInfo.id}&u=${this.teamInviteData.list[i].uid}&d=${Date.now()}`
        this.copyText(address)
      }
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
    width: 140px;
    overflow: hidden;
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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .icon-close {
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
.project-title {
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  padding: 0;
  margin: 0;
}

.apply-list {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 20px;
  box-sizing: border-box;
}

.apply-list__avatar {
  display: flex;
  align-items: center;
  .components-avatar {
    width: 60px;
    height: 60px;
  }
  p {
    padding: 0;
    margin: 0 0 0 10px;
    font-size: 16px;
  }
}
.apply-list__text {
  padding: 0;
  margin: 10px 0 0 0;
  font-size: 16px;
  line-height: 22px;
  &.content {
    word-break: break-all;
    white-space: pre-wrap;
  }
}
</style>