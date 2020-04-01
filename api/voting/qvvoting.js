// import web3 from './web3'
import jsonData from './QVVoting.json'

const address = '0x7260e769005Fec7A9ba7415AdF45D69AB126a33d' // THE CONTRACT ADDRESS
const abi = jsonData.abi

export default {
  contractInstance() {
    const QVVoting = new window.web3.eth.Contract(abi, address)
    return QVVoting
  }
}
