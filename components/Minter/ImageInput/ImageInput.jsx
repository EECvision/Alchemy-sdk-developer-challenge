import classes from "./ImageInput.module.css";
import closeIcon from "../../../assets/icon-close.svg";
import imagePlaceholder from "../../../assets/image-placeholder.svg";
import Image from "next/image";

const ImageInput = ({ minterProps }) => {
  const { imageRef, metadata, handleImageChange } = minterProps;
  return (
    <div onClick={() => imageRef.current.click()} className={classes.image}>
      {!metadata.image ? (
        <div className={classes.placeholder}>
          <Image src={imagePlaceholder} alt="" />
          <div>PNG, WebP, JPEG. max 100 mb</div>
          <div className={classes.button}>Choose file</div>
        </div>
      ) : (
        <img src={URL.createObjectURL(metadata.image)} alt="" />
      )}
      <input
        type="file"
        name="image"
        accept="image/png"
        onChange={handleImageChange}
        style={{ display: "none" }}
        ref={imageRef}
      />
      <div className={classes.changeImageIcon}>
        <Image src={closeIcon} alt="" />
      </div>
    </div>
  );
};

export default ImageInput;
