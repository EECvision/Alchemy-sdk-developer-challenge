import classes from "./Loader.module.css";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <CircularProgress />
      </div>
    </div>
  );
};

export default Loader;
