import React, { useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GameScheduleTable } from "./";
import { ErrorToast, Loading } from "../";
import {
  fetchGamesByType,
  selectGameScheduleFetchState,
  selectGameType,
  selectUpcoming,
  selectResults,
  selectGameScheduleFetchError,
} from "../../store";

export const GameSchedule: FC = () => {
  const dispatch = useDispatch();
  const gameType = useSelector(selectGameType);
  const fetchState = useSelector(selectGameScheduleFetchState);
  const upcoming = useSelector(selectUpcoming);
  const results = useSelector(selectResults);
  const error = useSelector(selectGameScheduleFetchError);

  useEffect(() => {
    if (gameType) {
      dispatch(fetchGamesByType(gameType));
    }
  }, [gameType, dispatch]);

  if (fetchState === "rejected") return <ErrorToast message={error} />;

  if (fetchState === "pending") return <Loading />;

  if (upcoming)
    return <GameScheduleTable title="Upcoming Games" tableData={upcoming} />;

  if (results)
    return <GameScheduleTable title="Games Results" tableData={results} />;

  return null;
};
