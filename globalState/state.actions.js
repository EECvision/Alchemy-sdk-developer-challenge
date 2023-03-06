import { stateActionTypes } from "./state.types";

export const setModal = (modal) => ({
  type: stateActionTypes.SET_MODAL,
  payload: modal,
});

export const setAccount = (account) => ({
  type: stateActionTypes.SET_ACCOUNT,
  payload: account,
});

export const setChainId = (chainId) => ({
  type: stateActionTypes.SET_CHAINID,
  payload: chainId,
});

export const setWalletProvider = (provider) => ({
  type: stateActionTypes.SET_WALLET_PROVIDER,
  payload: provider,
});
