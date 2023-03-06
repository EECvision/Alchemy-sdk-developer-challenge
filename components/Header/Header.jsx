import Link from "next/link";
import ConnectButton from "../ConnectButton/ConnectButton";
import iconClose from "../../assets/icon-nav-close.svg";
import iconOpen from "../../assets/icon-nav-open.svg";
import classes from "./Header.module.css";
import lfg from "../../assets/rocket.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const Header = () => {
  const { asPath } = useRouter();
  const [openNav, setOpenNav] = useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link className={classes.logo} href="/">
          <span>EECvision</span>
          <img src={lfg.src} alt="" />
        </Link>
        <div className={`${classes.navWrapper} ${openNav && classes.active}`}>
          <div className={classes.navItems}>
            <Link
              onClick={() => setOpenNav(false)}
              href="/account"
              className={`${classes.nav} ${
                asPath === "/account" && classes.active
              }`}
            >
              Explore
              <div className={classes.underline}></div>
            </Link>
            <Link
              onClick={() => setOpenNav(false)}
              href="/asset/create"
              className={`${classes.nav} ${
                asPath === "/asset/create" && classes.active
              }`}
            >
              Create
              <div className={classes.underline}></div>
            </Link>
          </div>
          <div onClick={() => setOpenNav(false)}>
            <ConnectButton />
          </div>
        </div>
        <div className={classes.mobileNav}>
          {!openNav ? (
            <div onClick={() => setOpenNav(true)} className={classes.open}>
              <Image className={classes.icon} src={iconOpen} alt="" />
            </div>
          ) : (
            <div onClick={() => setOpenNav(false)} className={classes.close}>
              <Image src={iconClose} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
