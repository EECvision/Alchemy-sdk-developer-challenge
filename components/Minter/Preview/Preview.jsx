import { formatAccount } from "../../../utils";
import classes from "./Preview.module.css";

const Preview = ({ minterProps }) => {
  const { account, metadata } = minterProps;

  return (
    <div className={classes.container}>
      <div className={classes.heading}>Preview</div>
      <div className={classes.card}>
        <div className={classes.account}>{formatAccount(account)}</div>
        {metadata.image && (
          <img src={URL.createObjectURL(metadata.image)} alt="" />
        )}
        <div className={classes.nameWrapper}>
          <div className={classes.name}>{metadata.name}</div>
          <div className={classes.description}>{metadata.description}</div>
        </div>
        <div className={classes.attributes}>
          {metadata.attributes.map(({ id, trait_type, value }) =>
            trait_type && value ? (
              <div key={id} className={classes.attribute}>
                <div>{trait_type}</div>:<div>{value}</div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
