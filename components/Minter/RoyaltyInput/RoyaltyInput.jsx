import classes from "./RoyaltyInput.module.css";

const RoyaltyInput = ({ minterProps }) => {
  const { handleRoyaltyChange, metadata } = minterProps;
  return (
    <div className={classes.container}>
      <label htmlFor="royalty split">
        <span>Royalty split</span>{" "}
        <span className={classes.info}>Coming soon!</span>
      </label>
      <input type="text" value={""} onChange={() => {}} />
    </div>
  );
};

export default RoyaltyInput;
