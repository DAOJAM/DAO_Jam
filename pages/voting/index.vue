<template>
  <div class="voting-page">
    <g-header />
    <el-button
      type="primary"
      size="small"
      @click="createProposal"
    >
      创建项目
    </el-button>
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
      @click="mint"
    >
      领取dot
    </el-button>
    <el-button
      type="primary"
      size="small"
      @click="balance"
    >
      查看用户的dot
    </el-button>
    <el-button
      type="primary"
      size="small"
      @click="countVotes"
    >
      计算票数
    </el-button>
  </div>
</template>

<script>
import jsonData from '@/api/voting/QVVoting.json'
// import QVVoting from '@/api/voting/qvvoting.js'

export default {
  transition: 'page',
  components: {
  },
  data() {
    return {
      // address: '0x9CF123de9927E8a03B12a9bca3B86E84C2dfEA8D', // THE CONTRACT ADDRESS
      // abi: jsonData.abi
    }
  },
  mounted() {
    // const web3 = window.web3
    // const { address, abi } = this
    // console.log(address, abi)
    // console.log(web3.eth.Contract)
    // const instance = new web3.eth.Contract(abi, address)
    // console.log(instance)
  },
  methods: {
    contractInstance() {
      const web3 = window.web3
      const address = '0x9CF123de9927E8a03B12a9bca3B86E84C2dfEA8D'
      const QVVoting = new web3.eth.Contract(jsonData.abi, address)
      return QVVoting
    },
    async createProposal() {
      const web3 = window.web3
      const QVVoting = this.contractInstance()
      const result = await QVVoting.methods.createProposal('zxplus的dao组织', 1000).send({
        from: web3.currentProvider.selectedAddress
      })
      console.log(result)
    },
    async getProposal() {
      // const web3 = window.web3
      const QVVoting = this.contractInstance()
      const resultCount = await QVVoting.methods.ProposalCount().call()
      console.log(resultCount)
      const result = await QVVoting.methods.Proposals(1).call()
      console.log(result)
      const resultStatus = await QVVoting.methods.getProposalStatus(1).call()
      console.log(resultStatus)
    },
    async mint() {
      const web3 = window.web3
      const QVVoting = this.contractInstance()
      const currentAddress = web3.currentProvider.selectedAddress
      const address = '0x0d8E708F9CfF2634169D7c221CF6bfA0C5731d63'
      const result = await QVVoting.methods.mint(address, 200).send({
        from: currentAddress
      })
      console.log(result)
    },
    async voting() {
      const web3 = window.web3
      const QVVoting = this.contractInstance()
      const currentAddress = web3.currentProvider.selectedAddress
      const result = await QVVoting.methods.castVote(1, 100, true).send({
        from: currentAddress
      })
      console.log(result)
    },
    async balance() {
      // const web3 = window.web3
      const QVVoting = this.contractInstance()
      // const currentAddress = web3.currentProvider.selectedAddress
      const address = '0x0d8E708F9CfF2634169D7c221CF6bfA0C5731d63'

      const result = await QVVoting.methods.balanceOf(address).call()
      console.log(result)
    },
    async countVotes() {
      const QVVoting = this.contractInstance()
      const result = await QVVoting.methods.countVotes(1).call()
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
