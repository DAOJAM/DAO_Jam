<template>
  <div>
    <div class="token-list">
      <h2 class="token-title">Brief Introduction</h2>
      <p class="token-brief">{{ minetokenToken.introduction || '暂无' }}</p>
    </div>

    <div class="token-list">
      <h2 class="token-title">Achievement</h2>
      <div class="achievement">
        <el-tooltip effect="dark" :content="item.text" placement="top" v-for="(item, index) in achievementList" :key="index" class="tooltip">
          <img :src="item.img" alt="item.text">
        </el-tooltip>
        <p class="token-not" v-if="achievementList.length === 0">暂无</p>
      </div>
    </div>

    <div class="token-list">
      <h2 class="token-title">DAO Website</h2>
      <div class="website" v-if="resourcesWebsites.length !== 0">
        <a v-for="(item, index) in resourcesWebsites" :key="index" :href="formatUrl(item)">{{ item }}</a>
        <p class="token-not" v-if="resourcesWebsites.length === 0">暂无</p>
      </div>
    </div>

    <div class="token-list">
      <h2 class="token-title">Contact of SNS </h2>
      <div class="contact">
        <div class="social-btn">
          <socialIcon v-for="(item, index) in resourcesSocialss" :key="index"  :show-tooltip="true" :icon="item.type" :content="item.content" />
          <p class="token-not" v-if="resourcesSocialss.length === 0">暂无</p>
        </div>
      </div>
    </div>

    <div class="token-list">
      <h2 class="token-title">Join the fanclub of Telegram</h2>
      <!-- todo -->
      <div class="group">
        <p class="token-not">暂无</p>
      </div>
    </div>

    <div class="token-list">
      <h2 class="token-title">Supporters</h2>
      <!-- todo -->
      <div class="supporters">
        <p class="token-not">暂无</p>
      </div>
    </div>

    <div class="token-list">
      <h2 class="token-title">Projects (Github Link)</h2>
      <div class="projects">
        <p class="token-not">暂无</p>
      </div>
      <!-- todo -->
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
  asyncData() {
    console.log('id index')
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
      ]
    }
  },
  created() {
    if (process.browser) {
      const id = this.$route.params.id
      this.minetokenId(id)
      this.minetokenGetResources(id)
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
    }
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
  font-size:20px;
  font-weight:500;
  color:rgba(255,255,255,1);
  line-height:28px;
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
  font-size:16px;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:30px;
  white-space: pre-wrap;
  word-break: break-all;
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
    font-size:16px;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:22px;
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
      content: '';
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
</style>