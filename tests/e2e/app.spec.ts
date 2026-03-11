import { expect, test } from "@playwright/test";

test("shows the Todo app shell on first load", async ({ page }) => {
  await page.goto("/");

  const shell = page.getByRole("main");
  const card = page.getByRole("region", { name: "Todo app" });

  await expect(shell).toBeVisible();
  await expect(card).toBeVisible();


});
