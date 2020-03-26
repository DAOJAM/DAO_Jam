// import web3 from './web3'
import jsonData from './QVVoting.json'

const address = '0x9CF123de9927E8a03B12a9bca3B86E84C2dfEA8D' // THE CONTRACT ADDRESS
const abi = jsonData.abi

const instance = new window.web3.eth.Contract(abi, address)

export default instance
