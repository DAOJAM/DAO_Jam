<template>
  <div class="voting-page">
    <g-header />
    <h1>数字： {{ counter }}</h1>
    <button @click="signIn">
      signIn
    </button>
    <button @click="signOut">
      signOut
    </button>
    <button @click="createCost">
      createCost
    </button>
    <button @click="balanceOf">
      balanceOf
    </button>
    <button @click="mint">
      mint
    </button>
    <button @click="get_proposal">
      get_proposal
    </button>
    <button @click="get_proposal_count">
      get_proposal_count
    </button>

    <button @click="vote">
      vote
    </button>
    <div>
      <h1>create_proposal</h1>
      <input type="text" v-model="pjName">
      <input type="text" v-model="pjDescription">
      <button @click="createProposal">
        create_proposal
      </button>
    </div>
    <button @click="getStatus">
      getStatus
    </button>
  </div>
</template>

<script>
import '@/api/voting/near.js'
import * as nearlib from 'nearlib'

export default {
  transition: 'page',
  components: {
  },
  data() {
    return {
      counter: 0,
      pjName: '',
      pjDescription: ''
    }
  },
  methods: {
    async getStatus() {
      const rpc = new nearlib.providers.JsonRpcProvider('https://rpc.nearprotocol.com')
      // const net = await rpc.getNetwork()
      // const status = await rpc.status()
      // const buf = Buffer.from('5M6jVXKpdat7HekCAnrMXidFxv41X7eRQ8PjN2EdcWc5')
      // const z = new Uint8Array(buf)
      // const txStatus = await rpc.txStatus(z, 'shellteo')
      // 2wYEwUyMubWKSM5VcV84yrB7AUBjDNLPZn9cv45bFP3U
      const block = await rpc.block(4447865) // 
      // 7tketubSHjnwP8o7iPGTUnUMK44ZZjwJdRpKJba9DcB9
      // console.log(net)
      // console.log(status)
      // console.log(txStatus)
      console.log(block)
    },
    async get_proposal_count() {
      const result = await window.contract.get_proposal_count()
      console.log(result)
    },
    async vote() {
      /* const result = await window.contract.cast_vote({
        proposal_id: 20,
        num_tokens: 1,
        vote: true
      }) */
      try {
        const accountId = window.walletConnection.getAccountId()
        const connection = window.near.connection
        const account = new nearlib.Account(connection, accountId)
        const result = await account.functionCall('syntest2', 'cast_vote', {
          proposal_id: 0,
          num_tokens: 1,
          vote: true
        })
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    },
    async get_proposal() {
      const result = await window.contract.get_proposal({
        proposal_id: 0
      })
      if (result) {
        console.log(result)
      } else {
        console.log('not exit')
      }
    },
    async createProposal() {
      console.log('-----------createProposal-------------')
      const expireTime = 30 * 24 * 60 * 60
      const result = await window.contract.create_proposal({
        name: this.pjName, description: this.pjDescription, expiration_time: expireTime
      })
      console.log(result)
    },
    async mint() {
      const res = await this.$API.nearMint('zxplus')
      console.log(res)
      /* const res = await this.contract.mint({name: 'zxplus', amount: 100})
      console.log(res) */
    },
    async balanceOf() {
      const res = await window.contract.balance_of({ name: 'shellteo' })
      console.log('======================')
      console.log(res)
    },
    async createCost() {
      const res = await window.contract.get_create_cost()
      console.log('======================')
      console.log(res)
    },
    signIn() {
      window.walletConnection.requestSignIn(
        window.nearConfig.contractName,
        'NEAR Counter Example'
      )
    },
    signOut() {
      window.walletConnection.signOut()
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
