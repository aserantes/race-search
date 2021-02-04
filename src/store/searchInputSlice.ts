import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./";

interface SearchInputState {
  gameType: string;
}

const initialState: SearchInputState = {
  gameType: "",
};

const searchInputSlice = createSlice({
  name: "searchInput",
  initialState,
  reducers: {
    setGameType: (state, action: PayloadAction<string>) => {
      state.gameType = action.payload;
    },
  },
});

const { actions, reducer } = searchInputSlice;

// actions
export const { setGameType } = actions;

// selectors
export const selectGameType = (state: RootState) => state.searchInput.gameType;

// reducer
export default reducer;
