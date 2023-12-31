import { BigNumber, ethers } from 'ethers'

import getGroundUp721AContract from '~/contracts'
export const ERC721A_ADDRESS = '0x4bBF3F7568A6b52eCDaC62651E1e1Fa6BFE36e0E'

export async function requestAccount() {
  if (window.ethereum?.request) return window.ethereum.request({ method: 'eth_requestAccounts' })

  throw new Error(
    'Missing install Metamask. Please access https://metamask.io/ to install extension on your browser'
  )
}

export const getStatusBlockchain = async (): Promise<number> => {
  console.log('getStatus BC')
  return new Promise(async (resolve, reject) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const GroundUp721AContract = getGroundUp721AContract(ERC721A_ADDRESS, signer)

      const tx = GroundUp721AContract.status()
      resolve(tx)
    } catch (err) {
      reject(err)
    }
  })
}

export const mintBlockchain = async (data: {
  amount: number
  merkleProof: string[]
  value: string
}) => {
  console.log('Mint BC', data)
  return new Promise(async (resolve, reject) => {
    try {
      const { amount, merkleProof, value } = data
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const GroundUp721AContract = getGroundUp721AContract(ERC721A_ADDRESS, signer)
      const options = {
        value: ethers.utils.parseEther(value).mul(BigNumber.from(amount))
        // gasLimit: 3000000
      }

      const tx = await GroundUp721AContract.mint(amount, merkleProof, options)
      await tx.wait()
      resolve(tx)
    } catch (err) {
      reject(err)
    }
  })
}

export const withdraw = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const GroundUp721AContract = getGroundUp721AContract(ERC721A_ADDRESS, signer)

      const tx = await GroundUp721AContract.withdraw()
      await tx.wait()
      resolve(tx)
    } catch (err) {
      reject(err)
    }
  })
}

export const getTotalSupply = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const GroundUp721AContract = getGroundUp721AContract(ERC721A_ADDRESS, signer)

      const tx = await GroundUp721AContract.totalSupply()
      resolve(tx)
    } catch (err) {
      reject(err)
    }
  })
}

export const getMaxSupply = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const GroundUp721AContract = getGroundUp721AContract(ERC721A_ADDRESS, signer)

      const tx = await GroundUp721AContract.maxSupply()
      resolve(tx)
    } catch (err) {
      reject(err)
    }
  })
}

export const getBalance = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const GroundUp721AContract = getGroundUp721AContract(ERC721A_ADDRESS, signer)

      const tx = await GroundUp721AContract.getBalance()
      resolve(tx)
    } catch (err) {
      reject(err)
    }
  })
}
