import { screen } from "@testing-library/dom";
import { describe, expect, it } from "vitest";

import { renderApp } from "../../src/app";

describe("renderApp", () => {
  it("renders the Todo heading", () => {
    document.body.innerHTML = '<div id="app"></div>';

    const root = document.querySelector<HTMLElement>("#app");

    if (!root) {
      throw new Error("App root not found in test");
    }

    renderApp(root);

    expect(screen.getByRole("heading", { name: "Todo" })).toBeTruthy();
  });

  it("renders a labeled Todo card", () => {
    document.body.innerHTML = '<div id="app"></div>';

    const root = document.querySelector<HTMLElement>("#app");

    if (!root) {
      throw new Error("App root not found in test");
    }

    renderApp(root);

    expect(screen.getByRole("region", { name: "Todo app" })).toBeTruthy();
  });
});
