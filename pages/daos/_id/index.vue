<template>
  <div>
    <div class="token-list">
      <h2 class="token-title">
        Brief Introduction
      </h2>
      <p class="token-brief">
        {{ minetokenToken.introduction || '暂无' }}
      </p>
    </div>

    <div class="token-list">
      <h2 class="token-title">
        Team Member
      </h2>
      <div class="teammember">
        <div
          v-for="(item, index) in teamData.list"
          :key="index"
          class="teammember-block"
        >
          <router-link target="_blank" :to="{name: 'user-id', params: { id: item.uid }}">
            <c-avatar :src="teamMemberAvatar(item.avatar)" />
            <p>{{ item.nickname || item.username }}</p>
          </router-link>
        </div>
        <p
          v-if="achievementList.length === 0"
          class="token-not"
        >
          暂无
        </p>
      </div>
    </div>

    <div class="token-list">
      <h2 class="token-title">
        Achievement
      </h2>
      <div class="achievement">
        <el-tooltip
          v-for="(item, index) in achievementList"
          :key="index"
          effect="dark"
          :content="item.text"
          placement="top"
          class="tooltip"
        >
          <img
            :src="item.img"
            alt="item.text"
          >
        </el-tooltip>
        <p
          v-if="achievementList.length === 0"
          class="token-not"
        >
          暂无
        </p>
      </div>
    </div>

    <div class="token-list">
      <h2 class="token-title">
        DAO Website
      </h2>
      <div
        v-if="resourcesWebsites.length !== 0"
        class="website"
      >
        <a
          v-for="(item, index) in resourcesWebsites"
          :key="index"
          :href="formatUrl(item)"
        >{{ item }}</a>
        <p
          v-if="resourcesWebsites.length === 0"
          class="token-not"
        >
          暂无
        </p>
      </div>
    </div>

    <div class="token-list">
      <h2 class="token-title">
        Contact of SNS
      </h2>
      <div class="contact">
        <div class="social-btn">
          <socialIcon
            v-for="(item, index) in resourcesSocialss"
            :key="index"
            :show-tooltip="true"
            :icon="item.type"
            :content="item.content"
          />
          <p
            v-if="resourcesSocialss.length === 0"
            class="token-not"
          >
            暂无
          </p>
        </div>
      </div>
    </div>

    <div class="token-list">
      <h2 class="token-title">
        Join the fanclub of Telegram
      </h2>
      <!-- todo -->
      <div class="group">
        <p class="token-not">
          暂无
        </p>
      </div>
    </div>

    <div class="token-list">
      <h2 class="token-title">
        Supporters
      </h2>
      <!-- todo -->
      <div class="supporters">
        <p class="token-not">
          暂无
        </p>
      </div>
    </div>

    <div class="token-list">
      <h2 class="token-title">
        Projects (Github Link)
      </h2>
      <div class="projects">
        <p class="token-not">
          暂无
        </p>
      </div>
      <!-- todo -->
    </div>

    <div class="token-list">
      <h2 class="token-title">
        Tasks
      </h2>
      <div class="projects">
        <router-link :to="{name: 'tasks'}">
          <p v-for="(item, index) in tasksList.mainTasks" :key="item.id + '-' + index" class="project-text">{{ item.title }}</p>
          <p v-for="(item, index) in tasksList.sideTasks" :key="item.id + '-' + index" class="project-text">{{ item.title }}</p>
        </router-link>
        <p v-if="tasksList.mainTasks.length === 0 && tasksList.sideTasks.length === 0" class="token-not">
          暂无
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import achievement1 from '@/assets/img/achievement1.png'
import achievement2 from '@/assets/img/achievement2.png'
import achievement3 from '@/assets/img/achievement3.png'
import achievement4 from '@/assets/img/achievement4.png'
import socialIcon from '@/components/social_icon/index.vue'
import socialTypes from '@/config/social_types.js'


export default {
  components: {
    socialIcon
  },
  data() {
    return {
      minetokenToken: Object.create(null),
      resourcesSocialss: [],
      resourcesWebsites: [],
      achievementList: [
        {
          img: achievement1,
          text: 'Get 1000000 goidcoin from other users.'
        },
        {
          img: achievement2,
          text: 'Get 1000000 goidcoin from other users.'
        },
        {
          img: achievement3,
          text: 'Get 1000000 goidcoin from other users.'
        },
        {
          img: achievement4,
          text: 'Get 1000000 goidcoin from other users.'
        }
      ],
      teamData: [], // team Member
      tasksList: {
        mainTasks: [],
        sideTasks: []
      }, // task
    }
  },
  asyncData() {
    console.log('id index')
  },
  created() {
    if (process.browser) {
      const id = this.$route.params.id
      this.minetokenId(id)
      this.minetokenGetResources(id)
      this.teamMember()

      this.task()
    }
  },
  methods: {
    async minetokenId(id) {
      await this.$API.minetokenId(id).then(res => {
        if (res.code === 0) {
          this.minetokenToken = res.data.token || Object.create(null)
          // this.minetokenUser = res.data.user || Object.create(null)
          // this.minetokenExchange = res.data.exchange || Object.create(null)
        } else {
          console.log(res.message)
        }
      })
        .catch(err => {
          console.log(err)
        })
    },
    // 得到token的相关资源
    async minetokenGetResources(id) {
      await this.$API
        .minetokenGetResources(id)
        .then(res => {
          if (res.code === 0) {
            const socialFilter = res.data.socials.filter(i =>
              socialTypes.includes(i.type)
            ) // 过滤
            const socialFilterEmpty = socialFilter.filter(i => i.content) // 过滤
            this.resourcesSocialss = socialFilterEmpty
            this.resourcesWebsites = res.data.websites
          } else {
            this.$message.success(res.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    formatUrl(url) {
      const isHttp = url.indexOf('http://')
      const isHttps = url.indexOf('https://')
      if (isHttp !== 0 && isHttps !== 0) url = 'http://' + url
      return url
    },
    // 获取所有队员
    async teamMember() {
      if (this.tokenId === -1) return
      await this.$API.teamMember(Number(this.$route.params.id))
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
    // 团队头像
    teamMemberAvatar(src) {
      return src ? this.$ossProcess(src, { h: 90 }) : ''
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

            this.taskTeam(this.$route.params.id, {
              mainTasks,
              sideTasks
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 团队列表
    async taskTeam(tokenId, list) {
      this.$API.taskTeam(tokenId)
        .then(res => {
          if (res.code === 0) {

            let mainTask = -1
            let sideTask = []

            res.data.map(item => {
              if (Number(item.type) === 0) {
                mainTask = Number(item.task_id)
              } else if (Number(item.type) === 1) {
                sideTask.push(Number(item.task_id))
              } else {
                console.log('error', item)
              }
            })

            // 主线
            this.tasksList.mainTasks = list.mainTasks.filter(item => item.id === mainTask)
            // 支线
            for(let i = 0; i < sideTask.length; i++) {
              for (let j = 0; j < list.sideTasks.length; j++) {
                if (sideTask[i] === list.sideTasks[j].id) {
                  this.tasksList.sideTasks.push(list.sideTasks[j])
                }
              }
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>

<style lang="less" scoped>
// common
.token-list {
  margin: 40px 0 0 0;
}
.token-title {
  padding: 0;
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 28px;
}
.token-not {
  font-size: 16px;
  padding: 0;
  margin: 0;
  color: #fff;
}

// common end

.token-brief {
  padding: 0;
  margin: 20px 0 0 0;
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 30px;
  white-space: pre-wrap;
  word-break: break-all;
}

.teammember {
  margin-top: 10px;
  &::after {
    display: block;
    content: "";
    width: 0;
    height: 0;
    clear: both;
  }
}
.teammember-block {
  float: left;
  width: 140px;
  overflow: hidden;
  text-align: center;
  .components-avatar {
    width: 60px;
    height: 60px;
    margin: 0 auto;
  }
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #fff;
    font-size: 16px;
    padding: 0;
    margin: 10px 0 0 0;
  }
}

.achievement {
  display: flex;
  align-items: center;
  .tooltip {
    margin-left: 50px;
    max-width: 300px;
    &:nth-child(1) {
      margin-left: 0;
    }
  }
}
.website {
  margin-top: 20px;
  a {
    display: block;
    font-size: 16px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 22px;
    padding: 0;
    margin: 10px 0 0;
    text-decoration: underline;
    &:nth-child(1) {
      margin-top: 0;
    }
  }
}

.contact {
  margin-top: 20px;
  .social-btn {
    &::after {
      display: block;
      content: "";
      width: 0;
      height: 0;
      clear: both;
    }
    .social-icon {
      width: 60px;
      height: 60px;
      font-size: 30px;
      float: left;
      margin-left: 20px;
      &:nth-child(1) {
        margin-left: 0;
      }
    }
  }
}

.group,
.supporters,
.projects {
  margin-top: 20px;
}

.project-text {
  color: #fff;
  font-size: 16px;
  line-height: 1.5;
  padding: 0;
  margin: 0 0 10px 0;
}
</style>