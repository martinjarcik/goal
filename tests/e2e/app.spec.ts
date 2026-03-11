import { expect, test } from "@playwright/test";

test("shows the application shell on first load", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Todo" })).toBeVisible();

  const card = page.getByLabel("Todo app");
  await expect(card).toBeVisible();

  const backgroundImage = await page.locator("body").evaluate((element) => {
    return window.getComputedStyle(element).backgroundImage;
  });

  expect(backgroundImage).not.toBe("none");
});
