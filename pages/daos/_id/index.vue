<template>
  <div>
    <div class="gallery">
      <div class="fl ac">
        <h2 class="token-title">
          Project Images
        </h2>
        <el-tooltip
          effect="dark"
          content="Manage"
          placement="top"
        >
          <svg-icon icon-class="setting" class="gallery-setting" @click="galleryDialog = true" />
        </el-tooltip>
        <m-dialog
          v-model="galleryDialog"
          title="Setting Gallery"
          width="600px"
        >
          <ul class="gallery-list">
            <li v-for="(item, index) in projectImageListUpload" :key="index">
              <div>
                <div class="gallery-list-cover">
                  <img v-if="item" :src="item" alt="image">
                </div>
                <el-button @click="coverUpload(index+'')">
                  上传
                </el-button>
              </div>
            </li>
          </ul>
        </m-dialog>
        <imgUploads
          :open="imgUploadConfig.open"
          :update-type="imgUploadConfig.type"
          :view-width="imgUploadConfig.viewWidth"
          :view-height="imgUploadConfig.viewHeight"
          :aspect-ratio="imgUploadConfig.aspectRatio"
          @done="done"
        />
      </div>
      <viewer :images="projectImageList" class="gallery-m">
        <div v-for="(item, index) in projectImageList" :key="index" class="gallery-m-b">
          <img v-if="item" :src="item" alt="image">
        </div>
      </viewer>
    </div>

    <div class="token-row">
      <div class="token-col-7">
        <div class="token-block">
          <div class="token-list">
            <h2 class="token-title">
              Brief Introduction
            </h2>
            <p class="token-brief">{{ minetokenToken.introduction || '暂无' }}</p>
          </div>
        </div>

        <div class="token-block mt20">
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
        </div>

        <div class="token-block mt20">
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

        <div class="token-block mt20">
          <div class="token-list">
            <h2 class="token-title">
              Website
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
        </div>

        <div class="token-block mt20">
          <div class="token-list">
            <div class="fl ac">
              <h2 class="token-title">
                Milestone
              </h2><el-tooltip
                effect="dark"
                content="Manage"
                placement="top"
              >
                <svg-icon icon-class="setting" class="gallery-setting" @click="milestoneDialog = true" />
              </el-tooltip>
            </div>
            <div class="milestone">
              <el-checkbox
                v-for="(item, index) in milestoneList"
                :key="index"
                v-model="item.status"
                class="milestone-list"
                :label="item.label"
                disabled
              />
            </div>
            <m-dialog
              v-model="milestoneDialog"
              title="Setting Milestone"
              width="600px"
            >
              <div>
                <div v-for="(item, index) in milestoneList" :key="index">
                  <el-input v-model="item.label" />
                  <el-checkbox v-model="item.status" />
                </div>
                <el-button @click="milestoneList.push({label: '', status: false})">
                  添加
                </el-button>
                <el-button @click="postMinetokenMilestones">
                  保存
                </el-button>
              </div>
            </m-dialog>
          </div>
        </div>

        <div class="token-block mt20">
          <div class="token-list">
            <h2 class="token-title">
              Live of development
            </h2>
            <div class="live">
              <div
                v-for="(item, index) in pullLives.list"
                :key="index"
                class="live-block fl ac jsb"
              >
                <div class="live-block__user fl ac">
                  <c-avatar :src="avatar(item.avatar)" />
                  <div class="live-block__info">
                    <p class="live-block__username">
                      {{ item.nickname || item.username }}
                    </p>
                    <!-- <span>tag</span> -->
                  </div>
                </div>
                <a
                  class="live-block__address"
                  :href="item.content"
                  target="_blank"
                >{{ item.title }}</a>

                <a
                  class="live-block__btn"
                  :href="item.content"
                  target="_blank"
                >
                  <el-button type="primary" size="small">
                    立即观看
                  </el-button></a>
              </div>
              <p
                v-if="pullLives.list.length === 0"
                class="token-not"
              >
                暂无
              </p>
              <user-pagination
                v-show="!pullLives.loading"
                :url-replace="$route.params.id + ''"
                :current-page="pullLives.currentPage"
                :params="pullLives.params"
                :api-url="pullLives.apiUrl"
                :page-size="pullLives.size"
                :total="pullLives.total"
                :need-access-token="true"
                class="use-pagination"
                @paginationData="paginationDataLives"
                @togglePage="togglePageLives"
              />
            </div>
          </div>
        </div>

        <div class="token-block mt20">
          <div class="token-list">
            <h2 class="token-title">
              Progress of development
            </h2>
            <div class="progress">
              <div
                v-for="(item, index) in pullNews.list"
                :key="index"
                class="progress-block"
              >
                <p class="progress-block__title">{{ item.title }}</p>
                <p class="progress-block__content">{{ item.content }}</p>
                <p class="progress-block__time">{{ time(item.create_time) }}</p>
              </div>
              <p
                v-if="pullNews.list.length === 0" 
                class="token-not"
              >
                暂无
              </p>
              <user-pagination
                v-show="!pullNews.loading"
                :url-replace="$route.params.id + ''"
                :current-page="pullNews.currentPage"
                :params="pullNews.params"
                :api-url="pullNews.apiUrl"
                :page-size="pullNews.size"
                :total="pullNews.total"
                :need-access-token="true"
                class="use-pagination"
                @paginationData="paginationDataNews"
                @togglePage="togglePageNews"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="token-col-3">
        <div class="token-block">
          <div class="table">
            <h2 class="token-title">
              Supporters
            </h2>
            <div class="table-content">
              <div>
                <div class="table-head">
                  <div class="table-head-th">
                    Username
                  </div>
                  <div class="table-head-th">
                    Vote Amount
                  </div>
                </div>
                <div class="table-body">
                  <div v-for="(item, index) in pullSupporters.list" :key="index" class="table-body-tr">
                    <div class="table-body-td">
                      <router-link class="fl ac" :to="{name: 'user-id', params: { id: item.uid }}">
                        <span class="index">{{ (index+1) * pullSupporters.currentPage }}</span>
                        <c-avatar :src="avatar(item.avatar)" />
                        <span class="username">{{ item.nickname || item.username }}</span>
                      </router-link>
                    </div>
                    <div class="table-body-td ticket-container">
                      <svg-icon icon-class="tickets" class="ticket-icon" />  
                      {{ item.weight }}
                    </div>
                  </div>
                </div>
              </div>
              <user-pagination
                v-show="!pullSupporters.loading"
                :url-replace="$route.params.id"
                :current-page="pullSupporters.currentPage"
                :params="pullSupporters.params"
                :api-url="pullSupporters.apiUrl"
                :page-size="pullSupporters.size"
                :total="pullSupporters.total"
                :need-access-token="true"
                class="use-pagination"
                @paginationData="paginationDataSupporters"
                @togglePage="togglePageSupporters"
              />
            </div>
          </div>
        </div>

        <div class="token-block mt20">
          <div class="table">
            <h2 class="token-title">
              Vote Record
            </h2>
            <div class="table-content">
              <div>
                <div class="table-head">
                  <div class="table-head-th">
                    Username
                  </div>
                  <div class="table-head-th">
                    Vote Amount
                  </div>
                  <div class="table-head-th" style="flex: 0 0 70px" />
                </div>
                <div class="table-body">
                  <el-tooltip
                    v-for="(item, index) in pullVotes.list"
                    :key="index"
                    effect="dark"
                    :content="time(item.create_time)"
                    placement="top"
                  >
                    <div class="table-body-tr">
                      <div class="table-body-td">
                        <router-link class="fl ac" :to="{name: 'user-id', params: { id: item.uid }}">
                          <c-avatar :src="avatar(item.avatar)" />
                          <span class="username">{{ item.nickname || item.username }}</span>
                        </router-link>
                      <!-- <div>
                        {{ time(item.create_time) }}
                      </div> -->
                      </div>
                      <div class="table-body-td ticket-container">
                        <svg-icon icon-class="tickets" class="ticket-icon" />  
                        {{ item.weight }}
                      </div>
                      <div class="table-body-td" style="flex: 0 0 70px">
                        <a 
                          title="view on near explorer"
                          class="near-trx-box" 
                          :href="'https://explorer.nearprotocol.com/transactions/' + item.trx"
                          target="_blank"
                        >
                          <svg-icon icon-class="near_logo_1" class="near-logo" />
                        </a>
                      </div>
                    </div>
                  </el-tooltip>
                </div>
              </div>
              <user-pagination
                v-show="!pullVotes.loading"
                :url-replace="$route.params.id"
                :current-page="pullVotes.currentPage"
                :params="pullVotes.params"
                :api-url="pullVotes.apiUrl"
                :page-size="pullVotes.size"
                :total="pullVotes.total"
                :need-access-token="true"
                class="use-pagination"
                @paginationData="paginationDataVotes"
                @togglePage="togglePageVotes"
              />
            </div>
          </div>

          <!-- <div class="chart">
              <h3 class="supporter-title">
                chart
              </h3>
              <el-radio-group
                v-model="chartsRadio"
                size="small"
                class="chart-toggle"
                @change="changeCharts"
              >
                <el-radio-button label="day">
                  一天
                </el-radio-button>
                <el-radio-button label="week">
                  一周
                </el-radio-button>
              </el-radio-group>
              <div class="chart-content">
                <ve-line
                  :loading="loading"
                  :data="chartData"
                  :settings="chartSettings"
                  :colors="lineColor"
                  :text-style="textStyle"
                  :legend="legend"
                />
              </div>
            </div> -->
        </div>
      </div>
    </div>



    <!-- <div class="token-list">
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
    </div> -->
  </div>
</template>


<script>
import achievement1 from '@/assets/img/achievement1.png'
import achievement2 from '@/assets/img/achievement2.png'
import achievement3 from '@/assets/img/achievement3.png'
import achievement4 from '@/assets/img/achievement4.png'
import userPagination from '@/components/user/user_pagination.vue'
import moment from 'moment'
// import { isNDaysAgo } from '@/utils/momentFun'
import imgUploads from '@/components/img_upload'

export default {
  components: {
    userPagination,
    imgUploads
  },
  data() {
    this.chartSettings = {
      area: true,
      labelMap: {
        create_time: '访问用户',
        weight: '投票数'
      }
    }
    return {
      imgUploadConfig: { // 图片上传配置
        open: 0,
        type: '',
        viewWidth: '240px',
        viewHeight: '240px',
        aspectRatio: 1 / 1
      },
      milestoneList: [],
      milestoneDialog: false,
      galleryDialog: false,
      projectImageList: [
      ],
      projectImageListUpload: [],
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
      lives: [],
      news: [],
      pullLives: {
        loading: false,
        params: {
          pagesize: 5,
          order: 'desc',
        },
        apiUrl: 'minetokenLives',
        list: [],
        currentPage: Number(this.$route.query.page) || 1,
        size: 5,
        total: 0,
      },
      pullNews: {
        loading: false,
        params: {
          pagesize: 5,
          order: 'desc',
        },
        apiUrl: 'minetokenNews',
        list: [],
        currentPage: Number(this.$route.query.pages) || 1,
        size: 5,
        total: 0,
      },
      pullSupporters: {
        loading: false,
        params: {
          userId: this.$route.params.id,
          pagesize: 10,
        },
        apiUrl: 'supporters',
        list: [],
        currentPage: Number(this.$route.query.page) || 1,
        size: 10,
        total: 0,
      },
      pullVotes: {
        loading: false,
        params: {
          userId: this.$route.params.id,
          pagesize: 10,
        },
        apiUrl: 'votes',
        list: [],
        currentPage: Number(this.$route.query.pageVote) || 1,
        size: 10,
        total: 0,
      },
      // 图表
      loading: false,
      chartsRadio: 'day',
      chartsData: {}, // 源数据
      chartsDay: [], // 天数据
      chartsWeek: [], // 周数据
      lineColor: ['#5031D9'],
      textStyle: {
        color: '#fff'
      },
      legend: {
        textStyle: {
          color: '#fff'
        }
      },
      chartData: {
        columns: ['create_time', 'weight'],
        rows: []
      },
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

      this.chartsVote(this.$route.params.id)
      this.getMinetokenImages(this.$route.params.id)
      this.getMinetokenMilestones(this.$route.params.id)

    }
  },
  methods: {
    projectImage(src) {
      return src ? this.$ossProcess(src, { h: 200 }) : ''
    },
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
            this.resourcesWebsites = res.data.websites
          } else {
            console.log(res.message)
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
    // time(create_time) {
    //   let time = moment(create_time)
    //   return isNDaysAgo(2, time) ? time.format('MMMDo HH:mm') : time.fromNow()
    // },
    paginationDataLives(res) {
      this.pullLives.list = res.data.list
      this.pullLives.total = res.data.count || 0
      this.pullLives.loading = false
    },
    togglePageLives(i) {
      this.pullLives.loading = true
      this.pullLives.list = []
      this.pullLives.currentPage = i

      const query = Object.assign({}, this.$route.query)
      const pageQuery = Object.assign(query, { page: i })
      
      this.$router.push({
        query: pageQuery
      })
    },
    paginationDataNews(res) {
      this.pullNews.list = res.data.list
      this.pullNews.total = res.data.count || 0
      this.pullNews.loading = false
    },
    togglePageNews(i) {
      this.pullNews.loading = true
      this.pullNews.list = []
      this.pullNews.currentPage = i

      const query = Object.assign({}, this.$route.query)
      const pageQuery = Object.assign(query, { pages: i })
      
      this.$router.push({
        query: pageQuery
      })
    },

    async getVotingLog() {
      try {
        const result = await this.$API.getVotingLog({
          pid: this.pj.pid
        })
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    },
    avatar(src) {
      return src ? this.$ossProcess(src, { h: 90 }) : ''
    },
    time(time) {
      return time ? moment(time).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    paginationDataSupporters(res) {
      this.pullSupporters.list = res.data.list
      this.pullSupporters.total = res.data.count || 0
      this.pullSupporters.loading = false
    },
    togglePageSupporters(i) {
      this.pullSupporters.loading = true
      this.pullSupporters.list = []
      this.pullSupporters.currentPage = i

      const query = Object.assign({}, this.$route.query)
      const pageQuery = Object.assign(query, { page: i })
      
      this.$router.push({
        query: pageQuery
      })
    },

    paginationDataVotes(res) {
      this.pullVotes.list = res.data.list
      this.pullVotes.total = res.data.count || 0
      this.pullVotes.loading = false
    },
    togglePageVotes(i) {
      this.pullVotes.loading = true
      this.pullVotes.list = []
      this.pullVotes.currentPage = i

      const query = Object.assign({}, this.$route.query)
      const pageQuery = Object.assign(query, { pageVote: i })
      
      this.$router.push({
        query: pageQuery
      })
    },
    // 获取投票记录
    chartsVote(id) {
      this.loading = true
      this.$API.chartsVote(id).then(res => {
        if (res.code === 0) {
          console.log(res.data)
          this.chartsData = res.data

          if (this.chartsRadio === 'day') {
            this.chartData.rows = res.data.day
          } else if (this.chartsRadio === 'week') {
            this.chartData.rows = res.data.week
          } else {
            //
          }
        }
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        this.loading = false
      })
    },
    // 切换时间
    changeCharts(val) {
      if (val === 'day') {
        this.chartData.rows = this.chartsData.day
      } else if (val === 'week') {
        this.chartData.rows = this.chartsData.week
      } else {
        //
      }
    },
    coverUpload(type) {
      this.imgUploadConfig.viewWidth =  200 + 'px'
      this.imgUploadConfig.viewHeight = 124 + 'px'
      this.imgUploadConfig.type = type
      this.imgUploadConfig.aspectRatio = 200 / 124
      this.imgUploadConfig.open++
    },
    // 图片上传完成
    done(data) {
      if (data.type) {
        this.projectImageListUpload[Number(data.type)] = data.data.cover
        this.postMinetokenImages()
      }
    },
    // 项目图片
    async getMinetokenImages(id) {
      await this.$API.getMinetokenImages(id).then(res => {
        const list = res.data.map(item => this.projectImage(item.url))
        this.projectImageList = list

        this.projectImageListUpload = res.data.map(item => item.url)

        if (this.projectImageListUpload.length < 5) {
          for (let i = 0; i <= 6 - this.projectImageListUpload.length; i++) {
            this.projectImageListUpload.push({})
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    async postMinetokenImages() {
      const data = this.projectImageListUpload.filter(item => !this.$utils.isNull(item))
      await this.$API.postMinetokenImages(this.$route.params.id, {
        images: data
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.message)
          this.getMinetokenImages(this.$route.params.id)
        } else {
          this.$message.error(res.message)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    async getMinetokenMilestones(id) {
      await this.$API.gettMinetokenMilestones(id).then(res => {
        res.data.map(item => {
          item.status = !!item.status
        })
        this.milestoneList = res.data
      }).catch(e => {
        console.log(e)
      })
    },
    async postMinetokenMilestones() {
      this.milestoneList.map(item => {
        item.status = item.status ? 1 : 0
      })
      await this.$API.postMinetokenMilestones(this.$route.params.id, {
        milestones: this.milestoneList
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
// common
.token-list {
  margin: 40px 0 0 0;

  &:nth-child(1) {
    margin-top: 0;
  }
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
.gallery {
  width: 100%;
  background-color: #132d5e;
  margin: 20px 0;
  padding: 20px;
  box-sizing: border-box;
  .gallery-setting {
    margin-left: 10px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
  &-m {
    margin-top: 10px;
    &::after {
      width: 0;
      height: 0;
      clear: both;
      display: block;
      content: "";
    }
    &-b {
      width: 18%;
      min-height: 100px;
      float: left;
      margin-right: 2.5%;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      &:nth-last-child(1) {
        margin-right: 0;
      }
    }
  }
}

.token-row {
  width: 100%;
  &::after {
    display: block;
    content: "";
    width: 0;
    height: 0;
    clear: both;
  }
  .token-col-7 {
    width: calc(70% - 20px);
    min-height: 300px;
    float: left;
    margin-right: 20px;
  }
  .token-col-3 {
    width: 30%;
    min-height: 300px;
    float: left;
  }
}
.token-block {
  background-color: #132d5e;
  padding: 20px;
  box-sizing: border-box;
  &.mt20 {
    margin-top: 20px;
  }
}

.live,
.progress {
  margin-top: 20px;
}

.live-block {
  background: rgba(19, 45, 94, 1);
  border-radius: 8px;
  margin: 20px 0 0;
  padding: 0;
  color: #fff;
  .components-avatar {
    width: 60px;
    height: 60px;
    flex: 0 0 60px;
    margin: 0 10px 0 0;
  }
  &__user,
  &__btn {
    width: 30%;
  }
  &__btn {
    text-align: right;
  }
  &__user {
    overflow: hidden;
  }
  &__info {
    overflow: hidden;
  }
  &__username {
    padding: 0;
    margin: 0;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__address {
    display: inline-block;
    color: #fff;
    text-decoration: underline;
    width: 40%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
.progress-block {
  background: rgba(19, 45, 94, 1);
  border-radius: 8px;
  padding: 0;
  margin: 20px 0 0;
  color: #fff;
  &__title {
    padding: 0;
    margin: 0;
    font-size: 20px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 28px;
  }
  &__content {
    padding: 0;
    margin: 10px 0 0 0;
    word-break: break-all;
    white-space: pre-wrap;

    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 22px;
  }
  &__time {
    padding: 0;
    margin: 20px 0 0 0;
    font-size: 14px;
    font-weight: 400;
    color: rgba(178, 178, 178, 1);
    line-height: 20px;
    text-align: right;
  }
}

.ticket-container {
  flex: 0 0 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  .ticket-icon {
    font-size: 24px;
    margin-right: 10px;
  }
}
.near-trx-box {
  font-size: 36px;
  color: #542de0;
  width: 60px;
  height: 30px;
  border-radius: 2px;
  padding: 6px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;

  .near-logo {
    font-size: 50px;
    color: #542de0;
  }
}

.table {
  &-content {
    min-height: 400px;
    background-color: #132d5e;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.table-head {
  display: flex;
  align-items: center;
  &-th {
    flex: 1;
    font-size: 16px;
    font-weight: 500;
    color: rgba(178, 178, 178, 1);
    line-height: 22px;
  }
}
.table-body {
  &-tr {
    flex: 1;
    display: flex;
    align-items: center;
  }
  &-td {
    flex: 1;
    margin: 10px 0;
    font-size: 16px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 22px;
    .index {
      font-size: 24px;
      font-weight: bold;
      margin-right: 10px;
      color: rgba(255, 255, 255, 1);
      text-decoration: none;
    }
    .username {
      margin-left: 10px;
      color: rgba(255, 255, 255, 1);
      text-decoration: none;
    }
  }
}
.chart {
  position: relative;
  min-height: 400px;
  &-toggle {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 99;
  }
}
.use-pagination {
  margin-top: 20px;
}
.milestone {
  margin-top: 20px;
  &-list {
    display: block;
    margin-top: 10px;
    &:nth-child(1) {
      margin-top: 0;
    }
  }
}
.gallery-list {
  margin: 0;
  padding: 0;
  &::after {
    display: block;
    content: "";
    width: 0;
    height: 0;
    clear: both;
  }
  &-cover {
    width: 100px;
    height: 62px;
    border: 1px solid #e8e8e8;
    box-sizing: border-box;
    margin-bottom: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  li {
    list-style: none;
    float: left;
    width: 100px;
    margin-right: 10px;
  }
}
</style>