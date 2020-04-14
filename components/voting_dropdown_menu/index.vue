<template>
  <el-dropdown
    v-if="isLogined"
  >
    <div
      class="daos"
    >
      <span :class="{ badge: true }">
        <svg-icon
          class="icon"
          icon-class="daot"
        />
      </span>
      {{ power }}
    </div>
    <el-dropdown-menu
      slot="dropdown"
      class="user-dorpdown"
    >
      <el-row>
        <el-col :span="16">
          <span class="header">Vote Power</span>
          <el-tooltip
            class="pentagram"
            effect="dark"
            content="You can voted projects by Vote Power."
            placement="bottom"
          >
            <svg-icon
              class="help-icon"
              icon-class="help"
            />
          </el-tooltip>
        </el-col>
        <el-col class="second-column" :span="8">
          <span class="what" @click="showVotePowerIntroduction">What is it?</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="data-column" :span="16">
          <span class="amount">{{ power }}</span>
          <svg-icon
            class="get-button-icon"
            icon-class="daot"
          />
        </el-col>
        <el-col class="second-column" :span="8">
          <el-button
            size="mini"
            class="details-button"
            @click="$router.push({ name: 'account' })"
          >
            Detail
          </el-button>
        </el-col>
      </el-row>
      <el-divider />
      <el-row>
        <el-col>
          <span class="header">Vote Record</span>
          <el-tooltip
            class="pentagram"
            effect="dark"
            content="You can voted at most 10 tickets & 3 times perday per project."
            placement="bottom"
          >
            <svg-icon
              class="help-icon"
              icon-class="help"
            />
          </el-tooltip>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="data-column" :span="16">
          <span class="amount">{{ today.count }}</span>
          <svg-icon
            class="get-button-icon"
            icon-class="tickets"
          />
          <span style="font-size: 12px">
            (
            <span>{{ today.power }}</span>
            <svg-icon
              class="get-button-icon"
              icon-class="daot"
            />
            ) Today
          </span>
        </el-col>
        <el-col class="second-column" :span="8">
          <el-button
            size="mini"
            class="details-button"
            @click="$router.push({ name: 'tokens' })"
          >
            Detail
          </el-button>
        </el-col>
      </el-row>
      <div class="dao-list">
        <div
          v-for="(dao, item) in daoList"
          :key="item"
          class="dao fl"
        >
          <p class="dao-title">
            {{ dao.title }}
          </p>
          <p class="dao-num">
            {{ dao.num }}
          </p>
          <svg-icon
            class="get-button-icon"
            icon-class="tickets"
          />
        </div>
        <p class="more">
          <router-link :to="{ name: 'tokens' }">
            View more
          </router-link>
        </p>
      </div>
      <el-row>
        <span class="header">Get Rewards</span>
        <el-tooltip
          class="pentagram"
          effect="dark"
          placement="bottom"
        >
          <svg-icon
            class="help-icon"
            icon-class="help"
          />
          <div slot="content">
            Gain 100 Vote Power after binding NEAR wallet.
            <a style="color: white; text-decoration: underline;" href="https://wallet.nearprotocol.com/">https://wallet.nearprotocol.com/</a>
          </div>
        </el-tooltip>
      </el-row>
      <el-row>
        <span>
          {{ $t('voteDropdown.tomorrowGainTitle') }}
        </span>
        <el-tooltip
          class="pentagram"
          effect="dark"
          content="You can gain 1/3 VP of your costed yesterday + 20 a day."
          placement="bottom"
        >
          <svg-icon
            class="help-icon"
            icon-class="help"
          />
        </el-tooltip>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="reward-text">
            <span>Everyday Reward</span>
          </div>
        </el-col>
        <el-col :span="12">
          <el-button
            class="get-button badge"
            type="primary"
            size="mini"
          >
            Gain 20vp
            <svg-icon
              class="get-button-icon"
              icon-class="daot"
            />
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="reward-text">
            <span>Link to NEAR</span>
            <el-tooltip
              class="pentagram"
              effect="dark"
              content="Gain 100 VP after binding NEAR wallet"
              placement="bottom"
            >
              <svg-icon
                class="help-icon"
                icon-class="help"
              />
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="12">
          <el-button
            class="get-button badge"
            type="primary"
            size="mini"
          >
            Gain 100vp
            <svg-icon
              class="get-button-icon"
              icon-class="daot"
            />
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="reward-text">
            <span>Voted 5 projects</span>
          </div>
        </el-col>
        <el-col :span="12">
          <el-button
            class="get-button badge"
            type="primary"
            size="mini"
          >
            Gain 60vp
            <svg-icon
              class="get-button-icon"
              icon-class="daot"
            />
          </el-button>
        </el-col>
      </el-row>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  components: {
  },
  data() {
    return {
      isNewbie: true, // 是不是新人
      daoList: [
        {
          title: 'MTF DAO',
          num: 15
        },
        {
          title: 'MTF DAO',
          num: 15
        },
        {
          title: 'MTF DAO',
          num: 15
        },
        {
          title: 'MTF DAO',
          num: 15
        }
      ],
      power: 0,
      today: {
        count: 0,
        power: 0
      }
    }
  },
  // props: {},
  computed: {
    ...mapGetters(['isLogined']),
  },
  watch: {
    isLogined(val) {
      if (val) this.balanceOfDaot()
    }
  },
  methods: {
    async balanceOfDaot() {
      try {
        const result = await this.$API.balanceOf()
        this.power = result.data
      } catch (error) {
        console.log(error)
      }
    },
    async getNewbieBonus() {
      const { data } = await this.$API.getKycStatus()
      if (!data.verified) {
        this.$alert('请先绑定GitHub账号、邮箱账号和以太坊钱包', '领取失败', {
          confirmButtonText: '立刻绑定',
          type: 'error',
          // callback: (action) => {
          //   if (action === 'confirm') this.$router.push('/setting/account')
          //   else
          // }
        }).then(() => {
          this.$router.push('/setting/account')
        })
        return
      } else {
        const loading = this.$loading({
          text: '领取中...'
        })
        try {
          await this.$API.mintVotes()
          loading.close()
          this.$notify.success({
            title: '成功',
            message: '领取成功'
          })
          window.location.reload()
        } catch (error) {
          console.log(error)
          loading.close()
          this.$notify.error({
            title: '失败',
            message: '领取失败'
          })
        }
      }
    },
    showVotePowerIntroduction() {
      const h = this.$createElement
      this.$msgbox({
        title: '介绍',
        message: h('div', null, [
          h('h2', null, 'VotePower是什么？'),
          h('p', null, 'VotePower是DAOJAM中用来支持项目的一种资源，每一个VotePower都是 ERC-20 的Token。在DAOJAM中采用了二次方投票法：当您希望给一个项目支持5票时，就需要付出 5^2 = 25 个VotePower。最终得票最高的项目会赢得DAOJAM的项目大奖，而在得奖项目中投VotePower最多的用户会获得伯乐奖励。您的每一次投票都会被记录在区块链上，保障DAOJAM比赛过程中的公开透明性。'),
          h('h2', null, '如何获得票？'),
          h('p', null, '绑定Github和Email可自动领取 100 VotePower'),
          h('p', null, '每天可在导航栏中手动领取昨日投Vote Power总量的1/3 + 20 VotePower'),
          h('p', null, '邀请一名新用户领取奖励，自己可自动领取 50 VotePower'),
          h('h2', null, '如何投票？'),
          h('p', null, '前往PROJECTS页面查看感兴趣的项目，点击项目可以进入详情页中查看。对于支持的项目可以在详情页中直接投票。相信您的眼光，一定可以为我们找到最优质的的好项目！不过还请注意：单个项目单日最多可投票3次 且 投票总量不超过 10 票。')
        ])
      })
    }
  }
}
</script>

<style lang="less" scoped>
.daos {
  color: #fff;
  font-size:16px;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:22px;
  margin: 0;
  cursor: pointer;
  .icon {
    color: #fff;
    font-size: 20px;
  }
}

.user-dorpdown {
  background-color: #333333 !important;
  border: 1px solid #333 !important;
  color: white;
  border-radius:8px;
  padding: 20px;
  width: 300px;
  box-shadow: 1px 3px 15px rgba(0,0,0,0.9);

  .el-row {
    margin-bottom: 8px;
  }
  .second-column {
    text-align: right;
  }

  .header {
    font-size: 20px;
    font-weight: bold;
  }
  .amount {
    font-size: 18px;
  }
  .what {
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
  }
  .help-icon {
    width: 12px;
    height: 12px;
  }

  .main-text {
    font-size:16px;
    font-weight:500;
    line-height:22px;
    margin: 5px 0;
    &.f1 {
      flex: 1;
      margin: 0;
    }
  }
  .annotate {
    font-size:14px;
    font-weight:400;
    line-height:20px;
    margin: 0;
    a {
      color: #6236FF;
      text-decoration: underline
    }
  }
  .tickets {
    align-items: center;
  }
  .data-column, .reward-text {
    padding: 7px 0;
    line-height: 22px;
  }
  .get-button {
    width: 100%;
    font-size:16px;
    font-weight:500;
    line-height:22px;
    &-icon {
      color: #fff;
      font-size: 22px;
      margin-left: 3px;
      margin-bottom: -2px;
    }
  }
  .details-button {
    font-size:16px;
    font-weight:500;
    color:#6236FF;
    line-height:22px;
    padding: 4px 12px;
  }
  .dao-list {
    background: rgb(32, 32, 32);
    margin: 16px 0;
    padding: 4px 12px;
    .more{
      text-align:center;
      margin: 2px 0;
      a {
        color: white;
        font-size:12px;
        font-weight:500;
        line-height:17px;
      }
    }
    .dao{
      margin: 10px 0;
      .dao-title {
        font-size:14px;
        font-weight:400;
        line-height:20px;
        margin: 0;
        flex: 1;
      }
      .dao-num {
        font-size:14px;
        font-weight:500;
        line-height:20px;
        margin: 0 4px 0 0;
      }
    }
  }
}
</style>

<style lang="less">
.badge {
  position: relative;
  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background: rgba(251,104,119,1);
    position: absolute;
    z-index: 1000;
    right: 0%;
    margin-right: -3px;
    margin-top: -3px;
    top: 0;
  }
}
</style>
