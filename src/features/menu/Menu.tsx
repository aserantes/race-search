import React, { FC } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Toolbar from "@material-ui/core/Toolbar";

import { SearchInput } from "../";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontWeight: "bold",
      whiteSpace: "nowrap",
      marginRight: theme.spacing(2),
    },
  })
);

export const Menu: FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          Race Search
        </Typography>
        <Box display={{ xs: "none", sm: "block" }}>
          <Typography variant="body1">Enter Game Type:</Typography>
        </Box>
        <SearchInput />
      </Toolbar>
    </AppBar>
  );
};
