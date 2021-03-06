<template>
  <userLayout :need-frame="false">
    <template slot="main">
      <div class="account-main">
        <h2 class="tag-title">
          {{ $t('user.accountSetting') }}
        </h2>
        <AccountBinding />
      </div>
      <div class="info-main">
        <h2 class="tag-title">
          {{ $t('user.userInformation') }}
        </h2>
        <div class="set-main setting-page">
          <div class="item list center">
            <span class="item-label title">{{ $t('avatar') }}</span>
            <img-upload
              :img-upload-done="imgUploadDone"
              :update-type="'avatar'"
              class="avatar"
              @doneImageUpload="doneImageUpload"
            >
              <div
                slot="uploadButton"
                class="user-avatar"
              >
                <div class="edit">
                  <i class="el-icon-camera" />
                  {{ $t('avatar') }}
                </div>
                <img
                  v-if="avatar"
                  slot="description"
                  :src="avatar"
                  alt="avatar"
                >
              </div>
            </img-upload>
          </div>
          <div class="item list center">
            <span class="item-label title">
              {{ $t('nickname') }}
            </span>
            <div class="input customize">
              <el-input
                v-model="username"
                :placeholder="$t('rule.username')"
                maxlength="50"
                show-word-limit
                clearable
              />
            </div>
          </div>
          <!-- <div class="list center">
            <span class="title"> {{ $t('email') }}</span>
            <div class="input">
              <el-input
                v-model="email"
                :placeholder="$t('rule.loginEmailMessage')"
                show-word-limit
                clearable
              />
            </div>
          </div> -->
          <div class="item list">
            <span class="item-label title">{{ $t('profile') }}</span>
            <div class="input customize">
              <el-input
                v-model="introduction"
                :rows="6"
                :placeholder="$t('rule.content')"
                type="textarea"
                maxlength="200"
                show-word-limit
              />
            </div>
          </div>
          <!-- 身份 -->
          <div class="item list">
            <span class="item-label title">Position</span>
            <div class="job">
              <div
                v-for="(item, index) in job"
                :key="index"
                class="job-checkbox customize"
              >
                <el-checkbox
                  v-model="item.checked"
                  :label="item.text_english"
                />
              </div>
            </div>
          </div>
          <!-- 技能 -->
          <div class="item list">
            <span class="item-label title">Skill</span>
            <div class="skill">
              <div
                v-for="(item, index) in skill"
                :key="index"
                class="skill-checkbox customize"
              >
                <el-checkbox
                  v-model="item.checked"
                  :label="item.text_english"
                />
                <el-input
                  v-if="item.checked"
                  v-model="item.value"
                  class="skill-number"
                  style="width:50px;"
                  minlength="1"
                  maxlength="3"
                  placeholder="1-100"
                  :min="1"
                  :max="100"
                  @change="skillChange(index)"
                />
              </div>
            </div>
          </div>
          <!-- 相关网站 -->
          <div class="item social-div">
            <span class="item-label title">
              Website
            </span>
            <div>
              <div
                v-for="(item, index) in about"
                :key="index"
                class="fl ac about-input social-list customize"
              >
                <el-input
                  v-model="about[index]"
                  class="input"
                  placeholder="Please fill in the website link, including http(s)://"
                />
                <div
                  v-if="about.length > 1"
                  class="about-input-btn"
                  @click="abountLess(index)"
                >
                  <i class="el-icon-minus" />
                </div>
              </div>
              <div
                v-if="about.length < 5"
                class="about-input-btn add"
                @click="aboutAdd"
              >
                <i class="el-icon-plus" />
              </div>
            </div>
          </div>
          <!-- 社交账号 -->
          <div class="item social-div">
            <span class="item-label title right0">
              Socials
            </span>
            <div>
              <span class="title-note">
                (information display only)
              </span>
              <div
                v-for="(item, index) in social"
                :key="index"
                class="social-list"
              >
                <p class="social-title">
                  {{ item.name }}
                  <span v-html="item.tooltip" />
                </p>
                <div class="fl customize">
                  <div class="social-icons">
                    <socialIcon :icon="item.symbol" />
                  </div>
                  <el-input
                    v-model="item.value"
                    :placeholder="item.placeholder"
                    class="social-input"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- 保存 -->
          <el-button
            :loading="loading"
            :class="(setProfile || aboutModify || socialModify || jobModify || skillModify) && 'active'"
            class="save"
            @click="save"
          >
            {{ $t('save') }}
          </el-button>
        </div>
      </div>
    </template>
    <template slot="nav">
      <myAccountNav />
    </template>
  </userLayout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import userLayout from '@/components/user/user_layout.vue'
import AccountBinding from '@/components/AccountBinding.vue'
import myAccountNav from '@/components/my_account/my_account_nav.vue'
import socialIcon from '@/components/social_icon/index.vue'

import imgUpload from '@/components/imgUpload/index.vue'

export default {
  components: {
    userLayout,
    imgUpload,
    socialIcon,
    myAccountNav,
    AccountBinding
  },
  data() {
    return {
      userData: null,
      linksData: null,
      username: '',
      introduction: '',
      avatar: '',
      setProfile: false, // 是否编辑信息
      imgUploadDone: 0, // 图片是否上传完成
      loading: false,
      numPage: 1,
      aboutModify: false,
      socialModify: false,
      jobModify: false, // 身份
      skillModify: false, // 技能
      about: [''],
      social: [
        {
          symbol: 'Email',
          type: 'email',
          name: 'Email: ',
          tooltip: '',
          placeholder: 'Email',
          url: '',
          value: ''
        },
        {
          symbol: 'QQ',
          type: 'qq',
          name: 'QQ: ',
          tooltip: '',
          placeholder: 'QQ Account',
          url: '',
          value: ''
        },
        {
          symbol: 'Wechat',
          type: 'wechat',
          name: 'Wechat: ',
          tooltip: '',
          placeholder: 'Wechat account',
          url: '',
          value: ''
        },
        {
          symbol: 'Weibo',
          type: 'weibo',
          name: 'Weibo: ',
          tooltip: '(https://www.weibo.com/<span>account</span>)',
          placeholder: 'Weibo username (no full URL required)',
          url: 'https://www.weibo.com',
          value: ''
        },
        {
          symbol: 'Telegram',
          type: 'telegram',
          name: 'Telegram：',
          tooltip: '',
          placeholder: 'Telegram username',
          url: '',
          value: ''
        },
        {
          symbol: 'Twitter',
          type: 'twitter',
          name: 'Twitter：',
          tooltip: '(https://twitter.com/<span>account</span>)',
          placeholder: 'Twitter username (no full URL required)',
          url: 'https://twitter.com',
          value: ''
        },
        {
          symbol: 'Facebook',
          type: 'facebook',
          name: 'Facebook：',
          tooltip: '(https://facebook.com/<span>account</span>)',
          placeholder: 'Facebook username (no full URL required)',
          url: 'https://facebook.com',
          value: ''
        },
        {
          symbol: 'Github',
          type: 'github',
          name: 'Github：',
          tooltip: '(https://github.com/<span>account</span>)',
          placeholder: 'Github username (no full URL required)',
          url: 'https://github.com',
          value: ''
          // resourcesSocialss: [],
          // resourcesWebsites: [],
        }
      ],
      // 身份
      job: [],
      // 技能
      skill: []
    }
  },
  computed: {
    ...mapGetters(['currentUserInfo'])
  },
  watch: {
    username(newVal) {
      if (
        this.detection(newVal, 'username') ||
        this.detectionIntroduction()) this.setProfile = true
      else this.setProfile = false
    },
    introduction(newVal) {
      if (
        this.detection(newVal, 'introduction') ||
        this.detectionUsername()) this.setProfile = true
      else this.setProfile = false
    },
    about: {
      deep: true,
      handler() {
        this.aboutModify = JSON.stringify(this.linksData.websites) !== JSON.stringify(this.about)
      }
    },
    social: {
      deep: true,
      handler() {
        for (const item of this.social) {
          const oSocial = this.linksData.socialAccounts.find(age => age.type === item.type)
          if (oSocial == null) {
            if (item.value !== '') {
              this.socialModify = true
              return
            }
          } else if (oSocial.value !== item.value) {
            this.socialModify = true
            return
          }
        }
        this.socialModify = false
      }
    },
    // 没有对比 job 和 skill是否修改
    job: {
      deep: true,
      handler() {
        this.jobModify = true
      }
    },
    skill: {
      deep: true,
      handler() {
        this.skillModify = true
      }
    }
    // social(newVal) {

    // }
  },
  created() {
  },
  mounted() {
    this.getMyUserData()
  },
  methods: {
    ...mapActions('user', [
      'refreshUser'
    ]),
    // 检测
    detection(val, type) {
      if (type === 'username') return val !== (this.userData.nickname || this.userData.username)
      if (type === 'introduction') return val !== this.userData.introduction
    },
    detectionUsername() {
      return this.username !== (this.userData.nickname || this.userData.username)
    },
    detectionIntroduction() {
      return this.introduction !== this.userData.introduction
    },
    // 输入框内容检测
    checkSaveParams() {
      const introductionLength = 200
      // 中文 字母 数字 1-12
      const reg = /^[\u4E00-\u9FA5A-Za-z0-9]{1,50}$/
      // const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (!reg.test(this.username)) {
        throw this.$t('rule.strEnglishNumber', ['1-50'])
      } else if (this.introduction.length > introductionLength) {
        throw this.$t('rule.profileNotExceedStr', [introductionLength])
      }
    },
    setAvatarImage(hash) {
      if (hash) this.avatar = this.$ossProcess(hash)
    },
    // 完成上传
    doneImageUpload() {
      // console.log(res)
      this.imgUploadDone += Date.now()
      this.refreshUser({ id: this.currentUserInfo.id })
      this.getMyUserData()
    },
    // 获取用户信息 - 转让状态
    async getMyUserData() {
      const setUser = data => {
        // console.log(data)
        this.userData = data
        this.username = data.nickname || data.username
        this.introduction = data.introduction || ''
        this.setAvatarImage(data.avatar)
      }
      const setLinks = data => {
        this.linksData = data
        this.about = [
          ...data.websites.length !== 0 ? data.websites : ['']
        ]
        data.socialAccounts.forEach(item => {
          this.social.find(age => age.type === item.type).value = item.value
        })
      }


      try {
        // 我的信息
        const res = await this.$API.getMyUserData()
        if (res.code === 0) {
          setUser(res.data)
        } else {
          console.log(res.message)
        }
      } catch (error) {
        console.log(error)
      }
      try {
        // 我的信息链接
        const resLinks = await this.$API.getUserLinks({ id: this.currentUserInfo.id })
        if (resLinks.code === 0) {
          setLinks(resLinks.data)
        } else {
          console.log(resLinks.message)
        }
      } catch (error) {
        console.log(error)
      }


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


      // 身份
      try {
        // 获取身份可选项options
        const daoJob = await factory(this.$API.daoJobOptions())

        let daoJobList = daoJob.map(i => {
          return {
            // 选择状态
            checked: false,
            ...i
          }
        })

        // 获取自己的job
        const daoUserJob = await factory(this.$API.getDaoUserJob({
          uid: this.currentUserInfo.id
        }))

        // 合并数据
        daoJobList.map(item => {
          for (let i = 0; i < daoUserJob.length; i++) {
            const element = daoUserJob[i]
            if (element.jid === item.id) {
              item.checked = true
            }
          }
        })

        this.job = daoJobList

      } catch (error) {
        console.log(error)
      }

      // 技能
      try {
        // 获取技能可选项options
        const daoSkill = await factory(this.$API.daoSkillOptions())

        const daoSkillList = daoSkill.map(i => {
          return {
            // 选择状态
            checked: false,
            value: 1,
            ...i
          }
        })

        // 获取自己的skill
        const daoUserSkill = await factory(this.$API.getDaoUserSkill({
          uid: this.currentUserInfo.id
        }))

        // 合并数据
        daoSkillList.map(item => {
          for (let i = 0; i < daoUserSkill.length; i++) {
            const element = daoUserSkill[i]
            if (element.sid === item.id) {
              item.checked = true
              item.value = element.value
            }
          }
        })

        this.skill = daoSkillList

      } catch (error) {
        console.log(error)
      }



    },
    // 保存按钮
    async save() {

      if (!this.setProfile && !this.aboutModify && !this.socialModify && !this.jobModify || !this.skillModify) return

      const saveProfile = async () => {
        if (!this.setProfile) return

        this.checkSaveParams()

        const requestData = {
          nickname: this.username,
          introduction: this.introduction
        }
        if (this.username === (this.userData.nickname || this.userData.username)) delete requestData.nickname
        if (this.introduction === this.userData.introduction) delete requestData.introduction

        await this.$backendAPI.setProfile(requestData)

        this.setProfile = false
      }
      const saveLinks = async () => {
        if (!this.aboutModify && !this.socialModify) return

        const requestData = {
          websites: this.about.filter(Boolean),
          socialAccounts: (() => {
            const nSocial = {}
            this.social.forEach(item => {
              if (item.value && item.value !== '') {
                nSocial[item.type] = item.value
              }
            })
            return nSocial
          })()
        }

        await this.$backendAPI.setUserLinks(requestData)

        this.aboutModify = false
        this.socialModify = false
      }
      
      // 保存身份
      const saveJobs = async () => {
        if (!this.jobModify) return
        
        // 筛选
        const filterData = data => data.filter(i => i.checked)
        // 格式化数据
        const format = data => {
          if (!data || !data.length) return []
          return data.map(i => ({
            jid: i.id,
            value: 1, // 默认
          })
          )
        }

        const data = {
          creates: this.$utils.compose(format, filterData)(this.job)
        }

        await this.$API.daoUserJob(data)

        this.jobModify = false
      }

      // 保存技能
      const saveSkills = async () => {
        if (!this.skillModify) return
        
        // 筛选
        const filterData = data => data.filter(i => i.checked)
        // 格式化数据
        const format = data => {
          if (!data || !data.length) return []
          return data.map(i => ({
            sid: i.id,
            value: i.value, // 默认
          })
          )
        }

        const data = {
          creates: this.$utils.compose(format, filterData)(this.skill)
        }

        await this.$API.daoUserSkill(data)

        this.skillModify = false
      }

      this.loading = true
      try {
        await Promise.all([saveProfile(), saveLinks(), saveJobs(), saveSkills()])

        this.refreshUser({ id: this.currentUserInfo.id })
        this.getMyUserData()
        this.$message({
          message: this.$t('success.success'),
          type: 'success'
        })
      } catch (error) {
        if (typeof error === 'string') {
          this.$message.error(error)
        } else if (error.response && error.response.data) {
          this.$message.error(error.response.data.message)
        } else {
          console.error(`change user info failed, catch error ${error}`)
          this.$message.error(this.$t('error.fail'))
        }
      } finally {
        this.loading = false
      }
    },
    aboutAdd() {
      if (this.about.length >= 5) return
      this.about.push('')
    },
    abountLess(i) {
      if (this.about.length <= 1) return
      this.about.splice(i, 1)
    },
    // 技能数字改变
    skillChange(i) {
      let val = this.skill[i].value
      if (parseInt(val)) {
        if (val > 100) {
          this.skill[i].value = 100
        } else if (val < 1) {
          this.skill[i].value = 1
        } else {
          console.log(this.skill[i].value)
        }
      } else {
        this.skill[i].value = 1
      }
      
    }
  }
}
</script>

<style lang="less" scoped>
.info-main {
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  margin-bottom: 120px;
  background-color: #122d5e;
}
.account-main {
  background-color: #122d5e;
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
  color: white;
}
.margin100 {
  margin: 100px 0;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #eee;
}
.list {
  margin: 20px 0;
  padding: 0;
  display: flex;
  &.center {
    align-items: center;
  }
}
.title {
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  line-height: 28px;
  min-width: 50px;
  &.right0 {
    margin-right: 0;
  }
}
.title-note {
  font-size: 12px;
  font-weight: 400;
  color: #eaeaea;
  line-height: 28px;
}

@avatarWidth: 90px;
.avatar {
  width: @avatarWidth;
  height: @avatarWidth;
  border-radius: 50%;
  background: #eee;
  overflow: hidden;
  cursor: pointer;
  .user-avatar {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .user-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
  &:hover .edit {
    display: flex;
  }
  .edit {
    display: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    color: #eee;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    .el-icon-camera {
      font-size: 24px;
      margin-bottom: 4px;
      color: #eee;
    }
  }
}
.icon-avatar {
  width: @avatarWidth;
  height: @avatarWidth;
  color: #bbb;
}
.input {
  width: 400px;
}
.save {
  display: block;
  width: 200px;
  height: 40px;
  border-radius: @borderRadius6;
  border: none;
  outline: none;
  color: #fff;
  margin: 20px auto 0;
  background-color: #bfbfbf;
  cursor: pointer;
  &.active {
    background: @purpleDark;
  }
}

.social-title {
  padding: 0;
  margin: 12px 0 10px 60px;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  line-height: 20px;
}
.social-icons {
  width: 60px;
}
.social-input {
  width: 340px;
}
.social-div {
  margin: 20px 0;
}
.about-input {
  margin: 0 0 10px;
  .input {
    width: 400px;
  }
}
.about-input-btn {
  width: 24px;
  height: 24px;
  background-color: @purpleDark;
  color: @white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
}
.set-main {
  padding-left: 10px;
}
.tag-title {
  font-weight: bold;
  font-size: 20px;
  padding-left: 10px;
  margin: 0;
  color: #fff;
}

// job
// skill

.job,
.skill {
  p {
    color: #fff;
    padding: 0;
    margin: 10px 0;
    font-size: 16px;
  }
  &::after {
    display: block;
    content: "";
    width: 0;
    height: 0;
    clear: both;
  }
}

.job-checkbox,
.skill-checkbox {
  float: left;
  margin: 0 20px 10px 0;
  height: 28px;
  display: flex;
  align-items: center;
}
</style>


<style lang="less">
.social-title {
  span {
    span {
      color: red;
    }
  }
}

.setting-page {
  .customize {
    .el-input .el-input__inner {
      background-color: transparent;
      border-top: none;
      border-left: none;
      border-right: none;
      border-radius: 0;
      color: #fff;
      &::placeholder {
        color: #b4b4b4;
      }
    }
    .el-input .el-input__count .el-input__count-inner {
      background-color: transparent;
    }
    .el-textarea__inner {
      background-color: transparent;
      color: #fff;
      &::placeholder {
        color: #b4b4b4;
      }
    }

    .el-textarea .el-input__count {
      color: #909399;
      background: transparent;
    }
    .el-checkbox__label,
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #fff;
    }

    .skill-number .el-input__inner {
      padding: 0 4px;
      margin: 0;
      border: none;
      background-color: transparent;
      border-bottom: 1px solid #dbdbdb;
      color: #dbdbdb;
      font-size: 16px;
      box-sizing: border-box;
      outline: none;
      height: 24px;
      line-height: 24px;
      &::-webkit-input-placeholder {
        color: #b2b2b2;
      }
    }
  }
}

.item {
  display: flex;
  &-label {
    display: block;
    width: 100px;
    flex: 0 0 100px;
    margin-right: 10px;
  }
}
</style>