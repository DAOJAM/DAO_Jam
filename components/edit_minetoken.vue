<template>
  <div class="minetoken-page">
    <div class="fl ac coins-head">
      <h2 class="tag-title">
        {{ isPost ? $t('user.issuecoins') : $t('user.editcoins') }}
      </h2>
    </div>

    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      class="input-form"
      label-width="200px"
    >
      <el-form-item
        label="Project Name"
        prop="name"
        class="customize"
      >
        <el-input
          v-if="isPost"
          v-model="form.name"
          class="input"
          placeholder="Please input project Name"
        />
        <span v-else style="color: #fff;">{{ form.name }}</span>
      </el-form-item>


      <el-form-item
        label="One Sentence Pitch"
        prop="brief"
        class="customize"
      >
        <el-input
          v-if="isPost"
          v-model="form.brief"
          class="input"
          maxlength="50"
          placeholder="Please input one Sentence Pitch"
        />
        <span v-else style="color: #fff;">{{ form.brief }}</span>
      </el-form-item>
      <el-form-item
        label="Logo"
        prop="logo"
        class="customize"
      >
        <el-input
          v-model="form.logo"
          style="display: none;"
          class="input"
        />
        <img-upload
          v-show="!coinsCover"
          :img-upload-done="imgUploadDone"
          update-type="coins"
          class="coins-upload-content"
          @doneImageUpload="doneImageUpload"
        >
          <div
            slot="uploadButton"
            class="coins-upload"
          >
            <i class="el-icon-plus add" />
          </div>
        </img-upload>
        <div
          v-show="coinsCover"
          class="coina-cover"
        >
          <el-image
            :src="coinsCover"
            fit="cover"
            class="tokens-image"
          />
          <div
            class="cover-full"
            @click="form.logo = ''"
          >
            <i class="el-icon-delete remove" />
          </div>
        </div>
      </el-form-item>


      <el-form-item
        label="Cover Photo"
        prop="cover"
        class="customize"
      >
        <div class="cover">
          <div
            v-show="!form.cover"
            class="cover-upload"
            @click="coverUpload('coinsCover')"
          >
            <i class="el-icon-plus add" />
          </div>
          <div
            v-show="form.cover"
            class="cover-cover"
          >
            <el-image
              :src="coverSrc"
              fit="cover"
              class="tokens-image"
            />
            <div
              class="cover-full"
              @click="form.cover = ''"
            >
              <i class="el-icon-delete remove" />
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item
        label="Summary"
        prop=""
        class="customize"
      >
        <el-input
          v-model="form.introduction"
          :rows="6"
          class="input"
          type="textarea"
          maxlength="500"
          show-word-limit
          placeholder="Please input Summary"
        />
      </el-form-item>

      <el-form-item
        label="Github Repo"
        prop="repo"
        class="customize"
      >
        <el-input
          v-model="form.repo"
          placeholder="Please input github repo"
        />
      </el-form-item>

      <el-form-item
        label="Milestone"
        prop=""
        class="customize"
      >
        <div class="milestone">
          <div v-for="(item, index) in milestoneList" :key="index" class="fl ac">
            <el-input v-model="item.label" />
            <el-checkbox v-model="item.status" class="milestone-checkbox" />
            <svg-icon icon-class="close" class="milestone-close" @click="milestoneList.splice(index, 1)" />
          </div>
          <el-button type="primary" size="small" @click="milestoneList.push({label: '', status: false})">
            Add
          </el-button>
          <el-button type="primary" size="small" @click="postMinetokenMilestones">
            Save
          </el-button>
        </div>
      </el-form-item>

      <el-form-item
        v-if="!isPost"
        label="Team Member"
        prop=""
        class="project"
      >
        <tokenTeam :token-id="tokenId" />
      </el-form-item>

      <el-form-item
        label="Website"
        prop=""
        class="customize"
      >
        <div
          v-for="(item, index) in about"
          :key="index"
          class="fl ac about-input"
        >
          <el-input
            v-model="about[index]"
            class="input"
            placeholder="Please fill in the website link, including http(s)://"
          />
          <!-- <div v-if="index === 0" class="about-input-btn" @click="aboutAdd">
            <i class="el-icon-plus" />
          </div> -->

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
      </el-form-item>

      <el-form-item
        label="Social"
        prop=""
        class="customize"
      >
        <div
          v-for="(item, index) in social"
          :key="index"
        >
          <p class="social-title">
            {{ item.name }}
            <span v-html="item.tooltip" />
          </p>
          <div class="fl">
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
      </el-form-item>

      <el-form-item
        label="Project Images"
        prop=""
        class="customize"
      >
        <ul class="gallery-list">
          <li v-for="(item, index) in projectImageListUpload" :key="index">
            <div>
              <div class="gallery-list-cover">
                <img v-if="item.url" :src="projectImage(item.url)" alt="image">
              </div>
              <div>
                <el-button type="primary" size="small" @click="coverUploadImages(index+'')">
                  Upload
                </el-button>
              </div>
              <div>
                <el-button type="primary" size="small" @click="delProjectImage(index)">
                  Delete
                </el-button>
              </div>
            </div>
          </li>
        </ul>
      </el-form-item>

      <el-form-item
        style="margin:40px 0 0 0;"
        class="customize"
      >
        <el-checkbox
          v-if="isPost"
          v-model="form.agree"
        >
          I declare that the project will be issued voluntarily by me, and I shall bear all legal responsibilities
        </el-checkbox>
        <el-button
          :disabled="!form.agree"
          type="primary"
          class="publish-btn"
          @click="submitForm('form')"
        >
          {{ isPost ? 'Submit' : 'Save' }}
        </el-button>
        <!-- <p
          v-if="isPost"
          class="tips"
        >
          The process of creating a project requires a chain, please be patient.
        </p> -->
      </el-form-item>
    </el-form>

    <!-- <template v-if="!isPost">
      <div class="progress">
        <h2 class="progress-title">
          Project progress
        </h2>
        <userLive :token-id="tokenId" />
        <userProgress :token-id="tokenId" />
      </div>
    </template> -->
    <imgUploads
      :open="imgUploadConfig.open"
      :update-type="imgUploadConfig.type"
      :view-width="imgUploadConfig.viewWidth"
      :view-height="imgUploadConfig.viewHeight"
      :aspect-ratio="imgUploadConfig.aspectRatio"
      @done="done"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import imgUpload from '@/components/imgUpload/index.vue'
import imgUploads from '@/components/img_upload'
import { precision, toPrecision } from '@/utils/precisionConversion'
import { getCookie } from '@/utils/cookie'
import socialIcon from '@/components/social_icon/index.vue'
import socialTypes from '@/config/social_types'
import tokenTeam from '@/components/user/token_team'
export default {
  components: {
    imgUpload,
    imgUploads,
    socialIcon,
    tokenTeam
  },
  data() {
    return {
      tokenId: -1,
      form: {
        name: '',
        symbol: '',
        number: '',
        logo: '',
        brief: '',
        introduction: '',
        cover: '',
        repo: '',
        agree: false
      },
      rules: {
        name: [
          { required: true, message: 'Please input project name', trigger: 'blur' },
          { min: 1, max: 10, message: 'Name Length: 1 ~ 10 characters', trigger: ['blur', 'change'] }
        ],
        logo: [
          { required: true, message: 'Please upload logo' }
        ],
        cover: { required: true, message: 'Please upload cover' },
        brief: [
          { required: true, message: 'Please input summary', trigger: 'blur' },
          { min: 1, max: 100, message: 'Summary Length: 1 ~ 100 characters', trigger: ['blur', 'change'] }
        ],
        repo: [
          { type: 'url', message: 'Please enter the correct url', trigger: ['blur', 'change'] }
        ]
      },
      imgUploadDone: 0, // 图片是否上传完成
      about: [''],
      social: [
        {
          symbol: 'Wechat',
          icon: 'wechat',
          name: 'Wechat: ',
          tooltip: '',
          placeholder: 'WeChat account',
          url: '',
          value: ''
        },
        {
          symbol: 'Weibo',
          icon: 'weibo1',
          name: 'Weibo: ',
          tooltip: '(https://www.weibo.com/<span>account</span>)',
          placeholder: 'Weibo username (no full URL required)',
          url: 'https://www.weibo.com',
          value: ''
        },
        {
          symbol: 'Telegram',
          icon: 'tg',
          name: 'Telegram: ',
          tooltip: '',
          placeholder: 'Telegram username',
          url: '',
          value: ''
        },
        {
          symbol: 'Twitter',
          icon: 'twitter1',
          name: 'Twitter: ',
          tooltip: '(https://twitter.com/<span>account</span>)',
          placeholder: 'Twitter username (no full URL required)',
          url: 'https://twitter.com',
          value: ''
        },
        {
          symbol: 'Github',
          icon: 'github1',
          name: 'Github: ',
          tooltip: '(https://github.com/<span>account</span>)',
          placeholder: 'Github username (no full URL required)',
          url: 'https://github.com',
          value: ''
          // resourcesSocialss: [],
          // resourcesWebsites: [],
        }
      ],
      tokenDetailData: {},
      addToLoading: false,
      cover: '', // 封面
      imgUploadConfig: { // 图片上传配置
        open: 0,
        type: '',
        viewWidth: '240px',
        viewHeight: '240px',
        aspectRatio: 1 / 1
      },
      searchUserDialog: false, // 添加队员
      isPost: true,
      milestoneList: [], // 里程碑
      projectImageListUpload: [
        {url: ''},
        {url: ''},
        {url: ''},
        {url: ''},
        {url: ''},
      ], // 项目图片
    }
  },
  computed: {
    ...mapGetters(['isLogined']),
    totalAmount() {
      if (this.tokenDetailData.token) {
        const tokenamount = precision(this.tokenDetailData.token.total_supply, 'CNY', this.tokenDetailData.token.decimals)
        return this.$publishMethods.formatDecimal(tokenamount, 4)
      } else return 0
    },
    coinsCover() {
      return this.form.logo ? this.$ossProcess(this.form.logo) : ''
    },
    coverSrc() {
      return this.form.cover ? this.$ossProcess(this.form.cover) : ''
    }
  },
  created() {
  },
  mounted() {
    if (!getCookie('ACCESS_TOKEN')) return this.$router.go(-1)
    this.tokenDetail()

    if (!this.isPost) this.form.agree = true
  },
  methods: {
    getWebsitesAndSocials() {
      const aboutArray = this.about.filter(i => i)
      const socialFilter = this.social.filter(i => socialTypes.includes(i.symbol))
      const socialArray = socialFilter.map(i => {
        return {
          type: i.symbol,
          content: i.value
        }
      })

      const data = {
        websites: aboutArray,
        socials: socialArray
      }
      return data
    },
    async createOnNear() {
      // Detect if you have NEAR bind
      const { data } = await this.$API.getKycStatus()
      if (!data.verified) {
        // 提示用户去绑定 Near 钱包，这样才有 account 可以操作
        this.$alert('DAOJam was built on NEAR protocol, you will need to bind your NEAR wallet with us',
          'Almost there, just missing NEAR wallet binding', {
            confirmButtonText: 'Go to bind my NEAR Wallet',
            callback: () => {
              this.$router.push('/setting/account')
            }
          })
        return // End of exec
      }
      const loading = this.$loading({
        text: 'Creating on near...'
      })
      try {
        const expireTime = 30 * 24 * 60 * 60  // 30 days
        const result = await window.unpackContract.create_proposal({
          name: this.form.name, description: this.form.brief, expiration_time: expireTime
        })
        const loading = this.$loading({
          text: 'Sync data...'
        })
        const value = Buffer.from(result.status.SuccessValue, 'base64').toString()
        const id = JSON.parse(value)
        const txHash = result.transaction.hash
        const blockHash = result.transaction_outcome.block_hash
        const { logo, introduction, cover, repo } = this.form
        const { websites, socials } = this.getWebsitesAndSocials()
        const data = {
          id,
          txHash,
          blockHash,
          introduction,
          logo,
          cover,
          repo,
          websites,
          socials
        }
        const res = await this.$API.createProposal(data)
        console.log('createProposal', res)
        loading.close()
        this.$notify.success({
          title: 'Tips',
          message: 'Created successfully'
        })
        this.$router.push({ name: 'daos-id', params:{ id: res.data }})
      } catch (error) {
        console.error(error)
        loading.close()
        if (error.type === 'ActionError::FunctionCallError') {
          this.$notify.error({
            title: 'Error happened in the transaction',
            message: error.message
          })
        } else {
          this.$notify.error({
            title: 'Error happened - ' + error.type,
            message: error.message
          })
        }
      }
    },
    async tokenDetail() {
      await this.$API.tokenDetail().then(res => {
        if (res.code === 0) {
          this.isPost = false
          if (res.data.token) {
            const { token } = res.data
            this.form.name = token.name
            this.form.symbol = token.symbol
            this.form.logo = token.logo
            this.form.brief = token.brief
            this.form.introduction = token.introduction
            this.form.cover = token.cover
            this.form.repo = token.repo
            this.tokenId = token.id
            this.tokenDetailData = res.data

            this.minetokenGetResources(token.id)
            this.getMinetokenMilestones(token.id)
            this.getMinetokenImages(token.id)
          }
          //else this.$router.push({ name: 'tokens-apply' })
        } else {
          this.isPost = true
          // this.$message.error(res.message)
        }
      })
    },
    async minetokenTokenId(id) {
      const { name, logo, brief, introduction, cover, repo } = this.form
      const data = {
        name: name,
        brief: brief,
        introduction,
        logo: logo,
        cover: cover,
        repo: repo,
      }
      const res = await this.$API.minetokenTokenId(data, id)
      if (res.code === 0) return res.message
      else throw res.message
    },
    async minetokenResources(id) {
      const aboutArray = this.about.filter(i => i)
      const socialFilter = this.social.filter(i => socialTypes.includes(i.symbol))
      const socialArray = socialFilter.map(i => {
        return {
          type: i.symbol,
          content: i.value
        }
      })

      const data = {
        websites: aboutArray,
        socials: socialArray
      }
      const res = await this.$API.minetokenResources(data, id)
      if (res.code === 0) return res.message
      else throw res.message
    },
    async minetokenCreate() {
      const { name, symbol, logo, brief, introduction, number, cover, repo } = this.form
      const data = {
        name: name,
        symbol: symbol,
        decimals: 4,
        brief: brief,
        introduction,
        logo: logo,
        cover: cover,
        repo: repo,
        initialSupply: toPrecision(number, 'CNY') + '' // to string type
      }
      await this.$API.minetokenCreate(data)
        .then(res => {
          if (res.code === 0) this.minetokenDone(res.data)
          else this.$message.error(res.message)
        })
    },
    async minetokenGetResources(id) {
      await this.$API.minetokenGetResources(id).then(res => {
        if (res.code === 0) {
          const socialFilter = res.data.socials.filter(i => socialTypes.includes(i.type)) // 过滤
          const socialFilterEmpty = socialFilter.filter(i => i.content) // 过滤
          // this.resourcesSocialss = socialFilterEmpty

          socialFilterEmpty.map(i => {
            const index = this.social.findIndex(j => j.symbol === i.type)
            // ~ 运算符 用于判断index 为 -1的情况 如果index为-1 ~index 等于 0
            if (~index) this.social[index].value = i.content
          })
          // this.resourcesWebsites = res.data.websites
          this.about = res.data.websites.length > 0 ? res.data.websites : ['']
        } else {
          this.$message.success(res.message)
        }
      })
        .catch(err => {
          console.log(err)
        })
    },
    minetokenDone(data) {
      Promise.all([this.minetokenResources(data)])
        .then(values => {
          // console.log(values)
          this.$message.success(values[0])
          this.$router.push({
            name: 'minetoken'
          })
        }).catch(err => {
          this.$message.error(err)
          console.log(err)
        })
    },
    minetokenEdit(id) {
      Promise.all([this.minetokenTokenId(id), this.minetokenResources(id)])
        .then(values => {
          // console.log(values)
          this.$message.success(values[0])
        }).catch(err => {
          this.$message.error(err)
          console.log(err)
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isPost) {
            this.createOnNear()
            // await this.minetokenCreate()
          } else this.minetokenEdit(this.tokenId)
        } else return false
      })
    },
    // Complete upload
    doneImageUpload(res) {
      this.form.logo = res.data.data.cover
      this.imgUploadDone += Date.now()
    },
    aboutAdd() {
      if (this.about.length >= 5) return
      this.about.push('')
    },
    abountLess(i) {
      if (this.about.length <= 1) return
      this.about.splice(i, 1)
    },
    // 图片上传完成
    done(data) {
      if (data.type === 'coinsCover') {
        this.form.cover = data.data.cover
      } else {
        // project image data type是数字索引
        this.projectImageListUpload[Number(data.type)].url = data.data.cover
        this.postMinetokenImages()
      }
    },
    // 项目图片上传
    async postMinetokenImages() {
      let list = []
      for (let i = 0; i < this.projectImageListUpload.length; i++) {
        try {
          if (this.projectImageListUpload[i].url) {
            list.push(this.projectImageListUpload[i].url)
          }
        } catch (e) {
          console.log(e)
        }
      }
      await this.$API.postMinetokenImages(this.tokenId, {
        images: list
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 项目图片
    async getMinetokenImages(id) {
      await this.$API.getMinetokenImages(id).then(res => {
        this.projectImageListUpload = res.data.map(item => ({url: item.url}))
        const len = this.projectImageListUpload.length
        if (len < 5) {
          for (let i = 1; i <= 5 - len; i++) {
            this.projectImageListUpload.push({url: ''})
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除图片
    delProjectImage(i) {
      this.projectImageListUpload[i].url = ''
      this.postMinetokenImages()
    },
    projectImage(src) {
      return src ? this.$ossProcess(src, { h: 200 }) : ''
    },
    coverUpload(type) {
      this.imgUploadConfig.viewWidth =  440 * 0.8 + 'px'
      this.imgUploadConfig.viewHeight = 124 * 0.8 + 'px'
      this.imgUploadConfig.type = type
      this.imgUploadConfig.aspectRatio = 440 / 124
      this.imgUploadConfig.open++
    },
    coverUploadImages(type) {
      this.imgUploadConfig.viewWidth =  200 + 'px'
      this.imgUploadConfig.viewHeight = 124 + 'px'
      this.imgUploadConfig.type = type
      this.imgUploadConfig.aspectRatio = 200 / 124
      this.imgUploadConfig.open++
    },
    removeProjectPeople(i) {
      this.$confirm('Delete team members?', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Concel',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: `Successfully deleted!!${i}`
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Undeleted'
        })          
      })
    },
    // 里程碑设置
    async getMinetokenMilestones(id) {
      await this.$API.gettMinetokenMilestones(id).then(res => {
        let list = res.data.slice(0)
        list.map(item => {
          item.status = !!item.status
        })
        this.milestoneList = list
        console.log(this.milestoneList)
      }).catch(e => {
        console.log(e)
      })
    },
    async postMinetokenMilestones() {
      const milestoneList = this.milestoneList
      let list = []
      for (let i = 0; i < milestoneList.length; i++) {
        let item = { ...milestoneList[i] }
        item.status = item.status ? 1 : 0
        list.push(item)
      }
      await this.$API.postMinetokenMilestones(this.tokenId, {
        milestones: list
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
.coins-head {
  h1 {
    font-size: 24px;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
    line-height: 33px;
    padding: 0;
    margin: 0;
  }
  .help-icon {
    color: rgba(219, 219, 219, 1);
    margin-left: 10px;
    margin-right: 10px;
  }
  .help-link {
    font-size: 14px;
    color: #eaeaea;
    line-height: 20px;
    text-decoration: underline;
    margin-left: 10px;
  }

  .click-box {
    flex: 1;
    text-align: right;
    padding-right: 10px;
  }
}
.coina-cover {
  width: 90px;
  height: 90px;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  box-sizing: border-box;
  background: #ececec;
  border: 1px solid #ececec;
  &:hover .cover-full {
    display: flex;
  }
  .cover-full {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    // display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    display: none;
    .remove {
      font-size: 26px;
      color: #fff;
    }
  }
}
.coins-upload-content {
  width: 90px;
  height: 90px;
  overflow: hidden;
}
.coins-upload {
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  .add {
    font-size: 26px;
    color: #8c939d;
  }
}
.input-form {
  margin-top: 30px;
  .input {
    width: 400px;
  }
  .social-input {
    width: 340px;
  }
}
.publish-btn {
  display: block;
  width: 200px;
  margin-bottom: 50px;
  background: darkcyan;
  border-color: darkcyan;
}

.tokens-image {
  width: 100%;
  height: 100%;
}
.about-input {
  margin: 0 0 10px;
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
  margin: 0 0 0 10px;
  cursor: pointer;
  &.add {
    margin-left: 0;
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
.tag-title {
  font-weight: bold;
  font-size: 20px;
  padding-left: 10px;
  margin: 0;
  color: #fff;
}
.tips {
  padding: 0;
  margin: 10px 0 0 0;
  line-height: 1.5;
  color: #fff;
  font-size: 14px;
}

.cover {
  width: 440px;
  height: 124px;
  border: 1px solid #eaeaea;
}

.cover-upload {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  .add {
    font-size: 26px;
    color: #8c939d;
  }
}

.cover-cover {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid #ececec;
  &:hover .cover-full {
    display: flex;
  }
  .cover-full {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    // display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    display: none;
    .remove {
      font-size: 26px;
      color: #fff;
    }
  }
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

.milestone {
  width: 90%;
  max-width: 400px;
  &-checkbox {
    margin-left: 10px;
  }
  &-close {
    margin-left: 10px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
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

<style lang="less">
.social-title span span {
  color: red;
}

.minetoken-page {
  .customize {
    .el-form-item__label {
      color: #fff;
    }
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

    .el-checkbox {
      color: #fff;
    }
  }
  .project {
    & > .el-form-item__label {
      color: #fff;
    }
  }
}
</style>
