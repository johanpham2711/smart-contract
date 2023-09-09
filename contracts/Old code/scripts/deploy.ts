import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { formatEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { writeAddresses } from "../utils/address-manager";

async function main() {
  const name = process.env.CONTRACT_NAME!;
  const symbol = process.env.CONTRACT_SYMBOL!;
  const uri = process.env.CONTRACT_BASE_URI!;
  const whiteListRoot = process.env.WHITE_LIST_MERKLE_ROOT!;

  const signers: SignerWithAddress[] = await ethers.getSigners();
  const balanceBeforeDeployment = await signers[0].getBalance();
  console.log(`Contract owner balance: ${formatEther(balanceBeforeDeployment.toString())} ETH`);

  const ERC721AContract = await ethers.getContractFactory("GroundUp721A");
  const erc721AContract = await ERC721AContract.deploy(
    name,
    symbol,
    uri,
    whiteListRoot
  );
  const tx = await erc721AContract.deployed();
  const receipt = await tx.deployTransaction.wait(1);
  const deploymentGasFee = receipt.gasUsed.mul(receipt.effectiveGasPrice);
  const balanceAfterDeployment = await signers[0].getBalance();

  console.log('Contract deployed address: ', erc721AContract.address);
  console.log(`Contract owner balance after deployment: ${formatEther(balanceAfterDeployment.toString())} ETH`);
  console.log(`Deployment gas used: ${receipt.gasUsed} wei`);
  console.log(`Deployment gas fee: ${formatEther(deploymentGasFee.toString())} ETH`);

  writeAddresses(ethers.provider.network.chainId, {
    DEPLOYED_CONTRACT_ADDRESS: erc721AContract.address
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
