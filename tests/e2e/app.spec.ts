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

test("lets the user add a todo from the input row", async ({ page }) => {
  await page.goto("/");

  const input = page.getByPlaceholder("New item");
  const addButton = page.getByRole("button", { name: "Add" });

  await expect(input).toBeVisible();
  await expect(addButton).toBeDisabled();

  await input.fill("Buy bread");
  await expect(addButton).toBeEnabled();

  await addButton.click();

  await expect(page.getByRole("listitem")).toHaveCount(1);
  await expect(page.getByText("Buy bread")).toBeVisible();
  await expect(input).toHaveValue("");
});
