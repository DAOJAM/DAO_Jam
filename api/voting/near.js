import * as nearlib from 'nearlib'
// dev-1585907319828
const CONTRACT_NAME = 'syntest2'

async function initContract() {
  const nearConfig = {
    networkId: 'default',
    nodeUrl: 'https://rpc.nearprotocol.com',
    contractName: CONTRACT_NAME,
    walletUrl: 'https://wallet.nearprotocol.com',
    helperUrl: 'https://near-contract-helper.onrender.com',
  }
  const near = await nearlib.connect({
    deps: {
      keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore()
    },
    ...nearConfig
  })

  // Needed to access wallet login
  // const walletAccount = new nearlib.WalletAccount(near)
  const walletConnection = new nearlib.WalletConnection(near)
  const accountId = walletConnection.getAccountId()
  console.log('-----------accountId-------------')
  console.log(accountId)

  // Initializing our contract APIs by contract name and configuration.
  const contract = await near.loadContract(nearConfig.contractName, {
    viewMethods: ['get_proposal', 'get_create_cost', 'get_proposal_count', 'get_proposal_status', 'get_proposal_expiration_time', 'count_votes', 'balance_of'],
    changeMethods: ['create_proposal', 'set_proposal_to_tally', 'set_proposal_to_ended', 'set_create_cost', 'cast_vote', 'mint'],
    sender: accountId
  })
  window.near = near
  window.contract = contract
  window.walletConnection = walletConnection
  window.nearConfig = nearConfig

  const connection = near.connection
  const account = new nearlib.Account(connection, accountId)
  window.unpackContract = {
    async cast_vote(paramsObj) {
      return await account.functionCall(CONTRACT_NAME, 'cast_vote', paramsObj)
    },
    async create_proposal(paramsObj) {
      return await account.functionCall(CONTRACT_NAME, 'create_proposal', paramsObj)
    }
  }
  return {
    contract,
    nearConfig,
    walletConnection
  }
}
if (process.browser) {
  window.nearInitPromise = initContract()
}
export default initContract
