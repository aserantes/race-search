import { configureStore, Store } from "@reduxjs/toolkit";
import React, { ComponentType, ReactElement } from "react";
import { Provider } from "react-redux";
import gameDataReducer from "./store/gameDataSlice";
import gameScheduleReducer from "./store/gameScheduleSlice";
import searchInputReducer from "./store/searchInputSlice";
import { RootState } from "./store";

export const makeStore = (): Store<RootState> => {
  return configureStore({
    reducer: {
      searchInput: searchInputReducer,
      gameSchedule: gameScheduleReducer,
      gameData: gameDataReducer,
    },
  });
};

const withRedux = (
  Component: ComponentType,
  store: Store<RootState> | null = null,
  props = {}
): ReactElement => {
  return (
    <Provider store={store || makeStore()}>
      <Component {...props} />
    </Provider>
  );
};

export default withRedux;
