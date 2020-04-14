<template>
  <el-dropdown
    v-if="isLogined"
  >
    <div
      class="daos"
    >
      <svg-icon
        class="icon"
        icon-class="daot"
      />
      {{ daot }}
    </div>
    <el-dropdown-menu
      slot="dropdown"
      class="user-dorpdown"
    >
      <div class="fl tickets">
        <p class="main-text f1">
          I have {{ daot }} DaoT
        </p>
        <div>
          <el-button
            size="mini"
            class="details-button"
            @click="$router.push({ name: 'account' })"
          >
            DETAILS
          </el-button>
        </div>
      </div>
      <el-divider />
      <div v-if="isNewbie" class="bonus-get">
        <p class="main-text">
          {{ $t('voteDropdown.rewardTitle') }}
        </p>
        <p class="annotate">
          {{ $t('voteDropdown.rewardText') }}
        </p>
        <el-button
          class="get-button"
          type="primary"
          round
          @click="getNewbieBonus"
        >
          {{ $t('voteDropdown.gainDaoT') }}
          <svg-icon
            class="get-button-icon"
            icon-class="daot"
          />
        </el-button>
      </div>
      <div v-else class="bonus-get">
        <p class="main-text">
          Today you can get 120 DaoT
        </p>
        <p class="annotate">
          Come to get it today!
        </p>
        <el-button
          class="get-button"
          type="primary"
          round
        >
          GET 120
          <svg-icon
            class="get-button-icon"
            icon-class="daot"
          />
        </el-button>
      </div>
      <div>
        <p class="main-text">
          {{ $t('voteDropdown.voteTodayTitle', [600, 46]) }}
        </p>
        <p class="annotate">
          {{ $t('voteDropdown.voteTodayText') }}
          <router-link :to="{ name: 'account' }">
            {{ $t('voteDropdown.voteTodayHelp') }}
          </router-link>
        </p>
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
          </div>
          <p class="more">
            <router-link :to="{ name: 'tokens' }">
              more details
              <i class="el-icon-d-arrow-right" />
            </router-link>
          </p>
        </div>
        <p class="main-text">
          {{ $t('voteDropdown.tomorrowGainTitle') }}
        </p>
        <p class="annotate">
          {{ $t('voteDropdown.tomorrowGainText') }}
        </p>
      </div>
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
          num: '- 15'
        },
        {
          title: 'MTF DAO',
          num: '- 15'
        },
        {
          title: 'MTF DAO',
          num: '- 15'
        },
        {
          title: 'MTF DAO',
          num: '- 15'
        }
      ],
      daot: 0
    }
  },
  // props: {},
  computed: {
    ...mapGetters(['isLogined']),
  },
  beforeMount() {
    if (this.isLogined) this.balanceOfDaot()
  },
  /* mounted() {
    this.balanceOfDaot()
  }, */
  methods: {
    async balanceOfDaot() {
      try {
        const result = await this.$API.balanceOf()
        this.daot = result.data
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
  .main-text {
    font-size:16px;
    font-weight:500;
    line-height:22px;
    margin: 0 0 5px;
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
  .get-button {
    width: 100%;
    font-size:16px;
    font-weight:500;
    line-height:22px;
    padding-top: 8px;
    padding-bottom: 8px;
    margin: 20px 0;
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
    margin: 20px 0;
    .more{
      text-align:center;
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
        color:#FB6877;
        line-height:20px;
        margin:0;
      }
    }
  }
}
</style>
