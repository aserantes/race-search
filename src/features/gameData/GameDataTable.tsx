import React, { FC } from "react";
import { GameDataResults } from "../../store";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import { parseDate } from "../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    content: {
      margin: 0,
    },
    raceTitle: {
      backgroundColor: "rgba(255,127,0,0.10)",
      padding: theme.spacing(1),
    },
    startNumber: {
      backgroundColor: "rgba(192,127,0,0.5)",
      color: "white",
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(1),
      fontSize: "1rem",
    },
    horseName: {
      fontWeight: "bold",
      marginRight: theme.spacing(1),
    },
    driverName: {
      fontStyle: "italic",
    },
  })
);

interface GameDataTableProps {
  tableData: GameDataResults;
}

export const GameDataTable: FC<GameDataTableProps> = ({ tableData }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper} data-testid="GameDataTable-component">
      {tableData.races.map((race) => {
        const { name, number, id, scheduledStartTime, starts } = race;
        const { hours, minutes } = parseDate(scheduledStartTime);
        return (
          <div key={id}>
            <Paper className={classes.raceTitle}>
              <Box display="flex">
                <Typography variant="h6">
                  {`Race #${number}`}&nbsp;-&nbsp;
                </Typography>
                <Typography variant="h6">{`Starts ${hours}:${minutes}`}</Typography>
                {name && (
                  <Typography variant="h6">&nbsp;-&nbsp;{name}</Typography>
                )}
              </Box>
            </Paper>
            {starts.map((start) => {
              const {
                number,
                horse: {
                  name: horseName,
                  trainer: {
                    firstName: trainerFirstName,
                    lastName: trainerLastName,
                  },
                  pedigree: {
                    father: { name: horseFather },
                  },
                },
                driver: {
                  firstName: driverFirstName,
                  lastName: driverLastName,
                },
              } = start;
              return (
                <Accordion key={start.number}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`race-${id}-content`}
                    id={`race-${id}-header`}
                    classes={{ content: classes.content }}
                  >
                    <Avatar sizes="xs" className={classes.startNumber}>
                      {number}
                    </Avatar>
                    <Typography className={classes.horseName}>
                      {horseName.toUpperCase()}
                    </Typography>
                    <Typography
                      className={classes.driverName}
                    >{`${driverFirstName} ${driverLastName}`}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{`Trainer: ${trainerFirstName} ${trainerLastName} | Father: ${horseFather.toUpperCase()}`}</Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
