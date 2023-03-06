// Setup
import { Network, Alchemy, Utils } from "alchemy-sdk";

const settings = {
  apiKey: "gPeYDYpOqJQBtlKTc_r8fEEHq3ZQX0xm",
  network: Network.MATIC_MUMBAI,
};

const alchemy = new Alchemy(settings);

// Get the latest block
export const getLatestBlock = async () => {
  return await alchemy.core.getBlockNumber();
};

// Get all the NFTs owned by an address
export const getNftsForOwner = async (account) => {
  return await alchemy.nft.getNftsForOwner(account);
};

// Get all the NFTs owned by an address
export const getNftsForContract = async (contractAddress) => {
  return await alchemy.nft.getNftsForContract(contractAddress);
};

export const getBalance = async (account) => {
  const balance = await alchemy.core.getBalance(account);
  return Utils.formatEther(balance.toString());
};

// // Listen to all new pending transactions
// alchemy.ws.on(
//   { method: "alchemy_pendingTransactions", fromAddress: "0xshah.eth" },
//   (res) => console.log(res)
// );
