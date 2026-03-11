import { expect, test } from "@playwright/test";

test("shows the neutral app scaffold", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId("app-root")).toBeVisible();
});
