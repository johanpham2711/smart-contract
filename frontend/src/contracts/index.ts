import { ethers } from 'ethers'
import contractGroundUp721A from './GroundUp721A.json'

const getGroundUp721AContract = (address: string, signerOrProvider?: any) => {
  return new ethers.Contract(address, contractGroundUp721A.abi, signerOrProvider)
}

export default getGroundUp721AContract
export * as RevertedMessages from './revertedMessages'
