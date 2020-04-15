<template>
  <userLayout>
    <template slot="main">
      <!-- <div class="cny-main">
        <h2>
          Voting Power是什么？
        </h2>
        <p>
          Voting Power是DAOJAM中用来支持项目的一种资源，每一个Voting Power都是 ERC-20 的Token。在DAOJAM中采用了二次方投票法：当您希望给一个项目支持5票时，就需要付出 5^2 = 25 个 Voting Power。最终得票最高的项目会赢得DAOJAM的项目大奖，而在得奖项目中投Voting Power最多的用户会获得伯乐奖励。您的每一次投票都会被记录在区块链上，保障DAOJAM比赛过程中的公开透明性。
        </p>
        <h2>
          如何获得票？
        </h2>
        <p>
          绑定Github和Email可自动领取 100 Voting Power
          <br>
          每天可在导航栏中手动领取昨日投Voting Power总量的1/3 + 20 Voting Power
          <br>
          邀请一名新用户领取奖励，自己可自动领取 50 Voting Power
        </p>
        <h2>
          如何投票？
        </h2>
        <p class="no-bottom">
          前往PROJECTS页面查看感兴趣的项目，点击项目可以进入详情页中查看。对于支持的项目可以在详情页中直接投票。相信您的眼光，一定可以为我们找到最优质的的好项目！不过还请注意：单个项目单日最多可投票3次 且 投票总量不超过 10 票。
        </p>
      </div> -->
      <points />
    </template>
    <template slot="nav">
      <myAccountNav />
    </template>
  </userLayout>
</template>

<script>
import userLayout from '@/components/user/user_layout.vue'
import myAccountNav from '@/components/my_account/my_account_nav.vue'
import points from '@/components/points/index.vue'
export default {
  components: {
    userLayout,
    myAccountNav,
    points
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.cny-main {
  background-color: #122d5e;
  padding: 20px;
  border-radius: @br10;
  box-sizing: border-box;
  margin-bottom: 20px;
  color: white;
  h2 {
    font-weight: bold;
    font-size: 20px;
    line-height:28px;
    padding-left: 10px;
    margin: 0 0 20px;
  }
  p {
    font-size:16px;
    padding-left: 10px;
    line-height:30px;
    margin: 0 0 20px;
    &.no-bottom {
      margin: 0;
    }
  }
}
</style>
