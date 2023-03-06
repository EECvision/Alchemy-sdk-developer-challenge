import Image from "next/image";
import Button from "../../Button/Button";
import classes from "./MintErrorModal.module.css";
import errorIcon from "../../../assets/icon-error.svg";

const MintErrorModal = ({ handleMint, onClose }) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.icon}>
          <Image src={errorIcon} alt="" />
        </div>
        <div className={classes.title}>Error!</div>
        <div className={classes.description}>Mint failed</div>
        <div
          onClick={() => {
            handleMint();
            onClose(false);
          }}
          className={classes.button}
        >
          <Button color="accent">Try again</Button>
        </div>
        <div onClick={() => onClose(false)} className={classes.linkBtn}>
          Close
        </div>
      </div>
    </div>
  );
};

export default MintErrorModal;
