import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("====================");
  console.log(hre.network.name);
  console.log("====================");

  console.log("====================");
  console.log("Deploy MyToken Contract");
  console.log("====================");

  await deploy("MyToken", {
    contract: "MyToken",
    args: [],
    from: deployer,
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: false,
  });
};

func.tags = ["mytoken"];
export default func;