<template>
  <div class="progress">
    <h3 class="progress-title">
      Live
    </h3>
    <ul class="live-list">
      <li
        v-for="(item, index) in lives"
        :key="index"
      >
        <a
          :href="item.content"
          target="_blank"
        >{{ item.title }} - {{ item.content }}</a>
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
          type="primary"
          @click="searchUserDialog = true"
        >
          选择用户
        </el-button>
      </div>
      <el-input
        v-model="liveTitle"
        size="small"
        placeholder="请输入直播标题"
        class="progress-address"
      />
      <el-input
        v-model="liveContent"
        size="small"
        placeholder="请输入直播地址"
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
          取消修改
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
          保存修改
        </el-button>
        <el-button
          type="primary"
          @click="addLive"
        >
          <svg-icon
            icon-class="add"
            class="icon"
          />
          添加
        </el-button>
        <el-button
          type="primary"
          :disabled="loading"
          @click="saveLives"
        >
          保存
        </el-button>
      </div>
    </div>
    <searchUser v-model="searchUserDialog" />
  </div>
</template>

<script>
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
      loading: false,
      searchUserDialog: false,
      editIndex: -1,
      lives: [],
      liveTitle: '', // live
      liveContent: '', // live
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
      this.$API.minetokenGetLives(this.tokenId)
        .then(res => {
          if (res.code === 0) {
            this.lives = res.data
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
    // 添加数据
    addLive() {
      this.lives.push({
        uid: 1053,
        title: this.liveTitle,
        content: this.liveContent
      })

      this.liveTitle = ''
      this.liveContent = ''
    },
    // 清空数据
    removeLiveData() {
      this.liveTitle = ''
      this.liveContent = ''

      this.editIndex = -1
    },
    // 删除数据
    removeLive(i) {
      if (i === this.editIndex) {
        // 清空数据
        this.removeLiveData()
      }
      this.lives.splice(i, 1)
    },
    // 编辑live
    editLive(i) {
      this.editIndex = i

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
      this.lives[this.editIndex].title = this.liveTitle
      this.lives[this.editIndex].content = this.liveContent
      
      // 清空数据
      this.removeLiveData()
    },
    // 保存数据
    saveLives() {
      const livesMap = this.lives.map(item => {
        return {
          uid: item.uid,
          title: item.title,
          content: item.content
        }
      })
      const data = {
        lives: livesMap
      }
      this.$API.minetokenLives(this.tokenId, data)
        .then(res => {
          if (res.code === 0) {
            this.$message.success(res.message)
          } else {
            this.$message.warning(res.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.progress {
  margin-top: 40px;
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

</style>