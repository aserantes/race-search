import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import searchInputReducer from "./searchInputSlice";
import gameScheduleReducer from "./gameScheduleSlice";
import gameDataReducer from "./gameDataSlice";

export const store = configureStore({
  reducer: {
    searchInput: searchInputReducer,
    gameSchedule: gameScheduleReducer,
    gameData: gameDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export { setGameType, selectGameType } from "./searchInputSlice";

export {
  fetchGamesByType,
  setGameId,
  selectGameSchedule,
  selectGameScheduleFetchState,
  selectUpcoming,
  selectResults,
  selectGameScheduleFetchError,
  selectGameId,
} from "./gameScheduleSlice";

export type { GameInfo } from "./gameScheduleSlice";

export {
  fetchGameById,
  resetGameData,
  selectGameDataFetchState,
  selectGameData,
  selectGameDataFetchError,
} from "./gameDataSlice";

export type { GameDataResults } from "./gameDataSlice";
