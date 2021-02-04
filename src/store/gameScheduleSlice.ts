import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./";

export interface GameInfo {
  id: string;
  startTime: string;
}

interface GameScheduleResults {
  betType: string;
  upcoming: GameInfo[];
  results: GameInfo[];
}

interface GameScheduleState {
  gameScheduleResults: GameScheduleResults | null;
  fetchState: "idle" | "pending" | "fulfilled" | "rejected";
  gameId: string;
  errorMessage: string;
}

const initialState: GameScheduleState = {
  gameScheduleResults: null,
  fetchState: "idle",
  gameId: "",
  errorMessage: "",
};

export const fetchGamesByType = createAsyncThunk(
  "gameSchedule/fetchGamesByType",
  async (gameType: string, { rejectWithValue }) => {
    const response = await fetch(
      `https://www.atg.se/services/racinginfo/v1/api/products/${gameType}`
    );
    if (!response.ok) {
      return rejectWithValue(`${response.status} (${response.statusText})`);
    } else {
      return (await response.json()) as GameScheduleResults;
    }
  }
);

const gameScheduleSlice = createSlice({
  name: "gameSchedule",
  initialState,
  reducers: {
    setGameId: (state, action: PayloadAction<string>) => {
      state.gameId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGamesByType.fulfilled, (state, action) => {
        state.fetchState = "fulfilled";
        state.gameScheduleResults = action.payload;
      })
      .addCase(fetchGamesByType.rejected, (state, action) => {
        state.fetchState = "rejected";
        state.errorMessage =
          (action.payload as string) ||
          action.error?.message ||
          "Unknown Error";
      })
      .addCase(fetchGamesByType.pending, (state, action) => {
        state.fetchState = "pending";
      });
  },
});

const { actions, reducer } = gameScheduleSlice;

// actions
export const { setGameId } = actions;

// selectors
export const selectGameSchedule = (state: RootState) =>
  state.gameSchedule.gameScheduleResults;
export const selectGameScheduleFetchState = (state: RootState) =>
  state.gameSchedule.fetchState;
export const selectUpcoming = (state: RootState) =>
  state.gameSchedule.gameScheduleResults?.upcoming;
export const selectResults = (state: RootState) =>
  state.gameSchedule.gameScheduleResults?.results;
export const selectGameScheduleFetchError = (state: RootState) =>
  state.gameSchedule.errorMessage;
export const selectGameId = (state: RootState) => state.gameSchedule.gameId;

// reducer
export default reducer;
