import Web3 from 'web3'

let web3Instance

if (window.ethereum) {
  web3Instance = new Web3(window.ethereum)
} else if (window.web3) {
  // Legacy dapp browsers...
  web3Instance = new Web3(window.web3.currentProvider)
} else {
  // Non-dapp browsers...
  console.log(
    'Non-Ethereum browser detected. You should consider trying MetaMask!',
  )
  // web3Instance = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/CqCd0QgCozHBEk19ub2M'))
}
export default web3Instance
