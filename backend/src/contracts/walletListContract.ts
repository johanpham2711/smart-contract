import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, GOERLI_RPC_URL, PRIVATE_KEY } from 'src/constants';
import { IMintedStats } from 'src/interfaces';

import * as contractABI from './abi.json';

export const getMintedStats = async (
  // allowlist: string[],
  whitelist: string[],
): Promise<IMintedStats> => {
  // Configuring the connection to an Ethereum node
  const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);

  const nftContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractABI.abi,
    provider,
  );

  // Creating a signing account from a private key
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  const nftContractSigner = nftContract.connect(signer);

  // These values will be returned from the API
  // let allowlistMinted = 0;
  // let whitelistMinted = 0;
  let totalAllowMint = 0;

  // for (const addr of allowlist) {
  //   // Get total minted by address
  //   const minted = await nftContractSigner.Firstcome(addr);
  //   allowlistMinted += minted.toNumber();
  // }

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
