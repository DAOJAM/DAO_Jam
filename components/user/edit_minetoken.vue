<template>
  <div class="minetoken-page">
    <div class="fl ac coins-head">
      <h2 class="tag-title">
        {{ isPost ? $t('user.issuecoins') : $t('user.editcoins') }}
      </h2>
      <!-- <el-tooltip v-if="isPost" effect="dark" content="如何发行Fan票?" placement="top-start">
        <svg-icon
          class="help-icon"
          icon-class="help"
        />
      </el-tooltip> -->

      <a
        class="help-link"
        target="_blank"
        href="https://www.matataki.io/p/977"
      >什么是Fan票?</a>
      &nbsp;
      <a
        class="help-link"
        target="_blank"
        href="https://www.matataki.io/p/980"
      >如何发行Fan票?</a>

      <div
        v-if="!isPost"
        class="click-box"
      >
        <router-link :to="{name: 'token-id', params: { id: tokenId || 0}}">
          <el-button size="small">
            详情
          </el-button>
        </router-link>
        <el-button
          :loading="addToLoading"
          size="small"
          @click="addCoins"
        >
          增发
        </el-button>
        <router-link :to="{name: 'exchange', hash: '#swap', query: { output: form.symbol }}">
          <el-button
            size="small"
            type="primary"
          >
            交易
          </el-button>
        </router-link>
      </div>
    </div>

    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      class="input-form customize"
      label-width="80px"
    >
      <el-form-item
        label="名称"
        prop="name"
      >
        <el-input
          v-model="form.name"
          class="input"
          placeholder="请输入Fan票名称"
        />
      </el-form-item>

      <el-form-item
        label="缩写"
        prop="symbol"
      >
        <el-input
          v-model="form.symbol"
          :disabled="!isPost"
          class="input"
          placeholder="请输入Fan票缩写(发行后不可修改)"
        />
      </el-form-item>
      <el-form-item
        label="图标"
        prop="logo"
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
      <!-- 编辑页面不需要显示 -->
      <el-form-item
        v-if="isPost"
        label="发行数量"
        prop="number"
      >
        <el-input
          v-model="form.number"
          class="input"
          placeholder="请输入首次发行数量(最多发行1亿)"
        />
      </el-form-item>

      <el-form-item
        label="简介"
        prop="brief"
      >
        <el-input
          v-model="form.brief"
          class="input"
          maxlength="50"
          placeholder="简介"
        />
      </el-form-item>
      <el-form-item
        label="介绍"
        prop=""
      >
        <el-input
          v-model="form.introduction"
          :rows="6"
          class="input"
          type="textarea"
          maxlength="500"
          show-word-limit
          placeholder="介绍"
        />
      </el-form-item>

      <el-form-item
        label="封面"
        prop=""
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
        label="项目REPO"
        prop=""
      >
        <el-input
          v-model="repo"
          placeholder="项目REPO地址(Github)"
        />
      </el-form-item>

      <el-form-item
        label="项目成员"
        prop=""
      >
        <div>
          <div class="project-people">
            <div
              v-for="item in 10"
              :key="item"
              class="project-people__block"
            >
              <cAvatar />
              <p>xiaotianxiaotian</p>
              <svg-icon
                icon-class="close"
                class="icon-close"
                @click="removeProjectPeople(item)"
              />
            </div>
          </div>
          <el-button
            class="project-btn"
            type="primary"
            size="small"
            @click="addProjectPeopleDialog = true"
          >
            邀请队员
          </el-button>
          <p class="project-text">
            队员加入48h后不能变动
          </p>
        </div>
      </el-form-item>

      <el-form-item
        label="相关网站"
        prop=""
      >
        <div
          v-for="(item, index) in about"
          :key="index"
          class="fl ac about-input"
        >
          <el-input
            v-model="about[index]"
            class="input"
            placeholder="请填写网站链接，包含http(s)://"
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
        label="社交帐号"
        prop=""
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
        style="margin:40px 0 0 0;"
        class="customize"
      >
        <el-checkbox
          v-if="isPost"
          v-model="form.agree"
        >
          我声明Fan票为本人自愿发行，由本人承担一切法律责任
        </el-checkbox>
        <el-button
          :disabled="!form.agree"
          type="primary"
          class="publish-btn"
          @click="submitForm('form')"
        >
          {{ isPost ? '发行Fan票' : '保存' }}
        </el-button>
        <p
          v-if="isPost"
          class="tips"
        >
          创建Fan票过程需要上链，请耐心等候。
        </p>
      </el-form-item>
    </el-form>

    <template v-if="!isPost">
      <div class="progress customize">
        <h2 class="progress-title">
          Project progress
        </h2>

        <h3 class="progress-title">
          Live
        </h3>
        <ul class="live-list">
          <li
            v-for="item in 10"
            :key="item"
          >
            <a
              href="https://www.douyu.com/room/share/288016"
              target="_blank"
            >LPL春季赛OMGvsRW - https://www.douyu.com/room/share/288016</a>
            <svg-icon icon-class="close" />
          </li>
        </ul>

        <div class="progress-input">
          <el-input
            v-model="liveName"
            size="small"
            placeholder="请输入直播昵称"
            class="progress-name"
          />
          <el-input
            v-model="liveAddress"
            size="small"
            placeholder="请输入直播地址"
            class="progress-address"
          />
          <svg-icon
            icon-class="add"
            class="icon"
          />
        </div>

        <h3 class="progress-title">
          Progress
        </h3>
        <ul class="progress-list">
          <li
            v-for="item in 10"
            :key="item"
          >
            LPL春季赛OMGvsRW
            <svg-icon icon-class="close" />
          </li>
        </ul>

        <div class="progress-input">
          <el-input
            v-model="dynamicTitle"
            size="small"
            placeholder="请输入动态标题"
            class="progress-name"
          />
          <div>
            <el-input
              v-model="dynamicContent"
              class="progress-address"
              size="small"
              type="textarea"
              :rows="4"
              placeholder="请输入动态内容"
            />
            <svg-icon
              icon-class="add"
              class="icon"
            />
          </div>
        </div>
      </div>
    </template>
    <imgUploads
      :open="imgUploadConfig.open"
      :update-type="imgUploadConfig.type"
      :view-width="imgUploadConfig.viewWidth"
      :view-height="imgUploadConfig.viewHeight"
      :aspect-ratio="imgUploadConfig.aspectRatio"
      @done="done"
    />

    <addProjectPeople 
      v-model="addProjectPeopleDialog"
      :article-id="Number(1)"
      from="share"
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
import cAvatar from '@/common/components/avatar'
import addProjectPeople from '@/components/add_project_people/index.vue'

export default {
  components: {
    imgUpload,
    imgUploads,
    socialIcon,
    cAvatar,
    addProjectPeople
  },
  data() {
    const checkSymbol = (rule, value, callback) => {
      const reg = /^[A-Z]+$/
      const res = reg.test(this.form.symbol)
      if (!res) {
        callback(new Error('Fan票缩写仅限大写英文字符'))
      } else {
        callback()
      }
    }
    return {
      tokenId: null,
      form: {
        name: '',
        symbol: '',
        number: '',
        logo: '',
        brief: '',
        introduction: '',
        cover: '',
        agree: false
      },
      rules: {
        name: [
          { required: true, message: '请输入Fan票名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: ['blur', 'change'] }
        ],
        // 编辑页面不需要校验
        symbol: [
          { required: true, message: '请输入Fan票缩写', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: ['blur', 'change'] },
          { validator: checkSymbol, trigger: ['blur', 'change'] }
        ],
        logo: [
          { required: true, message: '请输上传图标' }
        ],
        // 编辑页面不需要校验
        number: [
          { required: true, message: '请输入首次发行数量', trigger: 'blur' },
          { min: 1, max: 9, message: '首次发行数量一亿', trigger: ['blur', 'change'] }
        ],
        brief: [
          { required: true, message: '请输入简介', trigger: 'blur' },
          { min: 1, max: 100, message: '简介最多100字', trigger: ['blur', 'change'] }
        ]
      },
      imgUploadDone: 0, // 图片是否上传完成
      about: [''],
      social: [
        {
          symbol: 'QQ',
          icon: 'qq1',
          name: 'QQ：',
          tooltip: '',
          placeholder: 'QQ帐号',
          url: '',
          value: ''
        },
        {
          symbol: 'Wechat',
          icon: 'wechat',
          name: '微信：',
          tooltip: '',
          placeholder: '微信号',
          url: '',
          value: ''
        },
        {
          symbol: 'Weibo',
          icon: 'weibo1',
          name: '微博：',
          tooltip: '(https://www.weibo.com/<span>帐号</span>)',
          placeholder: '微博用户名(不需要完整URL)',
          url: 'https://www.weibo.com',
          value: ''
        },
        {
          symbol: 'Telegram',
          icon: 'tg',
          name: 'Telegram：',
          tooltip: '',
          placeholder: 'Telegram用户名',
          url: '',
          value: ''
        },
        {
          symbol: 'Twitter',
          icon: 'twitter1',
          name: 'Twitter：',
          tooltip: '(https://twitter.com/<span>帐号</span>)',
          placeholder: 'Twitter用户名(不需要完整URL)',
          url: 'https://twitter.com',
          value: ''
        },
        {
          symbol: 'Facebook',
          icon: 'fb',
          name: 'Facebook：',
          tooltip: '(https://facebook.com/<span>帐号</span>)',
          placeholder: 'Facebook用户名(不需要完整URL)',
          url: 'https://facebook.com',
          value: ''
        },
        {
          symbol: 'Github',
          icon: 'github1',
          name: 'Github：',
          tooltip: '(https://github.com/<span>帐号</span>)',
          placeholder: 'Github用户名(不需要完整URL)',
          url: 'https://github.com',
          value: ''
          // resourcesSocialss: [],
          // resourcesWebsites: [],
        }
      ],
      tokenDetailData: {},
      addToLoading: false,
      liveName: '', // live
      liveAddress: '', // live
      dynamicTitle: '', // 动态
      dynamicContent: '', // 动态
      cover: '', // 封面
      imgUploadConfig: { // 图片上传配置
        open: 0,
        type: '',
        viewWidth: '240px',
        viewHeight: '240px',
        aspectRatio: 1 / 1
      },
      repo: '',
      addProjectPeopleDialog: false, // 添加队员
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
    },
    isPost() {
      return this.$route.name === 'postminetoken'
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
    async tokenDetail() {
      await this.$API.tokenDetail().then(res => {
        if (res.code === 0) {
          if (res.data.token) {
            if (this.isPost) {
              this.$router.push({
                name: 'editminetoken'
              })
            } else {
              const { token } = res.data
              this.form.name = token.name
              this.form.symbol = token.symbol
              this.form.logo = token.logo
              this.form.brief = token.brief
              this.form.introduction = token.introduction
              this.form.cover = token.cover
              this.tokenId = token.id
              this.tokenDetailData = res.data

              this.minetokenGetResources(token.id)
            }
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    async minetokenTokenId(id) {
      const { name, logo, brief, introduction, cover } = this.form
      const data = {
        name: name,
        brief: brief,
        introduction,
        logo: logo,
        cover: cover,
      }
      const res = await this.$API.minetokenTokenId(data, id)
      if (res.code === 0) return res.message
      else throw res.message
    },
    // 初始发fan票不需要调用mint接口
    async minetokenMint() {
      const { number } = this.form
      const data = {
        amount: toPrecision(number, 'CNY')
      }
      this.$message('正在增发中，请稍等片刻。')
      this.addToLoading = true
      const res = await this.$API.minetokenMint(data)
      this.addToLoading = false
      if (res.code === 0) {
        this.$message.success(res.message)
        this.tokenDetail()
      } else {
        this.$message.error(res.message)
      }
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
      const { name, symbol, logo, brief, introduction, number, cover } = this.form
      const data = {
        name: name,
        symbol: symbol,
        decimals: 4,
        brief: brief,
        introduction,
        logo: logo,
        cover: cover,
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
          if (this.isPost) this.minetokenCreate()
          else this.minetokenEdit(this.tokenId)
        } else return false
      })
    },
    // 完成上传
    doneImageUpload(res) {
      // console.log(res)
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
    addCoins() {
      if (!this.isLogined) return this.$store.commit('setLoginModal', true)
      this.$prompt('增发数量(总量最多发行一亿)', '提示', {
        inputPattern: /^\d{0,9}$/,
        inputErrorMessage: '请输入数字(总量最多发行一亿)',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if ((Number(value) + Number(this.totalAmount)) > 100000000) return this.$message.warning('发行总量不能超过一亿')
        if (Number(value) > 0) {
          this.form.number = Number(value)
          this.minetokenMint()
        }
      }).catch(() => {
        // 不写这个取消时候会报错
      })
    },
    // 图片上传完成
    done(data) {
      if (data.type === 'coinsCover') {
        this.form.cover = data.data.cover
      }
    },
    coverUpload(type) {
      this.imgUploadConfig.viewWidth =  440 * 0.8 + 'px'
      this.imgUploadConfig.viewHeight = 124 * 0.8 + 'px'
      this.imgUploadConfig.type = type
      this.imgUploadConfig.aspectRatio = 440 / 124
      this.imgUploadConfig.open++
    },
    removeProjectPeople(i) {
      this.$confirm('删除队员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: `删除成功!${i}`
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })          
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
  // width: 100px;
  // background: @purpleDark;
  // border-color: @purpleDark;
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
    margin-top: 10px;
    background: #542de0;
    color: #fff;
    font-size: 14px;
    padding: 5px 18px;
    border-radius: 0px;
    font-size: 22px;
    display: block;
    cursor: pointer;
  }
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

.project-people {
  &::after {
    display: block;
    content: "";
    width: 0;
    height: 0;
    clear: both;
  }
  .project-people__block {
    float: left;
    margin: 0 20px 20px 0;
    position: relative;
    &:nth-last-child(1) {
      margin-right: 0;
    }

    .components-avatar {
      width: 60px;
      height: 60px;
      margin: 0 auto;
    }
    p {
      padding: 0;
      margin: 10px 0 0 0;
      color: #fff;
      font-size: 16px;
      text-align: center;
      line-height: 22px;
    }
    .icon-close{
      position: absolute;
      right: 0;
      top: 0;
            color: #fff;
      font-size: 16px;
      cursor: pointer;
    }
  }
}
.project-btn {
  margin: 20px 0;
}
.project-text {
  padding: 0;
  margin: 0;
  color: #fff;
  font-size: 14px;
  line-height: 22px;
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
}
</style>
