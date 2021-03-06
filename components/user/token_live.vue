<template>
  <div class="progress">
    <h2 class="progress-title">
      Live
    </h2>
    <ul class="live-list">
      <li
        v-for="(item, index) in lives"
        :key="index"
      >
        <a
          :href="item.content"
          target="_blank"
        >{{ item.title }}</a>
        <svg-icon
          icon-class="edit"
          @click="editLive(index)"
        />
        <svg-icon
          icon-class="close"
          @click="removeLive(index)"
        />
      </li>
    </ul>

    <div class="progress-input">
      <div>
        <el-button
          v-if="!liveUser"
          type="primary"
          @click="searchUserDialog = true"
        >
          Select User
        </el-button>
        <div
          v-else
          class="live-user"
        >
          <c-avatar :src="liveAvatar" />
          <span v-html="liveUser.nickname || liveUser.username" />
          <svg-icon
            class="icon"
            icon-class="close"
            @click="liveUser = null"
          />
        </div>
      </div>
      <el-input
        v-model="liveTitle"
        size="small"
        placeholder="Live title"
        class="progress-address"
      />
      <el-input
        v-model="liveContent"
        size="small"
        placeholder="Live address"
        class="progress-address"
      />
      <div style="margin-top: 10px;">
        <el-button
          v-if="editIndex !== -1"
          type="primary"
          @click="closeEditLive"
        >
          <svg-icon
            icon-class="close"
            class="icon"
          />
          Cancel
        </el-button>
        <el-button
          v-if="editIndex !== -1"
          type="primary"
          @click="saveEditLive"
        >
          <svg-icon
            icon-class="edit"
            class="icon"
          />
          Save
        </el-button>
        <el-button
          v-if="editIndex === -1"
          type="primary"
          :disabled="loading"
          @click="createLive"
        >
          Save
        </el-button>
      </div>
    </div>
    <searchUser
      v-model="searchUserDialog"
      @searchResult="searchResult"
    />
  </div>
</template>

<script>
import searchUser from '@/components/search_user'
export default {
  components: {
    searchUser,
  },
  props: {
    tokenId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      searchUserDialog: false,
      editIndex: -1,
      lives: [],
      liveUser: null,
      liveTitle: '', // live
      liveContent: '', // live
    }
  },
  computed: {
    liveAvatar() {
      return this.liveUser.avatar ? this.$ossProcess(this.liveUser.avatar) : ''
    }
  },
  watch: {
    tokenId() {
      if (~this.tokenId) {
        this.getLives()
      }
    }
  },
  mounted() {
    this.getLives()
  },
  methods: {
    // 得到live
    getLives() {
      if (!(~this.tokenId)) return
      this.loading = true
      this.$API.minetokenGetLives(this.tokenId, {
        pagesize: -1 // all
      })
        .then(res => {
          if (res.code === 0) {
            this.lives = res.data.list
          } else {
            this.$message.warning(res.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 清空数据
    removeLiveData() {
      this.liveUser = null
      this.liveTitle = ''
      this.liveContent = ''

      this.editIndex = -1
    },
    // 删除数据
    removeLive(i) {
      this.$confirm('confirm to delete?', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$API.minetokenDeleteLives(this.tokenId, {
          live: {
            id: this.lives[i].id
          }
        }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.message)
            if (i === this.editIndex) {
            // 清空数据
              this.removeLiveData()
            }
            this.lives.splice(i, 1)
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {      })
    },
    // 编辑live
    editLive(i) {
      this.editIndex = i

      this.liveUser = {
        nickname: this.lives[i].nickname,
        username: this.lives[i].username,
        avatar: this.lives[i].avatar,
        id: this.lives[i].uid,
      }
      this.liveTitle = this.lives[i].title
      this.liveContent = this.lives[i].content
    },
    // 取消修改
    closeEditLive() {
      // 清空数据
      this.removeLiveData()
    },
    // 保存修改
    saveEditLive() {
      if (this.liveTitle && this.liveContent && this.liveUser) {
        this.$API.minetokenUpdateLives(this.tokenId, {
          live: {
            id: this.lives[this.editIndex].id,
            uid: this.liveUser.id,
            title: this.liveTitle,
            content: this.liveContent
          }
        })
          .then(res => {
            if (res.code === 0) {
              this.$message.success(res.message)

              this.lives[this.editIndex].nickname = this.liveUser.nickname
              this.lives[this.editIndex].username = this.liveUser.username
              this.lives[this.editIndex].avatar = this.liveUser.avatar
              this.lives[this.editIndex].uid = this.liveUser.id

              this.lives[this.editIndex].title = this.liveTitle
              this.lives[this.editIndex].content = this.liveContent

              // 清空数据
              this.removeLiveData()
            } else {
              this.$message.warning(res.message)
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$message.warning('username title and content cannot be null')
      }
    },
    // 创建数据
    createLive() {
      if (this.liveTitle && this.liveContent && this.liveUser) {
        this.$API.minetokenCreateLives(this.tokenId, {
          live: {
            uid: this.liveUser.id,
            title: this.liveTitle,
            content: this.liveContent
          }
        })
          .then(res => {
            if (res.code === 0) {
              this.$message.success(res.message)

              this.lives.push({
                id: res.data.id,
                nickname: this.liveUser.nickname,
                username: this.liveUser.username,
                avatar: this.liveUser.avatar,
                uid: this.liveUser.id,

                title: this.liveTitle,
                content: this.liveContent
              })

              this.liveUser = null
              this.liveTitle = ''
              this.liveContent = ''
        
            } else {
              this.$message.warning(res.message)
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$message.warning('username title and content cannot be null')
      }
    },
    // 搜索结果
    searchResult(data) {
      console.log(data)
      if (data) {
        this.liveUser = data
      }
    }
  }
}
</script>

<style lang="less" scoped>
.progress {
  // margin-top: 40px;
  padding: 0 10px;
}
.progress-title {
  padding: 0;
  margin: 0;
  font-weight: bold;
  color: #fff;
  margin-top: 10px;
}
h2.progress.title {
  font-size: 20px;
}
h3.progress.title {
  font-size: 18px;
}
.live-list {
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    margin: 10px 0 0 0;
    color: #ffff;
    a {
      color: #fff;
      text-decoration: underline;
      font-size: 16px;
      padding: 0;
      margin: 0;
      line-height: 22px;
    }
  }
}
// .live-input {
//   display: flex;
//   align-items: center;
//   margin-top: 10px;
//   .live-name {
//     max-width: 200px;
//   }
//   .live-address {
//     margin: 0 10px;
//   }
//   .icon {
//     background: #542de0;
//     color: #fff;
//     font-size: 14px;
//     padding: 5px 18px;
//     border-radius: 0px;
//     font-size: 22px;
//     display: block;
//     cursor: pointer;
//   }
// }

.progress-list {
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    margin: 10px 0 0 0;
    color: #ffff;
    font-size: 16px;
    padding: 0;
    line-height: 22px;
  }
}

.progress-input {
  margin-top: 10px;
  .progress-name {
    max-width: 500px;
  }
  .progress-address {
    max-width: 500px;
    margin-top: 10px;
  }
  .icon {
    // margin-top: 10px;
    // background: #542de0;
    color: #fff;
    font-size: 14px;
    // padding: 5px 18px;
    // border-radius: 0px;
    // display: block;
    cursor: pointer;
  }
}

.live-user {
  display: flex;
  align-items: center;
  span {
    color: #fff;
    font-size: 16px;
    margin: 0 10px;
    /deep/ em {
      color: #fff;
      font-style: normal;
    }
  }
  .icon {
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
}

</style>