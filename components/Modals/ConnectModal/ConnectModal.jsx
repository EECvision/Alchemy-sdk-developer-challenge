import Image from "next/image";
import { useContext, useState } from "react";
import { setModal } from "../../../globalState/state.actions";
import { StateContext } from "../../../globalState/state.context";
import MetamaskConnect from "../../MetamaskConnect/MetamaskConnect";
import WalletConnectConnect from "../../WalletConnect/WalletConnect";
import classes from "./ConnectModal.module.css";
import closeIcon from "../../../assets/icon-close.svg";
import metamaskIcon from "../../../assets/icon-metamask.svg";
import walletConnectIcon from "../../../assets/icon-walletConnect.svg";

const ConnectModal = () => {
  const { dispatch } = useContext(StateContext);

  const [ignoreClick, setIgnore] = useState(false);

  const handleCloseModal = () => {
    if (ignoreClick) return;
    dispatch(setModal(""));
  };

  const handleCloseModalStrict = () => {
    dispatch(setModal(""));
  };

  return (
    <div onClick={handleCloseModal} className={classes.container}>
      <div
        onMouseEnter={() => setIgnore(true)}
        onMouseLeave={() => setIgnore(false)}
        className={classes.wrapper}
      >
        <div onClick={handleCloseModalStrict} className={classes.closeIcon}>
          <Image src={closeIcon} alt="" />
        </div>
        <div className={classes.title}>Connect wallet</div>
        <div className={classes.description}>
          Please, connect your wallet to sign messages and send transactions.{" "}
        </div>
        <MetamaskConnect>
          <div className={classes.connect}>
            <div className={classes.icon}>
              <Image src={metamaskIcon} alt="" />
            </div>
            <div className={classes.name}>Metamask</div>
            <div className={classes.type}>Connect with metamask</div>
          </div>
        </MetamaskConnect>
        <WalletConnectConnect>
          <div className={classes.connect}>
            <div className={classes.icon}>
              <Image src={walletConnectIcon} alt="" />
            </div>
            <div className={classes.name}>WalletConnect</div>
            <div className={classes.type}>Connect with WalletConnect</div>
          </div>
        </WalletConnectConnect>
        <div className={classes.supportedChain}>
          Supported Blockchain Polygon
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;
