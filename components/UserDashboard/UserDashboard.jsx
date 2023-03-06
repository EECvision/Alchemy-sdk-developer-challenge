import UserNFTCard from "../../components/NFTCard-User/UserNFTCard";
import classes from "./UserDashboard.module.css";

const UserDashboard = ({ contractNfts, mLoading }) => {
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <div className={classes.collectionName}>
          {contractNfts[0]?.contract.name}
        </div>
        {contractNfts.length ? (
          <div className={classes.details}>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href={`https://mumbai.polygonscan.com/address/${contractNfts[0]?.contract.contractDeployer}`}
              className={classes.list}
            >
              Creator
            </a>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href={`https://mumbai.polygonscan.com/address/${contractNfts[0]?.contract.address}`}
              className={classes.list}
            >
              Nft Address
            </a>
            <div className={classes.list}>Chain: Mumbai</div>
          </div>
        ) : null}
      </div>
      <div className={classes.wrapper}>
        <div className={classes.display}>
          {!mLoading
            ? contractNfts.map((nftDetails, idx) => (
                <UserNFTCard key={idx} nftDetails={nftDetails} />
              ))
            : Array(4)
                .fill(null)
                .map((_, idx) => (
                  <div key={idx} className={classes.skeleton}>
                    <div style={{ height: "240px" }}></div>
                    <div style={{ height: "40px" }}></div>
                    <div style={{ height: "40px" }}></div>
                  </div>
                ))}
        </div>
        {!mLoading && !contractNfts.length ? (
          <div className={classes.notFound}>No NFT Available</div>
        ) : null}
      </div>
    </div>
  );
};

export default UserDashboard;
