import Image from "next/image";
import Link from "next/link";
import Button from "../Button/Button";
// import bannerBg from "../../assets/banner-bg.png";
import classes from "./Banner.module.css";

const Banner = () => {
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        Develop with <br /> Alchmemy
      </div>
      <div className={classes.text}>
        Your perfect solution for web3 development
      </div>
      <Link href="/asset/create" className={classes.btn}>
        <Button color="accent">Let's build!</Button>
      </Link>
    </div>
  );
};

export default Banner;
