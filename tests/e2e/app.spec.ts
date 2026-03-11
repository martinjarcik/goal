import { expect, test } from "@playwright/test";

test("shows the Todo app shell on first load", async ({ page }) => {
  await page.goto("/");

  const shell = page.getByRole("main");
  const card = page.getByRole("region", { name: "Todo app" });

  await expect(shell).toBeVisible();
  await expect(card).toBeVisible();
  await expect(page.getByRole("heading", { level: 1, name: "Todo" })).toBeVisible();

  const backgroundImage = await shell.evaluate(
    (element) => window.getComputedStyle(element).backgroundImage
  );

  expect(backgroundImage).toContain("linear-gradient");

  const shellBox = await shell.boundingBox();
  const cardBox = await card.boundingBox();

  if (!shellBox || !cardBox) {
    throw new Error("Expected the Todo shell and card to have layout boxes");
  }

  const shellCenterX = shellBox.x + shellBox.width / 2;
  const shellCenterY = shellBox.y + shellBox.height / 2;
  const cardCenterX = cardBox.x + cardBox.width / 2;
  const cardCenterY = cardBox.y + cardBox.height / 2;

  expect(Math.abs(shellCenterX - cardCenterX)).toBeLessThanOrEqual(24);
  expect(Math.abs(shellCenterY - cardCenterY)).toBeLessThanOrEqual(24);
});
