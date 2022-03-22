<template>
  <m-dialog
    v-model="showModal"
    title="分享"
    width="400px"
  >
    <div class="list">
      <div class="list-block" @click="copy(copyLink)">
        <div class="cover">
          <img
            src="@/assets/img/token_share.png"
            alt="link"
          >
        </div>
        <p>Copy Link</p>
      </div>
    </div>
    <div class="list">
      <!-- 因为其他地方用不到 暂时这里控制模块显示 -->
      <socialShare
        style="margin: 20px 0 0 0;"
        :img="socialImg"
        :title="socialTitle"
        :link="socialLink"
        :summary="socialSummary"
        :qq-title="socialTitleQQ"
        :weibo="false"
        :qq="false"
        :qzone="false"
      />
    </div>
    <div class="list">
      <wechat
        :link="socialWechat"
        style="margin: 60px 0 0 0;"
      />
    </div>
  </m-dialog>
</template>
<script>
import wechat from '@/components/scan/wechat.vue'
import socialShare from '@/components/modal/social_share'

export default {
  components: {
    wechat,
    socialShare
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    // 复制链接
    copyLink: {
      type: String,
      default: ''
    },
    // 社交分享
    socialImg: {
      type: String,
      default: ''
    },
    socialTitle: {
      type: String,
      default: ''
    },
    socialTitleQQ: {
      type: String,
      default: ''
    },
    socialLink: {
      type: String,
      default: ''
    },
    socialSummary: {
      type: String,
      default: ''
    },
    socialWechat: {
      type: String,
      default: ''
    }
    
  },
  data() {
    return {
      showModal: false
    }
  },
  watch: {
    showModal(newVal) {
      this.$emit('input', newVal)
    },
    value(newVal) {
      this.showModal = newVal
    },
  },
  methods: {
    copy(text) {
      this.$copyText(text).then(
        () => {
          this.$message.success(this.$t('success.copy'))
        },
        () => {
          this.$message.error(this.$t('error.copy'))
        }
      )
    },
  }
}
</script>

<style lang="less" scoped>
.list {
  display: flex;
    align-items: center;
    justify-content: center;
  &-block {
        width: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
      cursor: pointer;

    .cover {
      img {
    width: 46px;
      }
    }
    p {
          font-size: 16px;
    padding: 0;
    margin: 10px 0 0 0;
    }
  }
}
</style>