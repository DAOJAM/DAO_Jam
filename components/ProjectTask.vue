<template>      
  <div>
    <h2 class="task-title">
      Main Prize
    </h2>
    <el-radio-group v-model="mainRadio">
      <el-radio
        v-for="(item, index) in tasks.mainTasks"
        :key="index"
        :label="item.id"
        class="task-radio project-task"
      >
        {{ item.title }}
      </el-radio>
    </el-radio-group>
    <h2 class="task-title">
      Extension Prize
    </h2>
    <el-checkbox-group v-model="sideCheckList">
      <el-checkbox
        v-for="(item, index) in tasks.sideTasks"
        :key="index"
        :label="item.id"
        class="task-checkbox project-task"
      >
        {{ item.title }}
      </el-checkbox>
    </el-checkbox-group>

    <el-button
      type="primary"
      class="task-save"
      :disabled="tokenId === -1"
      @click="saveTask"
    >
      Save
    </el-button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tokenId: -1,
      mainRadio: -1,
      sideCheckList: [],
      tasks: {} // 任务
    }
  },
  created() {
    this.tokenDetail()

  },
  methods: {
    async tokenDetail() {
      await this.$API.tokenDetail().then(res => {
        if (res.code === 0) {
          this.tokenId = res.data.token.id
          this.task()
          this.taskTeam(res.data.token.id)
        } else {
          this.$router.push({name: 'article'})
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 所有列表
    async task() {
      this.$API.task()
        .then(res => {
          if (res.code === 0) {
            let mainTasks = []
            let sideTasks = []
            res.data.map(item => {
              if (Number(item.type) === 0) {
                mainTasks.push(item)
              } else if (Number(item.type) === 1) {
                sideTasks.push(item)
              } else {
                console.log('error', item)
              }
            })
            this.tasks = {
              mainTasks,
              sideTasks
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 团队列表
    async taskTeam(tokenId) {
      this.$API.taskTeam(tokenId)
        .then(res => {
          if (res.code === 0) {
            res.data.map(item => {
              if (Number(item.type) === 0) {
                this.mainRadio = Number(item.task_id)
              } else if (Number(item.type) === 1) {
                this.sideCheckList.push(Number(item.task_id))
              } else {
                console.log('error', item)
              }
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 保存任务
    async saveTask() {
      if (this.mainRadio === -1) {
        this.$message.success('Main prize can not be empty.')
        return
      }
      this.$API.updateTask({
        task: {
          team_id: this.tokenId,
          data: {
            mainTask: [this.mainRadio],
            sideTask: this.sideCheckList
          }
        }
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.message)
          // 刷新一下
          this.task()
          this.taskTeam(this.tokenId)
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
.task-title {
  color: #fff;
  padding: 0;
  margin: 20px 0;
  font-size: 24px;
  font-weight: bold;
}

.task-radio,
.task-checkbox {
  display: block;
  margin: 10px 0;
}
.task-save {
  margin-top: 60px;
}
</style>

<style lang="less">
.project-task {
  .el-radio__input.is-checked+.el-radio__label,
  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #fff;
  }
  .el-radio__label,
  .el-checkbox__label {
    color: #e6e6e6;
    font-size: 16px;
  }
}
</style>