import Image from "next/image";
import Button from "../../Button/Button";
import classes from "./MintSuccessModal.module.css";
import successIcon from "../../../assets/icon-success.svg";
import Link from "next/link";

const MintSuccessModal = ({ setMint }) => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.icon}>
          <Image src={successIcon} alt="" />
        </div>
        <div className={classes.title}>Success!</div>
        <div className={classes.description}>
          Your Nft was successfully created
        </div>
        <Link className={classes.button} href={"/account"}>
          <Button color="accent">Go to My NFTs</Button>
        </Link>
        <div onClick={() => setMint(false)} className={classes.linkBtn}>
          Create new
        </div>
      </div>
    </div>
  );
};

export default MintSuccessModal;
