<template>
  <div class="card">
    <div class="card-info">
      <span class="card-type">
        {{ assetType }}
        <txHash
          :hash="asset.trx"
          size="24px"
        />
      </span>
      <span class="card-date">{{ friendlyDate }}</span>
      <span
        :style="{ color: `${assetColor}` }"
        class="card-pricing"
      >
        {{ assetAmount }}
      </span>
    </div>
    <!-- <div class="card-info">
      <span class="card-date">{{ friendlyDate }}</span>
    </div>
    <div class="card-info">
      <span class="card-title">{{ assetTitle }}</span>
    </div> -->
  </div>
</template>

<script>
// import { isNDaysAgo } from '@/common/methods';
import txHash from '@/components/tx_hash_popover/index'

export default {
  name: 'AssetCard',
  components: {
    txHash
  },
  props: {
    asset: {
      type: Object,
      required: true
    }
  },
  computed: {
    friendlyDate() {
      return this.$moment(this.asset.create_time).format('MMMDo HH:mm')
    },
    assetAmount() {
      return this.asset.type + this.asset.vp
    },
    assetColor() {
      if (this.asset.type === '-') {
        return '#d74e5a'
      } else if (this.asset.type === '+') {
        return '#41b37d'
      } else {
        return '#ffffff'
      }
    },
    assetType() {
      const { type } = this.asset
      const pointTypes = {
        read: this.$t('pointCard.read'),
        read_like: this.$t('pointCard.read_like'),
        read_dislike: this.$t('pointCard.read_dislike'),
        read_referral: this.$t('pointCard.read_referral'),
        beread: this.$t('pointCard.beread'),
        read_new: this.$t('pointCard.read_new'),
        beread_new: this.$t('pointCard.beread_new'),
        publish: this.$t('pointCard.publish'),
        publish_referral: this.$t('pointCard.publish_referral'),
        reg_inviter: this.$t('pointCard.reg_inviter'),
        reg_invitee: this.$t('pointCard.reg_invitee'),
        reg_invite_finished: this.$t('pointCard.reg_invite_finished'),
        login: this.$t('pointCard.login'),
        profile: this.$t('pointCard.profile'),
        comment_pay: this.$t('pointCard.comment_pay'),
        comment_income: this.$t('pointCard.comment_income')
      }
      return pointTypes[type]
    },
    assetTitle() {
      const { type, title } = this.asset
      // 不是邀请用户注册奖励积分
      if (type !== 'reg_inviter') {
        return title || ''
      } else {
        return '邀请用户阅读5篇文章超过30秒并评价即可获得剩余600积分'
      }
    }
  },
  created() {},
  methods: {}
}
</script>

<style scoped lang="less">
.card {
  margin: 10px 0;
  box-sizing: border-box;
  padding: 16px 20px 16px 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: left;
  width: 100%;
  border-bottom: 1px solid #DBDBDB;
  &-pricing {
    padding: 0;
    margin: 0;
    font-size:16px;
    font-weight:500;
    color:#fff;
    line-height:28px;
  }
  &-type {
    font-size:16px;
    font-weight:400;
    color:#fff;
    line-height:28px;
    width: 300px;
  }
  &-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &-title {
    font-size:16px;
    font-weight:400;
    color: #fff;
    line-height:22px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &-info {
      margin: 0 6px 0 0;
    }
    .copy-hash {
      width: 16px;
    }
  }
  &-date {
    font-size:16px;
    font-weight:400;
    color: #eaeaea;
    line-height:22px;
    flex: 1;
  }
}

</style>
