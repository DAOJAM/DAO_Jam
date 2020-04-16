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
          <span class="header">Voting Power</span>
          <el-tooltip
            class="pentagram"
            effect="dark"
            content="You can voted projects by Voting Power."
            placement="bottom"
          >
            <svg-icon
              class="help-icon"
              icon-class="help"
            />
          </el-tooltip>
        </el-col>
        <el-col class="second-column" :span="8">
          <span class="what" @click="showVotingPowerIntroduction">What is it?</span>
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
          <span class="amount">{{ todayVote }}</span>
          <svg-icon
            class="get-button-icon"
            icon-class="tickets"
          />
          <span style="font-size: 12px">
            (
            <span>{{ todayVP }}</span>
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
            {{ dao.name }}
          </p>
          <p class="dao-num">
            {{ dao.weight }}
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
            Gain 100 Voting Power after binding NEAR wallet.
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
            class="get-button"
            type="info"
            disabled="true"
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
            @click="getNewbieBonus"
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
            class="get-button"
            type="info"
            disabled="true"
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
      daoList: [],
      power: 0,
      todayVote: 0,
      todayVP: 0
    }
  },
  // props: {},
  computed: {
    ...mapGetters(['currentUserInfo', 'isLogined']),
  },
  watch: {
    isLogined(val) {
      if (val) this.fetchDatas()
    }
  },
  mounted() {
    // 切换页面的时候，this.isLogined 已经是 true，不会触发它的 watch
    if (this.isLogined) this.fetchDatas()
  },
  methods: {
    fetchDatas() {
      this.checkIsNewbie()
      this.loadTodayTop5Votes()
      this.balanceOfDaot()
    },
    async balanceOfDaot() {
      try {
        const result = await this.$API.balanceOf()
        this.power = result.data
      } catch (error) {
        console.log(error)
      }
    },
    async checkIsNewbie() {
      // This API is intended for verification only
      // we will need to record isNewBie or not on the server
      this.isNewbie = (await this.$API.getKycStatus()).data.verified
    },
    async loadTodayTop5Votes() {
      const { data: { top5, total } } = await this.$API.todayVotes(this.currentUserInfo.id)
      this.daoList = top5
      this.todayVote = total.vote
      this.todayVP = total.vp
    },
    async getNewbieBonus() {
      const { data } = await this.$API.getKycStatus()
      if (!data.verified) {
        this.$alert('You can only have newbie bonus if you bind Near account with us.', 'Failed to get', {
          confirmButtonText: this.$t('kyc.notificationPop.buttonText'),
          type: 'error',
        }).then(() => {
          this.$router.push('/setting')
        })
        return
      } else {
        const loading = this.$loading({
          text: 'Redeeming...'
        })
        try {
          await this.$API.mintVotes()
          loading.close()
          this.$notify.success({
            title: 'You have the Newbie bonus',
            message: 'You just get your newbie bonus. Hooray!'
          })
          window.location.reload()
        } catch (error) {
          console.log(error)
          loading.close()
          this.$notify.error({
            title: 'Failed',
            message: 'Somewhere just failed, please try again.'
          })
        }
      }
    },
    showVotingPowerIntroduction() {
      const h = this.$createElement
      this.$msgbox({
        title: 'Introduction',
        message: h('div', null, [
          h('h2', null, 'What is Voting Power?'),
          h('p', null, 'Voting Power is a resource used in DAO JAM to support your favorite hackathon projects. Quadratic voting is adopted in DAO Jam: when you want to submit 5 votes to a project, you need to pay 5 ^ 2 = 25 Voting Power. At the end of the hackathon, the project with the highest number of votes will win. Each of your votes will be recorded on the blockchain to ensure transparency and immutability during the hackathon.'),
          h('h2', null, 'How Can I Get More Voting Power?'),
          h('p', null, 'Link you NEAR Wallet account! '),
          h('h2', null, 'How to vote?'),
          h('p', null, 'Go to the PROJECTS page to view a list of hackathon project. After you enter the details page of each project, you can vote for you favorite projects!')
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
