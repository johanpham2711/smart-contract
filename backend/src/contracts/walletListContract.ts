import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, GOERLI_RPC_URL, PRIVATE_KEY } from 'src/constants';
import { IMintedStats } from 'src/interfaces';

import * as contractABI from './abi.json';

export const getMintedStats = async (
  // allowlist: string[],
  whitelist: string[],
): Promise<IMintedStats> => {
  // Configuring the connection to an Ethereum node
  console.log(
    '🚀 ~ file: walletListContract.ts:13 ~ GOERLI_RPC_URL:',
    GOERLI_RPC_URL,
    CONTRACT_ADDRESS,
  );
  const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
  console.log('🚀 ~ file: walletListContract.ts:17 ~ provider:', provider);

  const nftContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractABI.abi,
    provider,
  );
  console.log(
    '🚀 ~ file: walletListContract.ts:25 ~ nftContract:',
    nftContract,
  );

  // Creating a signing account from a private key
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  console.log('🚀 ~ file: walletListContract.ts:32 ~ signer:', signer);
  const nftContractSigner = nftContract.connect(signer);
  console.log(
    '🚀 ~ file: walletListContract.ts:34 ~ nftContractSigner:',
    nftContractSigner,
  );

  // These values will be returned from the API
  // let allowlistMinted = 0;
  // let whitelistMinted = 0;
  let totalAllowMint = 0;

  // for (const addr of allowlist) {
  //   // Get total minted by address
  //   const minted = await nftContractSigner.Firstcome(addr);
  //   allowlistMinted += minted.toNumber();
  // }

  console.log('🚀 ~ file: walletListContract.ts:36 ~ whitelist:', whitelist);
  // for (const addr of whitelist) {
  //   const minted = await nftContractSigner.whitelistMinted(addr);
  //   // Get total minted by address
  //   whitelistMinted += minted.toNumber();
  // }
  const mintedList = await Promise.all(
    whitelist.map((address: string) => {
      return nftContractSigner.whitelistMinted(address);
    }),
  );

  const whitelistMinted = mintedList.reduce((a, b) => a + b.toNumber(), 0);

  totalAllowMint = (await nftContractSigner.maxSupply()).toNumber();

  return {
    // allowlistMinted,
    whitelistMinted,
    totalAllowMint,
  };
};
