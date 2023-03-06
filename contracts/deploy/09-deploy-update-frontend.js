require("dotenv").config()
const fs = require("fs")
const { network, ethers, getNamedAccounts, deployments } = require("hardhat")
const frontEndMinter = "../_constants/minter.json"

module.exports = async () => {
  await updateMinter()
}

const updateMinter = async () => {
  const { deployer } = await getNamedAccounts()
  const { log } = deployments
  log("deployer is: ", deployer)
  const contract = await ethers.getContract("Minter")
  const chainId = network.config.chainId.toString()
  const metadata = JSON.parse(fs.readFileSync(frontEndMinter, "utf8"))
  if (chainId in metadata) {
    const chainStr = JSON.stringify(metadata[chainId])
    const objStr = JSON.stringify({
      abi: contract.interface.format(ethers.utils.FormatTypes.json),
      contractAddress: contract.address,
    })
    if (!chainStr.includes(objStr)) {
      metadata[chainId].push({
        abi: contract.interface.format(ethers.utils.FormatTypes.json),
        contractAddress: contract.address,
      })
    }
  } else {
    metadata[chainId] = [
      {
        abi: contract.interface.format(ethers.utils.FormatTypes.json),
        contractAddress: contract.address,
      },
    ]
  }
  fs.writeFileSync(frontEndMinter, JSON.stringify(metadata))
}

module.exports.tags = ["all", "update"]
