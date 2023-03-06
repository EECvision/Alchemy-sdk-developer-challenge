import classes from "./AttributeInput.module.css";
import closeIcon from "../../../assets/icon-close.svg";
import addIcon from "../../../assets/icon-add.svg";
import Image from "next/image";

const AttributeInput = ({ minterProps }) => {
  const {
    metadata,
    handleAttributeChange,
    handleRemoveAttribute,
    handleAddAttribute,
  } = minterProps;

  return (
    <div className={classes.container}>
      <label>
        <span>Attributes</span>{" "}
        <span className={classes.info}>{"(Optional)"}</span>
      </label>{" "}
      <div className={classes.attributes}>
        {!metadata.attributes.length ? (
          <div className={classes.placeholder}></div>
        ) : (
          metadata.attributes.map(({ id, trait_type, value }) => (
            <div key={id} className={classes.attribute}>
              <input
                id={id}
                name="trait_type"
                value={trait_type}
                onChange={handleAttributeChange}
                placeholder="trait_type"
                className={classes.key}
              />
              <input
                id={id}
                name="value"
                value={value}
                onChange={handleAttributeChange}
                placeholder="value"
                className={classes.value}
              />
              <div
                onClick={() => handleRemoveAttribute(id)}
                className={classes.remAttribute}
              >
                <Image src={closeIcon} alt="" />
              </div>
            </div>
          ))
        )}
      </div>
      <div onClick={handleAddAttribute} className={classes.addAttribute}>
        <Image src={addIcon} alt="" />
        <div>Add Attribute</div>
      </div>
    </div>
  );
};

export default AttributeInput;
