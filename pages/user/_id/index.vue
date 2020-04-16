<template>
  <div>
    <div class="user-list">
      <h2 class="user-title">
        Brief Introduction
      </h2>
      <p class="user-brief">
        {{ userInfo.introduction || 'Nothing' }}
      </p>
    </div>

    <div class="user-list">
      <h2 class="user-title">
        Tags
      </h2>
      <div class="user-tags">
        <el-tag
          v-for="(item, index) in tags"
          :key="index"
          class="tag"
        >
          <svg-icon icon-class="tag" />
          {{ item }}
        </el-tag>
        <p
          v-if="tags.length === 0"
          class="user-not"
        >
          Nothing
        </p>
      </div>
    </div>

    <div class="user-list">
      <h2 class="user-title">
        Personal Website
      </h2>
      <div class="user-website">
        <a
          v-for="(item, index ) in urls"
          :key="index"
          :href="formatUrl(item)"
          target="_blank"
        >{{ item }} </a>
        <p
          v-if="urls.length === 0"
          class="user-not"
        >
          Nothing
        </p>
      </div>
    </div>

    <div class="user-list">
      <h2 class="user-title">
        Contact of SNS
      </h2>
      <div class="user-social">
        <socialIcon
          v-for="(item, index) in social"
          :key="index"
          :icon="item.icon"
          :show-tooltip="true"
          :content="item.content"
        />
        <p
          v-if="social.length === 0"
          class="user-not"
        >
          Nothing
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'
// import avatar from '@/common/components/avatar/index.vue'
// import followBtn from '@/components/follow_btn'
import socialIcon from '@/components/social_icon/index.vue'

export default {
  components: {
    // avatar,
    // followBtn,
    socialIcon,
  },
  data() {
    return {
      userInfo: Object.create(null), // 用户信息
      tags: [], // tag
      urls: [], // website
      social: [],
      socialTemplate: [
        {
          icon: 'Email',
          type: 'email',
          content: ''
        },
        {
          icon: 'QQ',
          type: 'qq',
          content: ''
        },
        {
          icon: 'Wechat',
          type: 'wechat',
          content: ''
        },
        {
          icon: 'Weibo',
          type: 'weibo',
          content: ''
        },
        {
          icon: 'Telegram',
          type: 'telegram',
          content: ''
        },
        {
          icon: 'Twitter',
          type: 'twitter',
          content: ''
        },
        {
          icon: 'Facebook',
          type: 'facebook',
          content: ''
        },
        {
          icon: 'Github',
          type: 'github',
          content: ''
        }
      ],
    }
  },
  computed: {
    ...mapGetters(['isMe', 'currentUserInfo'])
  },
  mounted() {
    if (process.browser) {
      this.refreshUser({ id: this.$route.params.id })
      this.getUserData()
    }
  },
  methods: {
    ...mapActions('user', ['refreshUser', 'followOrUnfollowUser']),
    async getUserData() {
      
      // 工厂函数 返回接口数据
      const factory = async api => {
        try {
          const res = await api
          if (res.code === 0) {
            return res.data
          } else {
            console.log(res.message)
            return
          }
        } catch (error) {
          console.log(error)
          return
        }
      }

      // get user info
      const userInfo = await factory(this.$API.getUser(this.$route.params.id))
      this.userInfo = userInfo || Object.create(null)


      // tags
      try {
        this.tags.length = 0

        // 获取自己的job
        const daoUserJob = await factory(this.$API.getDaoUserJob({
          uid: this.$route.params.id
        }))

        let job = daoUserJob.map(i => i.text_english)

        this.tags.push(...job)


        // 获取自己的skill
        const daoUserSkill = await factory(this.$API.getDaoUserSkill({
          uid: this.$route.params.id
        }))
        
        let skill = daoUserSkill.map(i => i.text_english)

        this.tags.push(...skill)

      } catch (error) {
        console.log(error)
      }


      // website social
      try {
        const resLinks = await factory(this.$API.getUserLinks({
          id: this.$route.params.id
        }))

        this.urls = resLinks.websites

        resLinks.socialAccounts.forEach(item => {
          this.socialTemplate.find(age => age.type === item.type).content = item.value
        })
        this.social = this.socialTemplate.filter(age => age.content !== '' && age.content != null)
      } catch (error) {
        console.log(error)
      }
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
.user-list {
  margin: 40px 0 0 0;
}
.user-title {
  padding: 0;
  margin: 0;
  font-size:20px;
  font-weight:500;
  color:rgba(255,255,255,1);
  line-height:28px;
}
.user-not {
  font-size: 16px;
  padding: 0;
  margin: 0;
  color: #fff;
}

// common end

.user-brief {
  color: #fff;
  padding: 0;
  margin: 20px 0 0 0;
  font-size:16px;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:30px;
  white-space: pre-wrap;
  word-break: break-all;
}

.user-tags {
  margin: 20px 0 0 0;
  .tag {
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: #1C4085;
    border-color: #1C4085;
    color: #fff;
    font-size: 16px;
  }
}

.user-website {
  margin-top: 20px;
  a {
    display: block;
    text-decoration: underline;
    margin-top: 10px;
    font-size:16px;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:22px;
    &:nth-child(1) {
      margin-top: 0;
    }
  }
}

.award {
  margin: 20px 0 0;
}
.user-social {
  margin-top: 20px;
  .social-icon {
    float: left;
    margin-left: 20px;
    width: 60px;
    height: 60px;
    font-size: 30px;
    &:nth-child(1) {
      margin-left: 0;
    }
  }

  &::after {
    display: block;
    content: '';
    width: 0;
    height: 0;
    clear: both;
  }
}
</style>