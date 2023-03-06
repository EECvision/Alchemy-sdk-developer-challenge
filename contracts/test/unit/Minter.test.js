const { assert } = require("chai")
const { network, ethers, deployments } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat.config")

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Minter", () => {
      const TOKEN_URI =
        "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json"
      const TOKEN_URI_1 =
        "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json"
      const TOKEN_ID = 0
      let minter
      let deployer
      beforeEach(async () => {
        let accounts = await ethers.getSigners()
        deployer = accounts[0]
        await deployments.fixture(["all"])
        let minterContract = await ethers.getContract("Minter")
        minter = minterContract.connect(deployer)
        await minter.safeMint(TOKEN_URI)
        await minter.safeMint(TOKEN_URI_1)
      })

      describe("safeMint", () => {
        it("should mint Nft to the deployer", async () => {
          const _deployer = await minter.ownerOf(TOKEN_ID)
          assert.equal(deployer.address, _deployer)
        })

        it("should own 2 nfts", async () => {
          const count = await minter.balanceOf(deployer.address)
          assert.equal(count, 2)
        })
      })
    })
