import classes from "./NameInput.module.css";

const NameInput = ({ minterProps }) => {
  const { handleNameChange, metadata } = minterProps;
  return (
    <div className={classes.container}>
      <label htmlFor="name">
        <span>Name</span> <span className={classes.info}>{"(Required)"}</span>
      </label>
      <input type="text" value={metadata.name} onChange={handleNameChange} />
    </div>
  );
};

export default NameInput;
