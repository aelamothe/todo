import React from "react";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // similar functionality to fireEvent but easier to use/ understand
import App from "./App";

test("ToDo", () => {
  const { getByText, getByLabelText } = render(<App />);
  getByText("TO-DO LIST");
  getByLabelText("Add todo:");
  getByText("Add #1");
});

test("add items to list", () => {
  const { getByText, getByLabelText } = render(<App />);
  const input = getByLabelText("Add todo:");
  // tests user interactions
  fireEvent.change(input, { target: { value: "wash car" } });
  fireEvent.click(getByText("Add #1"));
  // confirm data
  getByText("Add #2");
  getByText("wash car");
});

//userEvent expresses intent better
test("user-events allows users to add", () => {
  // handle on our render
  const { getByText, getByLabelText } = render(<App />);
  // grabs the elements with these texts (as if user is skimming the page)
  const input = getByLabelText("Add todo:");
  const button = getByText("Add #1");
  // this is what user does
  userEvent.type(input, "Learn Spanish");
  userEvent.click(button);
  // these are the results we expect
  getByText("Learn Spanish");
  getByText("Add #2");
});
