import { useContext, useEffect, useState } from "react";
import {
  getBalance,
  getNftsForContract,
  getNftsForOwner,
} from "../../alchemy.scripts";
import { StateContext } from "../../globalState/state.context";
import classes from "./AccountInfo.module.css";
import minterData from "../../_constants/minter.json";

const AccountInfo = () => {
  const { account } = useContext(StateContext);
  const [balance, setBalance] = useState(null);
  const [allNfts, setAllNfts] = useState(null);
  const [contractNfts, setContractNfts] = useState(null);

  const getInfo = async () => {
    const bal = await getBalance(account);
    setBalance(bal);

    const allNfts = await getNftsForOwner(account);
    setAllNfts(allNfts.totalCount);

    const allContractNfts = await getNftsForContract(
      minterData["80001"][minterData["80001"].length - 1].contractAddress
    );
    setContractNfts(allContractNfts.nfts.length);
  };

  useEffect(() => {
    if (!account) return;
    getInfo();
  }, [account]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div>
          <span className={classes.key}>Balance</span>{" "}
          <span className={classes.value}>
            {Number(balance).toFixed(4)} matic
          </span>
        </div>
        <div>
          <span className={classes.key}>All nfts</span>{" "}
          <span className={classes.value}>{allNfts}</span>
        </div>
        <div>
          <span className={classes.key}>Contract nfts:</span>{" "}
          <span className={classes.value}>{contractNfts}</span>{" "}
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
