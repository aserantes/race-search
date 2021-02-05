import { Store } from "@reduxjs/toolkit";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react";
import { RootState } from "./store";
import { App } from "./App";
import withStore, { makeStore } from "./withStore";

let store: Store<RootState>;

beforeEach(() => {
  store = makeStore();
  render(withStore(App, store));
});

afterEach(() => {
  cleanup();
});

it("should render SearchInput", () => {
  const input = screen.getByLabelText("search") as HTMLInputElement;
  expect(input).toBeTruthy();
});

it("should initialize Search text input with and empty string", () => {
  const input = screen.getByLabelText("search") as HTMLInputElement;
  expect(input.value).toBe("");
});

it("should change text value when change event happens", () => {
  const input = screen.getByLabelText("search") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "something" } });
  expect(input.value).toBe("something");
  fireEvent.change(input, { target: { value: "" } });
  expect(input.value).toBe("");
});

it("should show Loading component when entering a valid search term", async () => {
  let gameTypeQuery = "V4";
  const input = screen.getByLabelText("search") as HTMLInputElement;
  fireEvent.change(input, { target: { value: gameTypeQuery } });
  await waitFor(() => screen.getByTestId("Loading-component"));
  const loadingComponent = screen.getByTestId("Loading-component");
  expect(loadingComponent).toBeInTheDocument();
});

it("should NOT show Loading component after succesful game schedule fetch", async () => {
  let gameTypeQuery = "V4";
  const input = screen.getByLabelText("search") as HTMLInputElement;
  fireEvent.change(input, { target: { value: gameTypeQuery } });
  await waitFor(() => screen.getByTestId("Loading-component"));
  expect(screen.queryAllByTestId("Loading-component")[0]).toBeTruthy();
  await waitFor(() => screen.getByTestId("GameSchedule-gameType"));
  expect(screen.queryAllByTestId("Loading-component")[0]).toBeFalsy();
});

it("should fetch the correct games", async () => {
  let gameTypeQuery = "V4";
  const input = screen.getByLabelText("search") as HTMLInputElement;
  fireEvent.change(input, { target: { value: gameTypeQuery } });
  await waitFor(() => screen.getByTestId("GameSchedule-gameType"));
  const gameTypeAtState = store.getState().searchInput.gameType;
  const gameTypeAtDom = screen.getByTestId("GameSchedule-gameType").innerHTML;
  expect(gameTypeAtState).toBe(gameTypeQuery);
  expect(gameTypeAtDom).toBe(gameTypeQuery);
});

it("should set gameId correctly when selecting a game from the game schedule", async () => {
  let gameTypeQuery = "V4";
  const input = screen.getByLabelText("search") as HTMLInputElement;
  fireEvent.change(input, { target: { value: gameTypeQuery } });
  await waitFor(() => screen.getByTestId("GameSchedule-gameType"));

  const gameAtDom = screen.queryAllByTestId(
    "GameScheduleTable-game"
  )[0] as HTMLInputElement;

  fireEvent.click(gameAtDom);
  const gameIdAtDom = gameAtDom.value;
  const gameIdAtState = store.getState().gameSchedule.gameId;
  expect(gameIdAtState).toBe(gameIdAtDom);
});

it("should fetch the correct races", async () => {
  let gameTypeQuery = "V4";
  const input = screen.getByLabelText("search") as HTMLInputElement;
  fireEvent.change(input, { target: { value: gameTypeQuery } });
  await waitFor(() => screen.getByTestId("GameSchedule-gameType"));

  const gameAtDom = screen.queryAllByTestId(
    "GameScheduleTable-game"
  )[0] as HTMLInputElement;

  fireEvent.click(gameAtDom);
  await waitFor(() => screen.getByTestId("GameDataTable-component"));
  const gameIdAtDom = gameAtDom.value;
  const gameIdAtFetchResults = store.getState().gameData.gameDataResults?.id;
  expect(gameIdAtFetchResults).toBe(gameIdAtDom);
});
