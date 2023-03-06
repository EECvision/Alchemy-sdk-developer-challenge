import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../../globalState/state.context";
import classes from "../../styles/Create.module.css";
import minterAccount from "../../_constants/minter.json";
import Minter from "../../components/Minter/Minter";

export default function Create() {
  const { chainId, account } = useContext(StateContext);
  const [contract, setContract] = useState("");

  useEffect(() => {
    const allContracts = minterAccount[parseInt(chainId)];
    if (!allContracts) return console.log("not found");
    const activeContract = allContracts[allContracts.length - 1];
    setContract(activeContract);
  }, [account, chainId]);

  return (
    <div className={classes.container}>
      <Head>
        <title>Alchemy Challenge 2023</title>
        <meta name="description" content="Alchemy SDK Developer Challenge" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Minter contractAddress={contract.contractAddress} abi={contract.abi} />
    </div>
  );
}
