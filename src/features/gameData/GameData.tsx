import React, { useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GameDataTable } from "./";
import { ErrorToast, Loading } from "../";
import {
  fetchGameById,
  selectGameDataFetchState,
  selectGameData,
  selectGameDataFetchError,
  selectGameId,
} from "../../store";

export const GameData: FC = () => {
  const dispatch = useDispatch();
  const fetchState = useSelector(selectGameDataFetchState);
  const gameId = useSelector(selectGameId);
  const gameData = useSelector(selectGameData);
  const error = useSelector(selectGameDataFetchError);

  useEffect(() => {
    if (gameId) {
      dispatch(fetchGameById(gameId));
    }
  }, [gameId, dispatch]);

  if (fetchState === "rejected") return <ErrorToast message={error} />;

  if (fetchState === "pending") return <Loading />;

  if (gameData) return <GameDataTable tableData={gameData} />;

  return null;
};
