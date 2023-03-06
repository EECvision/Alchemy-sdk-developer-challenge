import Head from "next/head";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { getNftsForContract } from "../../alchemy.scripts";
import UserDashboard from "../../components/UserDashboard/UserDashboard";
import { StateContext } from "../../globalState/state.context";
import classes from "../../styles/Account.module.css";
import minterData from "../../_constants/minter.json";

export default function Account() {
  const { account } = useContext(StateContext);
  const [contractNfts, setContractNfts] = useState([]);
  const [mLoading, setMLoading] = useState(true);

  useEffect(() => {
    if (!account) return;
    (async () => {
      setMLoading(true);
      // Get all the NFTs owned by an address
      const { nfts } = await getNftsForContract(
        minterData["80001"][minterData["80001"].length - 1].contractAddress
      );
      setMLoading(false);
      setContractNfts(nfts);
    })();
  }, [account]);

  return (
    <div className={classes.container}>
      <Head>
        <title>User-Dashboard | Blue-waters</title>
        <meta
          name="description"
          content="Education | Onboarding | Minter | NFT Marketplace"
        />
        <link rel="icon" href="/logo.svg" />
      </Head>
      {account ? (
        <UserDashboard contractNfts={contractNfts} mLoading={mLoading} />
      ) : (
        <div className={classes.connectAlert}>
          Connect your wallet to continue
        </div>
      )}
    </div>
  );
}
