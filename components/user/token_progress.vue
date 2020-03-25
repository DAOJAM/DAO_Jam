<template>
  <div class="progress customize">
    <h3 class="progress-title">
      Progress
    </h3>
    <ul class="progress-list">
      <li
        v-for="(item, index) in news"
        :key="index"
      >
        {{ item.title }}
        <svg-icon
          icon-class="edit"
          @click="editLive(index)"
        />
        <svg-icon
          icon-class="close"
          @click="removeNew(index)"
        />
      </li>
    </ul>

    <div class="progress-input">
      <el-input
        v-model="newTitle"
        size="small"
        placeholder="请输入动态标题"
        class="progress-name"
      />
      <div>
        <el-input
          v-model="newContent"
          class="progress-address"
          size="small"
          type="textarea"
          :rows="4"
          placeholder="请输入动态内容"
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
            v-if="editIndex === -1"
            type="primary"
            @click="addNews"
          >
            <svg-icon
              icon-class="add"
              class="icon"
            />
            添加
          </el-button>

          <el-button
            type="primary"
            @click="saveNews"
          >
            保存
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tokenId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      editIndex: -1,
      news: [],
      newTitle: '', // 动态
      newContent: '', // 动态
    }
  },
  watch: {
    tokenId() {
      if (~this.tokenId) {
        this.getNews()
      }
    }
  },
  mounted() {
    this.getNews()
  },
  methods: {
    getNews() {
      if (!(~this.tokenId)) return
      this.loading = true
      this.$API.minetokenGetNews(this.tokenId, {
        pagesize: -1 // all
      })
        .then(res => {
          if (res.code === 0) {
            this.news = res.data.list
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
    addNews() {
      if (this.newTitle && this.newContent) {
        this.news.push({
          uid: 1053,
          title: this.newTitle,
          content: this.newContent
        })

        this.newTitle = ''
        this.newContent = ''
      } else {
        this.$message.warning('标题或内容不能为空')
      }

    },
    // 清空数据
    removeNewData() {
      this.newTitle = ''
      this.newContent = ''

      this.editIndex = -1
    },
    // 删除数据
    removeNew(i) {
      if (i === this.editIndex) {
        // 清空数据
        this.removeNewData()
      }
      this.news.splice(i, 1)
    },
    // 编辑live
    editLive(i) {
      this.editIndex = i

      this.newTitle = this.news[i].title
      this.newContent = this.news[i].content
    },
    // 取消修改
    closeEditLive() {
      // 清空数据
      this.removeNewData()
    },
    // 保存修改
    saveEditLive() {
      this.news[this.editIndex].title = this.newTitle
      this.news[this.editIndex].content = this.newContent
      
      // 清空数据
      this.removeNewData()
    },
    // 保存数据
    saveNews() {
      const newsMap = this.news.map(item => {
        return {
          uid: item.uid,
          title: item.title,
          content: item.content
        }
      })
      const data = {
        news: newsMap
      }
      this.$API.minetokenNews(this.tokenId, data)
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
    // font-size: 22px;
    // display: block;
    cursor: pointer;
  }
}

</style>