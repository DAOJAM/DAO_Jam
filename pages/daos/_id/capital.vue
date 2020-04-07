<template>
  <div>
    <div class="token-list">
      <h2 class="token-title">
        数据统计
      </h2>
      <div class="fl total-content">
        <div class="token-data">
          <p class="token-num">
            {{ amount }}
            <sub>{{ minetokenToken.symbol }}</sub>
          </p>
          <p class="token-name">
            发行总量
          </p>
        </div>

        <div class="token-data">
          <p class="token-num">
            {{ cnyReserve }}
            <sub>CNY</sub>
            + {{ tokenReserve }}
            <sub>{{ minetokenToken.symbol }}</sub>
          </p>
          <p class="token-name">
            流动金池
          </p>
        </div>

        <div class="token-data">
          <p class="token-num">
            {{ volume }}
            <sub>{{ minetokenToken.symbol }}</sub>
          </p>
          <p class="token-name">
            24h成交量
          </p>
        </div>

        <div class="token-data">
          <p class="token-num">
            {{ exchangeAmount }}
            <sub>CNY</sub>
          </p>
          <p class="token-name">
            24h成交额
          </p>
        </div>

        <div class="token-data">
          <p
            :style="{color: color}"
            class="token-num"
          >
            {{ change }}
          </p>
          <p class="token-name">
            24h涨跌幅
          </p>
        </div>

        <div class="token-data">
          <p class="token-num">
            {{ price }}
            <sub>CNY</sub>
          </p>
          <p class="token-name">
            现价
          </p>
        </div>
      </div>
    </div>

    <div class="token-list">
      <h2 class="token-title">
        Details
      </h2>
      <div class="token-tags">
        <mineTokensNav v-model="tabPage" />
        <tokenFanCoins v-if="tabPage === 0" />
        <tokenFanCoinsDetail v-else-if="tabPage === 1" />
        <tokenLiquidity v-else-if="tabPage === 2" />
        <tokenLiquidityDetail
          v-else-if="tabPage === 3"
          :token="minetokenToken"
        />
      </div>
    </div>
  </div>
</template>


<script>
import mineTokensNav from '@/components/user/minetokens_nav.vue'
import tokenFanCoins from '@/components/token/token_fan_coins'
import tokenFanCoinsDetail from '@/components/token/token_fan_coins_detail'
import tokenLiquidity from '@/components/token/token_liquidity'
import tokenLiquidityDetail from '@/components/token/token_liquidity_detail'
import { precision } from '@/utils/precisionConversion'

export default {
  components: {
    mineTokensNav,
    tokenFanCoins,
    tokenFanCoinsDetail,
    tokenLiquidity,
    tokenLiquidityDetail
  },
  data() {
    return {
      tabPage: Number(this.$route.query.tab) || 0,
      minetokenToken: Object.create(null),
      minetokenExchange: Object.create(null),
    }
  },
  computed: {
    amount() {
      const tokenamount = precision(
        this.minetokenToken.total_supply || 0,
        'CNY',
        this.minetokenToken.decimals
      )
      return this.$publishMethods.formatDecimal(tokenamount, 4)
    },
    tokenReserve() {
      const tokenamount = precision(
        this.minetokenExchange.token_reserve || 0,
        'CNY',
        this.minetokenToken.decimals
      )
      return this.$publishMethods.formatDecimal(tokenamount, 4)
    },
    cnyReserve() {
      const tokenamount = precision(
        this.minetokenExchange.cny_reserve || 0,
        'CNY',
        this.minetokenToken.decimals
      )
      return this.$publishMethods.formatDecimal(tokenamount, 4)
    },
    volume() {
      const tokenamount = precision(
        this.minetokenExchange.volume_24h || 0,
        'CNY',
        this.minetokenToken.decimals
      )
      return this.$publishMethods.formatDecimal(tokenamount, 4)
    },
    exchangeAmount() {
      const tokenamount = precision(
        this.minetokenExchange.amount_24h || 0,
        'CNY',
        this.minetokenToken.decimals
      )
      return this.$publishMethods.formatDecimal(tokenamount, 4)
    },
    change() {
      if (this.minetokenExchange.change_24h) {
        const amount =
          (this.minetokenExchange.change_24h * 100).toFixed(2) + '%'
        if (parseInt(amount) > 0) return '+' + amount
        return amount
      } else return '0%'
    },
    price() {
      // const tokenamount = precision(this.minetokenExchange.price || 0, 'CNY', this.minetokenToken.decimals)
      // return this.$publishMethods.formatDecimal(tokenamount, 4)
      return this.minetokenExchange.price || 0
    },
    color() {
      // 显示转换
      const amount = parseFloat(this.change)
      if (amount < 0) return '#d74e5a'
      else if (amount > 0) return '#41b37d'
      else return 'rgb(153, 153, 153)'
    },
  },
  created() {
    if (process.browser) {
      const id = this.$route.params.id
      this.minetokenId(id)
    }
  },
  methods: {
    async minetokenId(id) {
      await this.$API.minetokenId(id).then(res => {
        if (res.code === 0) {
          this.minetokenToken = res.data.token || Object.create(null)
          // this.minetokenUser = res.data.user || Object.create(null)
          this.minetokenExchange = res.data.exchange || Object.create(null)
        } else {
          console.log(res.message)
        }
      })
        .catch(err => {
          console.log(err)
        })
    },
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
// common end

.total-content {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background:rgba(19,45,94,1);
  border-radius:8px;
  margin-top: 20px;
  padding: 20px 0;
  .token-data {
    text-align: center;
    .token-num  {
      font-size:20px;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:28px;
      padding: 0;
      margin: 0;
    }
    .token-name {
      font-size:14px;
      font-weight:400;
      color:rgba(178,178,178,1);
      line-height:20px;
      padding: 0;
      margin: 5px 0 0 0;
    }
    sub {
      bottom: 0;
    }
  }
}

.token-tags {
  background:rgba(19,45,94,1);
  border-radius:8px;
  padding: 20px;
  margin-top: 20px;
}
</style>