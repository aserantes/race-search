import React, { FC } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

export const Loading: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} data-testid="Loading-component">
      <LinearProgress color="secondary" />
    </div>
  );
};
