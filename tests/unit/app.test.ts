import { screen } from "@testing-library/dom";
import { describe, expect, it } from "vitest";

import { renderApp } from "../../src/app";

describe("renderApp", () => {
  it("renders the Todo shell with a heading and no later feature controls", () => {
    document.body.innerHTML = '<div id="app"></div>';

    const root = document.querySelector<HTMLElement>("#app");

    if (!root) {
      throw new Error("App root not found in test");
    }

    renderApp(root);

    expect(screen.getByRole("main")).toBeTruthy();
    expect(screen.getByRole("region", { name: "Todo app" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1, name: "Todo" })).toBeTruthy();
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.queryByRole("list")).toBeNull();
  });
});
