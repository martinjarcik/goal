import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { renderApp } from "../../src/app";

describe("renderApp", () => {
  it("renders the Todo shell with the add form disabled initially", () => {
    document.body.innerHTML = '<div id="app"></div>';

    const root = document.querySelector<HTMLElement>("#app");

    if (!root) {
      throw new Error("App root not found in test");
    }

    renderApp(root);

    expect(screen.getByRole("main")).toBeTruthy();
    expect(screen.getByRole("region", { name: "Todo app" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1, name: "Todo" })).toBeTruthy();
    expect(screen.getByPlaceholderText("New item")).toBeTruthy();
    expect((screen.getByRole("button", { name: "Add" }) as HTMLButtonElement).disabled).toBe(true);
    expect(screen.queryByRole("list")).toBeNull();
  });

  it("shows empty-state helper text when there are no todos", () => {
    document.body.innerHTML = '<div id="app"></div>';

    const root = document.querySelector<HTMLElement>("#app");

    if (!root) {
      throw new Error("App root not found in test");
    }

    renderApp(root, []);

    expect(screen.getByText("No todos yet.")).toBeTruthy();
    expect(screen.queryByRole("list")).toBeNull();
  });

  it("renders a passive list when todos are provided", () => {
    document.body.innerHTML = '<div id="app"></div>';

    const root = document.querySelector<HTMLElement>("#app");

    if (!root) {
      throw new Error("App root not found in test");
    }

    renderApp(root, [
      { id: "todo-1", label: "Buy milk" },
      { id: "todo-2", label: "Read book" }
    ]);

    expect(screen.queryByText("No todos yet.")).toBeNull();
    expect(screen.getByRole("list")).toBeTruthy();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("Buy milk")).toBeTruthy();
    expect(screen.getByText("Read book")).toBeTruthy();
    expect((screen.getByRole("button", { name: "Add" }) as HTMLButtonElement).disabled).toBe(true);
  });

  it("enables submit only when the trimmed input has content", async () => {
    document.body.innerHTML = '<div id="app"></div>';

    const root = document.querySelector<HTMLElement>("#app");

    if (!root) {
      throw new Error("App root not found in test");
    }

    renderApp(root, []);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("New item");
    const addButton = screen.getByRole("button", { name: "Add" });

    await user.type(input, "   ");

    expect((addButton as HTMLButtonElement).disabled).toBe(true);

    await user.clear(input);
    await user.type(input, "Buy bread");

    expect((addButton as HTMLButtonElement).disabled).toBe(false);
  });
});
