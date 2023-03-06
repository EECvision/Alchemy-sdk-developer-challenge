import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { getImageUrl } from "../../scripts";
import { formatAccount, readContract } from "../../utils";
import supportedChains from "../../utils/supportedChains";
import classes from "./UserNFTCard.module.css";
import minterData from "../../_constants/minter.json";
import { StateContext } from "../../globalState/state.context";

const UserNFTCard = ({ nftDetails }) => {
  const { walletProvider, account } = useContext(StateContext);
  const [owner, setOwner] = useState("");

  const {
    tokenId,
    contract,
    rawMetadata: { name, image, description, attributes },
  } = nftDetails;

  const getOwner = async () => {
    const res = await readContract({
      params: {
        abi: minterData["80001"][minterData["80001"].length - 1].abi, //get latest contract
        contractAddress: contract.address,
        functionName: "ownerOf",
        params: {
          tokenId,
        },
      },
      walletProvider,
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (tx) => {
        console.log("success!!!");
      },
    });
    setOwner(res);
  };

  useEffect(() => {
    getOwner();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <img className={classes.image} src={getImageUrl(image)} alt="" />
      </div>
      <div className={classes.content}>
        <div className={classes.nameAndTag}>
          <div className={classes.name}>{name}</div>
          <Image
            className={classes.chainIcon}
            src={supportedChains["80001"].icon}
            alt=""
          />
        </div>
        <div className={classes.owner}>
          <span>Owned by</span>{" "}
          <span>
            {owner.toLowerCase() === account.toLowerCase() ? (
              "you"
            ) : (
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={`https://mumbai.polygonscan.com/address/${owner}`}
              >
                {formatAccount(owner, 4, 3)}
              </a>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserNFTCard;

{
  /* <div className={classes.sell}>
<Button color="accent" disabled={true}>
  Sell
</Button>
</div> */
}
