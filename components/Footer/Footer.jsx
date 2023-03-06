import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <a href="https://github.com/EECvision">
      <div className={classes.container}>
        <div>Designed and Built by Emmanuel Ezeka</div>{" "}
        <div>Alchemy SDK challenge 2023</div>
      </div>
    </a>
  );
};

export default Footer;
