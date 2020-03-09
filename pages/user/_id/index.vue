<template>
  <div class="user">
    <g-header></g-header>
    <main class="user-main">
      <div class="user-head">
        <div class="user-avatar">
          <avatar :src="userInfo.avatar"></avatar>
          <h1>{{ userInfo.name }}</h1>
        </div>
        <div class="user-edit">
          <followBtn
            v-if="!isMe(Number($route.params.id))"
            :id="Number($route.params.id)"
            class="follow"
          />
          <router-link v-else :to="{name: 'setting'}">
            <el-button size="small" class="follow edit">
              {{ $t('user.editProfile') }}
            </el-button>
          </router-link>
          <el-button @click="shareModalShow = true" size="small" class="follow2">
            <svg-icon icon-class="share_new" />
            {{ $t('share') }}
          </el-button>
        </div>
      </div>

      <div class="user-list">
        <h2 class="user-title">Brief Introduction</h2>
        <p class="user-brief">
          And when I prophesied, Pelatiah the son of Benaiah died; and I fell on my face and cried out with a loud voice, and I said, Ah, Lord Jehovah! Are You making a full end to the remnant of Israel?And when I prophesied, Pelatiah the son of Benaiah died; and I fell on my face and cried out with a loud voice, and I said, Ah, Lord Jehovah! Are You making a full end to the remnant of Israel?And when I prophesied, Pelatiah the son of Benaiah died; and I fell on my face and cried out with a loud voice, and I said, Ah, Lord Jehovah! 
        </p>
      </div>

      <div class="user-list">
        <h2 class="user-title">Address</h2>
        <div v-if="userAddress">
          <a :href="'http://rinkeby.etherscan.io/address/' + userAddress" target="_blank">
            <el-button class="link-btn" size="small">
              <svg-icon icon-class="eth_mini" />
              链上查看
            </el-button>
          </a>
        </div>
      </div>

      <div class="user-list">
        <h2 class="user-title">Abillities and Skills</h2>
        <!-- todo -->
        <div style="height: 400px;"></div>
      </div>

      <div class="user-list">
        <h2 class="user-title">Tags</h2>
        <div>
          <el-tag v-for="(item, index) in tags" :key="index" style="margin-right: 10px;">
            <i class="el-icon-price-tag"></i>
            {{item}}
          </el-tag>
        </div>
      </div>

      <div class="user-list">
        <h2 class="user-title">Personal Website</h2>
        <!-- todo -->
        <div>
          <a v-for="(item, index ) in urls" :key="index" :href="formatUrl(item)" target="_blank">{{ item }} </a>
        </div>
      </div>

      <div class="user-list">
        <h2 class="user-title">Award Records</h2>
        <!-- todo -->
      </div>

      <div class="user-list">
        <h2 class="user-title">Contact of SNS </h2>
        <!-- todo -->
        <div v-for="(item, index) in social" :key="index" class="social-icons inline">
          <socialIcon :icon="item.icon" :show-tooltip="true" :content="item.content" />
        </div>
      </div>

      <div class="user-list">
        <h2 class="user-title">Following</h2>
        <!-- todo -->
      </div>

      <div class="user-list">
        <h2 class="user-title">Followers</h2>
        <!-- todo -->
      </div>

      <div class="user-list">
        <h2 class="user-title">DAOs That He/She Organized</h2>
        <!-- todo -->
      </div>

      <div class="user-list">
        <h2 class="user-title">DAOs That He/She Joined</h2>
        <!-- todo -->
      </div>

      <div class="user-list">
        <h2 class="user-title">Details</h2>
        <!-- todo -->
      </div>




    </main>
    <Share
      :share-modal-show="shareModalShow"
      :minetoken-user="{nickname: userInfo.name}"
      :page-type="1"
      :img="userInfo.avatar"
      @input="val => shareModalShow = val"
    />
  </div>
</template>


<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import avatar from '@/common/components/avatar/index.vue'
import followBtn from '@/components/follow_btn'
import Share from '@/components/token/token_share.vue'
import socialIcon from '@/components/social_icon/index.vue'

export default {
  components: {
    avatar,
    followBtn,
    socialIcon,
    Share
  },
  data() {
    return {
      shareModalShow: false, // share dialog
      userAddress: '', // user address
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
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
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

      // tags
      try {
        this.tags.length = 0

        // 获取自己的job
        const daoUserJob = await factory(this.$API.getDaoUserJob({
          uid: this.currentUserInfo.id
        }))

        let job = daoUserJob.map(i => i.text_english)

        this.tags.push(...job)


        // 获取自己的skill
        const daoUserSkill = await factory(this.$API.getDaoUserSkill({
          uid: this.currentUserInfo.id
        }))
        
        let skill = daoUserSkill.map(i => i.text_english)

        this.tags.push(...skill)

      } catch (error) {
        console.log(error)
      }

      // user address
      try {
        // 获取自己的address
        this.userAddress = await factory(this.$API.userAddress({
          uid: this.currentUserInfo.id
        }))
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
  font-size:24px;
  font-weight:500;
  color:rgba(255,255,255,1);
  line-height:33px;
  padding: 0;
  margin: 0;
}
// common end

.user {
  padding: 60px 0 0 0;
  min-height: calc(100% - (60px + 200px));
  background-color: #0E2144;
}

.user-main {
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
}

.user-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;
}
.user-avatar {
  display: flex;
  align-items: center;
  .components-avatar {
    width: 120px;
    height: 120px;
  }
  h1 {
    font-size:48px;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:67px;
    margin-left: 20px;
  }
}


.user-brief {
  color: #fff;
  font-size:20px;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:30px;
  padding: 0;
  margin: 20px 0 0 0;
}
</style>