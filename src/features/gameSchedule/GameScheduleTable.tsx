import React, { FC } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { setGameId, selectGameId, selectGameType, GameInfo } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { parseDate } from "../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gameType: {
      fontWeight: "bold",
      fontStyle: "italic",
      marginRight: theme.spacing(2),
    },
    title: {
      fontStyle: "italic",
    },
    shadow: {
      textShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
    },
    buttonGroup: {
      display: "flex",
    },
    button: {
      display: "flex",
      flex: 1,
    },
  })
);

interface GameScheduleTableProps {
  tableData: GameInfo[];
  title: string;
}

export const GameScheduleTable: FC<GameScheduleTableProps> = ({
  tableData,
  title,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const lastGameId = useSelector(selectGameId);
  const gameType = useSelector(selectGameType);

  const handleRowClick = (gameId: string) => {
    if (lastGameId !== gameId) dispatch(setGameId(gameId));
  };

  const renderGames = tableData.map((row) => {
    const { day, month, hours, minutes } = parseDate(row.startTime);
    return (
      <ToggleButton
        data-testid="GameScheduleTable-game"
        key={row.id}
        value={row.id}
        aria-label={`${title} ${lastGameId}: ${row.startTime}`}
        onClick={() => handleRowClick(row.id)}
        className={classes.button}
      >
        <div>{`${day}/${month} ${hours}:${minutes}`}</div>
      </ToggleButton>
    );
  });

  return (
    <>
      <Box display="flex" m={2}>
        <Typography
          className={`${classes.gameType} ${classes.shadow}`}
          variant="h5"
          color="secondary"
          data-testid="GameSchedule-gameType"
        >
          {gameType}
        </Typography>
        <Typography variant="h6" color="primary">
          {title}
        </Typography>
      </Box>
      <ToggleButtonGroup
        value={lastGameId}
        exclusive
        aria-label="Game Selection"
        className={classes.buttonGroup}
      >
        {renderGames}
      </ToggleButtonGroup>
    </>
  );
};
