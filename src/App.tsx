import React, { FC } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import { GameSchedule, Menu, GameData } from "./features";

export const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" disableGutters>
        <Menu />
        <GameSchedule />
        <GameData />
      </Container>
    </>
  );
};
