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
      12000
    </div>
    <el-dropdown-menu
      slot="dropdown"
      class="user-dorpdown"
    >
      <div class="fl tickets">
        <p class="main-text f1">
          I have 12000 tickets
        </p>
        <div>
          <el-button
            size="mini"
            class="details-button"
          >
            DETAILS
          </el-button>
        </div>
      </div>
      <el-divider />
      <div v-if="isNewbie" class="bonus-get">
        <p class="main-text">
          新用户奖励
        </p>
        <p class="annotate">
          绑定邮箱帐户和GitHub账号后即可领取
        </p>
        <el-button
          class="get-button"
          type="primary"
          round
          @click="getNewbieBonus"
        >
          立刻领取 100 票
          <svg-icon
            class="get-button-icon"
            icon-class="daot"
          />
        </el-button>
      </div>
      <div v-else class="bonus-get">
        <p class="main-text">
          Today you can get 120 tickets
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
          Today voted: 600 T
        </p>
        <p class="annotate">
          You can vote 1/3tickets at most and up to 30.
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
            more details
            <i class="el-icon-d-arrow-right" />
          </p>
        </div>
        <p class="main-text">
          Tomorrow you  can get: 600 T
        </p>
        <p class="annotate">
          You can get 1/3tickets + 20.
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
    }
  },
  // props: {},
  computed: {
    ...mapGetters(['isLogined']),
  },
  methods: {
    async getNewbieBonus() {
      const { data } = await this.$API.getKycStatus()
      if (!data.verified) {
        this.$alert('请先绑定GitHub账号和邮箱账号', '领取失败', {
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
      }
      // @todo 接下来领取逻辑
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
      font-size:12px;
      font-weight:500;
      line-height:17px;
      text-align:center;
      cursor:pointer;
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
