import Image from "next/image";
import { useContext, useEffect } from "react";
import { setModal } from "../../globalState/state.actions";
import { StateContext } from "../../globalState/state.context";
import { modalTypes } from "../../globalState/state.types";
import { formatAccount } from "../../utils";
import supportedChains from "../../utils/supportedChains";
import {
  checkMetamaskConnection,
  disconnectMetamask,
} from "../MetamaskConnect/MetamaskConnect.script";
import { checkWalletConnectConnection } from "../WalletConnect/WalletConnect.script";
import classes from "./ConnectButton.module.css";
import connectIcon from "../../assets/icon-connect.svg";

const ConnectButton = () => {
  const { dispatch, account, chainId, walletProvider } =
    useContext(StateContext);

  const handleConnectModal = () => {
    dispatch(setModal(modalTypes.CONNECT_MODAL));
  };

  const handleDisconnect = () => {
    if (walletProvider?.isWalletConnect) {
      walletProvider.disconnect();
    } else {
      disconnectMetamask({ dispatch });
    }
  };

  useEffect(() => {
    checkMetamaskConnection({ dispatch });
    checkWalletConnectConnection({ dispatch });
  }, [dispatch]);

  return (
    <>
      {account ? (
        <div className={classes.connected}>
          {chainId ? (
            <Image
              src={supportedChains[parseInt(chainId)].icon}
              alt=""
              className={classes.chainIcon}
            />
          ) : null}
          <div className={classes.account}>{formatAccount(account)}</div>
          <div onClick={handleDisconnect} className={classes.disconnect}>
            Disconnect
          </div>
        </div>
      ) : (
        <div className={classes.connect} onClick={handleConnectModal}>
          <Image className={classes.connectIcon} src={connectIcon} alt="" />
          <div>Connect wallet</div>
        </div>
      )}
    </>
  );
};

export default ConnectButton;
