const { network } = require("hardhat")
const { verify } = require("../utils/verify")
const { developmentChains } = require("../helper-hardhat.config")
require("dotenv").config()

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deployer } = await getNamedAccounts()
  const { log, deploy } = deployments
  const args = []

  const minter = await deploy("Minter", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations,
  })

  if (!developmentChains.includes(network.name)) {
    await verify(minter.address, args)
  }

  log("--------------------------------------------")
}

module.exports.tags = ["all", "minter", "update"]
