import { formatAccount } from "../../../utils";
import classes from "./ChainInput.module.css";
import polygonIcon from "../../../assets/icon-polygon.svg";
import Image from "next/image";
import { useContext } from "react";
import { StateContext } from "../../../globalState/state.context";
import { setModal } from "../../../globalState/state.actions";
import { modalTypes } from "../../../globalState/state.types";

const ChainInput = ({ minterProps }) => {
  const { account } = minterProps;
  const { dispatch } = useContext(StateContext);

  const handleNetwork = async () => {
    if (account) return;
    dispatch(setModal(modalTypes.CONNECT_MODAL));
  };

  return (
    <div onClick={handleNetwork} className={classes.chains}>
      <label>
        <span>Blockchain</span>{" "}
        <span className={classes.info}>{"(Required)"}</span>
      </label>{" "}
      <div className={classes.activeChain}>
        <div className={classes.chainInfo}>
          <Image src={polygonIcon} alt="" className={classes.chainIcon} />
          <div className={classes.account}>{formatAccount(account, 5, 5)}</div>
        </div>
        {account ? (
          <div className={classes.connected}>Connected</div>
        ) : (
          <div className={classes.connect}>Connect</div>
        )}
      </div>
    </div>
  );
};

export default ChainInput;

// import classes from "./Minter.module.css";

// const ChainInput = ({ minterProps }) => {
//   const { network, account, supportedChains, isMainnet, handleNetwork } =
//     minterProps;

//   return (
//     <div className={classes.chains}>
//       <label htmlFor="chain">Select Network</label>
//       <div className={classes.activeChain}>{network}</div>
//       <div
//         className={`${classes.chainSelector} ${!account && classes.disabled}`}
//       >
//         {Object.values(supportedChains).map((chain, idx) =>
//           chain.isMainnet === isMainnet ? (
//             <div
//               key={idx}
//               onClick={() => (account ? handleNetwork(chain) : {})}
//               value={chain.name}
//               className={classes.chain}
//             >
//               {chain.label}
//             </div>
//           ) : null
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChainInput;
