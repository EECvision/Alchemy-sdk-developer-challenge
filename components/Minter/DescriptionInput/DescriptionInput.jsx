import classes from "./DescriptionInput.module.css";

const DescriptionInput = ({ minterProps }) => {
  const { handleDescriptionChange, metadata } = minterProps;

  return (
    <div className={classes.description}>
      <label>
        <span>Description</span>{" "}
        <span className={classes.info}>{"(Optional)"}</span>
      </label>
      <textarea
        type="text"
        value={metadata.description}
        onChange={handleDescriptionChange}
      ></textarea>
    </div>
  );
};

export default DescriptionInput;
