import { useEffect } from "react";
import classes from "./LoaderWithState.module.css";
import CircularProgress from "@mui/material/CircularProgress";

const LoaderWithState = ({
  title,
  loadingState,
  success,
  error,
  onError,
  onSuccess,
}) => {
  useEffect(() => {
    if (success) {
      onSuccess(success);
    }

    if (error) {
      onError(error);
    }
  }, [success, error]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.title}>{title}</div>
        <CircularProgress />
        {loadingState && !error && !success ? (
          <div className={classes.loadingState}>{loadingState}</div>
        ) : null}
      </div>
    </div>
  );
};

export default LoaderWithState;
