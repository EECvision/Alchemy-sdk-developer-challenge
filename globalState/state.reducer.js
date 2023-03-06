import { stateActionTypes } from "./state.types";

export const INITIAL_STATE = {
  modal: "",
  account: "",
  chainId: "",
  walletProvider: null,
  isDev: process.env.NODE_ENV === "development",
  isMainnet: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case stateActionTypes.SET_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case stateActionTypes.SET_ACCOUNT:
      return {
        ...state,
        account: action.payload,
      };
    case stateActionTypes.SET_CHAINID:
      return {
        ...state,
        chainId: action.payload,
      };
    case stateActionTypes.SET_WALLET_PROVIDER:
      return {
        ...state,
        walletProvider: action.payload,
      };
    default:
      return state;
  }
};
