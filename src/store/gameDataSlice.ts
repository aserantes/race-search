import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from ".";

interface RaceStart {
  number: number;
  driver: {
    firstName: string;
    lastName: string;
  };
  horse: {
    name: string;
    trainer: {
      firstName: string;
      lastName: string;
    };
    pedigree: {
      father: {
        name: string;
      };
    };
  };
}

interface GameRace {
  id: string;
  date: string;
  name: string;
  number: number;
  scheduledStartTime: string;
  starts: RaceStart[];
}

export interface GameDataResults {
  id: string;
  races: GameRace[];
  status: string;
}

interface GameDataState {
  gameDataResults: GameDataResults | null;
  fetchState: "idle" | "pending" | "fulfilled" | "rejected";
  errorMessage: string;
}

const initialState: GameDataState = {
  gameDataResults: null,
  fetchState: "idle",
  errorMessage: "",
};

export const fetchGameById = createAsyncThunk(
  "gameData/fetchGameById",
  async (gameId: string, { rejectWithValue }) => {
    const response = await fetch(
      `https://www.atg.se/services/racinginfo/v1/api/games/${gameId}`
    );
    if (!response.ok) {
      return rejectWithValue(`${response.status} (${response.statusText})`);
    } else {
      return (await response.json()) as GameDataResults;
    }
  }
);

const gameDataSlice = createSlice({
  name: "gameData",
  initialState,
  reducers: {
    resetGameData: (state) => {
      state.gameDataResults = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameById.fulfilled, (state, action) => {
        state.fetchState = "fulfilled";
        state.gameDataResults = action.payload;
      })
      .addCase(fetchGameById.rejected, (state, action) => {
        state.fetchState = "rejected";
        state.errorMessage =
          (action.payload as string) ||
          action.error?.message ||
          "Unknown Error";
      })
      .addCase(fetchGameById.pending, (state, action) => {
        state.fetchState = "pending";
      });
  },
});

const { actions, reducer } = gameDataSlice;

// actions
export const { resetGameData } = actions;

// selectors
export const selectGameData = (state: RootState) =>
  state.gameData.gameDataResults;
export const selectGameDataFetchState = (state: RootState) =>
  state.gameData.fetchState;
export const selectGameDataFetchError = (state: RootState) =>
  state.gameData.errorMessage;

// reducer
export default reducer;
