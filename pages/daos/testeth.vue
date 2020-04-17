<template>
  <div class="voting-page">
    <g-header />
    <el-button
      type="primary"
      size="small"
      @click="getProposal"
    >
      项目数量和数据
    </el-button>
    <el-button
      type="primary"
      size="small"
      @click="voting"
    >
      投票
    </el-button>
    <el-button
      type="primary"
      size="small"
      @click="countVotes"
    >
      计算票数
    </el-button>
    <el-button
      type="primary"
      size="small"
      @click="setCreateCost"
    >
      设置创建需要话费的dot
    </el-button>
    <div>
      <h1>领取dot</h1>
      <el-input v-model="userAddress" placeholder="用户address" />
      <el-button
        type="primary"
        size="small"
        @click="mintByBackend"
      >
        领取 200 dot
      </el-button>
    </div>
    <div>
      <h1>创建项目</h1>
      <el-input v-model="pjName" placeholder="项目名" />
      <el-input v-model="pjDescription" type="textarea" placeholder="项目秒速" />
      <el-button
        type="primary"
        size="small"
        @click="createProposal"
      >
        创建项目
      </el-button>
    </div>
    <div>
      <h1>查询用户能量点</h1>
      <el-input v-model="userAddress" placeholder="用户address" />
      <el-button
        type="primary"
        size="small"
        @click="balance"
      >
        查看用户的dot
      </el-button>
      <span>能量点数量：{{ userDaot }}</span>
    </div>
    <h1>{{ daot }}</h1>
  </div>
</template>

<script>
import qv from '@/api/voting/qvvoting.js'

export default {
  transition: 'page',
  components: {
  },
  data() {
    return {
      userAddress: '',
      userDaot: 0,
      pjName: '',
      pjDescription: '',
      daot: 0
    }
  },
  mounted() {
    this.balanceOfDaot()
  },
  methods: {
    async createProposal() {
      console.log('-----------createProposal-------------')
      const web3 = window.web3
      const QVVoting = qv.contractInstance()
      const accounts = await web3.eth.getAccounts()
      const coinbase = await web3.eth.getCoinbase()
      const owner = accounts[0]
      console.log(coinbase, owner)
      const expireTime = 7 * 24 * 60 * 60
      const result = await QVVoting.methods.createProposal(this.pjName, this.pjDescription, expireTime).send({
        from: owner
      })
      console.log(result)
    },
    async getProposal() {
      // const web3 = window.web3
      const QVVoting = await qv.contractInstance()
      const symbol = await QVVoting.methods.symbol().call()
      console.log(symbol)
      /* const resultCount = await QVVoting.methods.ProposalCount().call()
      console.log(resultCount)
      const result = await QVVoting.methods.Proposals(1).call()
      console.log(result)
      const resultStatus = await QVVoting.methods.getProposalStatus(1).call()
      console.log(resultStatus) */
    },
    async mint() {
      const web3 = window.web3
      const QVVoting = qv.contractInstance()
      const currentAddress = web3.currentProvider.selectedAddress
      // const address = '0x0530b049EebbB433De580f6358150574C7FB0346'
      const result = await QVVoting.methods.mint(this.userAddress, 200).send({
        from: currentAddress
      })
      console.log(result)
    },
    async mintByBackend() {
      const result = await this.$API.mintVotes(this.userAddress)
      console.log(result)
    },
    async balanceOfDaot() {
      try {
        const coinbase = await window.web3.eth.getCoinbase()
        const QVVoting = qv.contractInstance()
        const result = await QVVoting.methods.balanceOf(coinbase).call()
        this.daot = result || 0 
        console.log('==========================================')
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    },
    async voting() {
      const web3 = window.web3
      const QVVoting = qv.contractInstance()
      const currentAddress = web3.currentProvider.selectedAddress
      const result = await QVVoting.methods.castVote(1, 100, true).send({
        from: currentAddress
      })
      console.log(result)
    },
    async balance() {
      // const web3 = window.web3
      const QVVoting = await qv.contractInstance()
      // const currentAddress = web3.currentProvider.selectedAddress
      // const address = '0x0d8E708F9CfF2634169D7c221CF6bfA0C5731d63'
      const result = await QVVoting.methods.balanceOf(this.userAddress).call()
      this.userDaot = result
    },
    async countVotes() {
      const QVVoting = qv.contractInstance()
      const result = await QVVoting.methods.countVotes(1).call()
      const result2 = await QVVoting.methods.createCost().call()
      console.log(result2)
      console.log(result)
    },
    async setCreateCost() {
      const web3 = window.web3
      const QVVoting = qv.contractInstance()
      const currentAddress = web3.currentProvider.selectedAddress
      const result = await QVVoting.methods.setCreateCost(20).send({
        from: currentAddress
      })
      console.log(result)
    }
  }
}
</script>
<style lang="less" scoped src="../index.less"></style>
<style lang="less" scoped src="../home_container.less"></style>

<style lang="less" scoped>
.voting-page {
  min-height: 100%;
  margin-top: 60px;
}
</style>
