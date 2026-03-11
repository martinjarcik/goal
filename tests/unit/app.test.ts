import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { mountApp, renderApp } from "../../src/app";

describe("renderApp", () => {
  it("renders the Todo heading", () => {
    document.body.innerHTML = '<div id="app"></div>';

    const root = document.querySelector<HTMLElement>("#app");

    if (!root) {
      throw new Error("App root not found in test");
    }

    renderApp(root, []);

    expect(screen.getByRole("heading", { name: "Todo" })).toBeTruthy();
  });

  it("renders a labeled Todo card", () => {
    document.body.innerHTML = '<div id="app"></div>';

    const root = document.querySelector<HTMLElement>("#app");

    if (!root) {
      throw new Error("App root not found in test");
    }

    renderApp(root, []);

    expect(screen.getByRole("region", { name: "Todo app" })).toBeTruthy();
  });

  it("shows placeholder text when no todos exist", () => {
    document.body.innerHTML = '<div id="app"></div>';

    const root = document.querySelector<HTMLElement>("#app");

    if (!root) {
      throw new Error("App root not found in test");
    }

    renderApp(root, []);

    expect(
      screen.getByText("No todos yet. Start by adding your first item.")
    ).toBeTruthy();
  });

  it("renders one list row per todo item", () => {
    document.body.innerHTML = '<div id="app"></div>';

    const root = document.querySelector<HTMLElement>("#app");

    if (!root) {
      throw new Error("App root not found in test");
    }

    renderApp(root, [
      { id: "1", label: "Buy milk", completed: false },
      { id: "2", label: "Buy oranges", completed: false }
    ]);

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("Buy milk")).toBeTruthy();
    expect(screen.getByText("Buy oranges")).toBeTruthy();
  });

  it("hides the placeholder when todos exist", () => {
    document.body.innerHTML = '<div id="app"></div>';

    const root = document.querySelector<HTMLElement>("#app");

    if (!root) {
      throw new Error("App root not found in test");
    }

    renderApp(root, [{ id: "1", label: "Buy milk", completed: false }]);

    expect(
      screen.queryByText("No todos yet. Start by adding your first item.")
    ).toBeNull();
  });
});

describe("mountApp", () => {
  it("renders the add form with a disabled button when the input is empty", () => {
    document.body.innerHTML = '<div id="app"></div>';

    const root = document.querySelector<HTMLElement>("#app");

    if (!root) {
      throw new Error("App root not found in test");
    }

    mountApp(root, []);

    expect(screen.getByPlaceholderText("New item")).toBeTruthy();
    expect(
      (screen.getByRole("button", { name: "Add" }) as HTMLButtonElement)
        .disabled
    ).toBe(true);
  });

  it("enables the add button only when the trimmed input has text", async () => {
    document.body.innerHTML = '<div id="app"></div>';

    const root = document.querySelector<HTMLElement>("#app");

    if (!root) {
      throw new Error("App root not found in test");
    }

    mountApp(root, []);

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("New item"), "   ");
    expect(
      (screen.getByRole("button", { name: "Add" }) as HTMLButtonElement).disabled
    ).toBe(true);

    await user.clear(screen.getByPlaceholderText("New item"));
    await user.type(screen.getByPlaceholderText("New item"), "Buy bread");
    expect(
      (screen.getByRole("button", { name: "Add" }) as HTMLButtonElement).disabled
    ).toBe(false);
  });

  it("appends a new todo to the end of the list and clears the input on submit", async () => {
    document.body.innerHTML = '<div id="app"></div>';

    const root = document.querySelector<HTMLElement>("#app");

    if (!root) {
      throw new Error("App root not found in test");
    }

    mountApp(root, [{ id: "1", label: "Buy milk", completed: false }]);

    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText("New item"), "Buy bread");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(
      screen.getAllByRole("listitem").map((item) => item.textContent?.trim())
    ).toEqual(["Buy milk", "Buy bread"]);
    expect(
      (screen.getByPlaceholderText("New item") as HTMLInputElement).value
    ).toBe("");
  });

  it("submits the todo when the user presses Enter in the input", async () => {
    document.body.innerHTML = '<div id="app"></div>';

    const root = document.querySelector<HTMLElement>("#app");

    if (!root) {
      throw new Error("App root not found in test");
    }

    mountApp(root, []);

    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText("New item"), "Walk dog{Enter}");

    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText("Walk dog")).toBeTruthy();
  });
});
