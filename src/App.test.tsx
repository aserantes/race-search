import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

afterEach(cleanup);

it("should match a snapshot", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(
    asFragment(
      <Provider store={store}>
        <App />
      </Provider>
    )
  ).toMatchSnapshot();
});
