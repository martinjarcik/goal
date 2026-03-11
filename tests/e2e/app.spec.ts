import { expect, test } from "@playwright/test";

test("shows the correct content for empty and populated todo states", async ({
  browser
}) => {
  const emptyPage = await browser.newPage();
  await emptyPage.goto("/");

  await expect(emptyPage.getByRole("heading", { name: "Todo" })).toBeVisible();
  await expect(
    emptyPage.getByText("No todos yet. Start by adding your first item.")
  ).toBeVisible();

  const seededContext = await browser.newContext();
  await seededContext.addInitScript(() => {
    (
      window as Window & {
        __TEST_TODOS__?: Array<{ id: string; label: string }>;
      }
    ).__TEST_TODOS__ = [
      { id: "1", label: "Buy milk" },
      { id: "2", label: "Buy oranges" }
    ];
  });

  const seededPage = await seededContext.newPage();
  await seededPage.goto("/");

  await expect(seededPage.getByRole("listitem")).toHaveCount(2);
  await expect(
    seededPage.getByText("No todos yet. Start by adding your first item.")
  ).toHaveCount(0);
});
