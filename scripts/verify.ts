import { ethers, run } from "hardhat";
import { getAddresses } from "../utils/address-manager";
import { formatEther } from "ethers/lib/utils";

async function main() {
  const signers = await ethers.getSigners();
  console.log("🚀 ~ file: verify.ts:7 ~ main ~ signers:", signers);
  console.log(
    `Contract owner balance: ${formatEther(
      (await signers[0].getBalance()).toString()
    )} ETH`
  );

  const addresses = await getAddresses(ethers.provider.network.chainId);
  const name = process.env.CONTRACT_NAME!;
  const symbol = process.env.CONTRACT_SYMBOL!;
  const uri = process.env.CONTRACT_BASE_URI!;
  const whiteListRoot = process.env.WHITE_LIST_MERKLE_ROOT!;

  try {
    await run("verify:verify", {
      address: addresses["DEPLOYED_CONTRACT_ADDRESS"],
      constructorArguments: [name, symbol, uri, whiteListRoot],
      contract: "contracts/GroundUp721A.sol:GroundUp721A",
    });
  } catch (error) {
    console.log(error);
  }
}

main().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
