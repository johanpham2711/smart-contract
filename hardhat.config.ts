import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
      },
    ],
    // settings: {
    //   optimizer: {
    //     enabled: true,
    //     runs: 300,
    //   },
    // }
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`!,
      chainId: 1,
      accounts: [process.env.PRIVATE_KEY!],
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`!,
      chainId: 5,
      accounts: [process.env.PRIVATE_KEY!],
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
  },

  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY!,
    },
  },
};

export default config;
