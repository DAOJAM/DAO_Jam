<template>
  <div class="card">
    <div class="fl jsb">
      <div class="title">
        <div class="fl">
          <router-link
            :to="{ name: 'user-id', params: { id: card.from_uid } }"
            class="username"
            :class="!card.from_username && 'logout'"
          >
            {{ from_nickname }}
          </router-link>
          <svg-icon
            icon-class="transfer"
            class="info-icon"
          />
          <router-link
            :to="{ name: 'user-id', params: { id: card.to_uid } }"
            class="username"
            :class="!card.to_username && 'logout'"
          >
            {{ to_nickname }}
          </router-link>
          <txHash
            v-if="card.tx_hash"
            :hash="card.tx_hash"
          />
        </div>
        <p class="time">
          {{ time }}
        </p>
      </div>
      <div class="amount">
        {{ tokenAmount(card.token_amount) }}
        <p>{{ token.symbol }}</p>
      </div>
      <div class="amount">
        {{ tokenAmount(card.cny_amount) }}
        <p>CNY</p>
      </div>
      <div class="amount">
        {{ tokenAmount(card.liquidity) }}
        <p>{{ token.symbol }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { precision } from '@/utils/precisionConversion'
import txHash from '@/components/tx_hash_popover/index'

export default {
  name: 'AssetCard',
  components: {
    txHash
  },
  props: {
    card: {
      type: Object,
      required: true
    },
    token: {
      type: Object,
      required: true
    }
  },
  computed: {
    time() {
      return this.$moment(this.card.create_time).format('MMMDo HH:mm')
    },
    from_nickname() {
      return this.card.from_nickname || this.card.from_username || '此账号已注销'
    },
    to_nickname() {
      return this.card.to_nickname || this.card.to_username || '此账号已注销'
    }
  },
  created() {},
  methods: {
    tokenAmount(amount) {
      const tokenamount = Math.abs(precision(amount, 'CNY', this.card.decimals))
      return this.$publishMethods.formatDecimal(tokenamount, 4) || 0
    }
  }
}
</script>

<style scoped lang="less">
.card {
  margin: 0;
  box-sizing: border-box;
  background-color: transparent;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: left;
  width: 100%;
  border-bottom: 1px solid #eaeaea;
  & > div {
    margin: 4px 0;
  }
}
.card-info {
  flex: 1;
  flex-direction: column;
  margin-left: 10px;
}
.info-icon {
  color: #fff;
  margin: 0 6px;
}
.title {
  width: 335px;
}
.username {
  font-size:18px;
  font-weight:400;
  color: #fff;
  line-height:28px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 140px;
  &.logout {
    color: #b2b2b2;
  }
}
.type {
  font-size: 12px;
  font-weight: 400;
  color: #fff;
  line-height: 17px;
  margin: 2px 0;
}
.amount {
  font-size:18px;
  font-weight:500;
  color:#fff;
  line-height:28px;
  padding-right: 10px;
  width: 140px;
  p {
    font-size:14px;
    font-weight:400;
    color:#eaeaea;
    line-height:22px;
    margin: 10px 0;
  }
}
.time {
  font-size:14px;
  font-weight:400;
  color:#eaeaea;
  line-height:22px;
  margin: 10px 0;
}
</style>
