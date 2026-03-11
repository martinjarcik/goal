import { expect, test } from "@playwright/test";

test("shows the Todo app shell on first load", async ({ page }) => {
  await page.goto("/");

  const shell = page.getByRole("main");
  const card = page.getByRole("region", { name: "Todo app" });

  await expect(shell).toBeVisible();
  await expect(card).toBeVisible();


});

test("shows the correct todo content for empty and populated states", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("No todos yet.")).toBeVisible();
  await expect(page.getByRole("list")).toHaveCount(0);

  await page.addInitScript((todos) => {
    (window as { __GOAL_INITIAL_TODOS__?: Array<{ id: string; label: string }> }).__GOAL_INITIAL_TODOS__ =
      todos;
  }, [
    { id: "todo-1", label: "Buy milk" },
    { id: "todo-2", label: "Read book" }
  ]);

  await page.reload();

  await expect(page.getByText("No todos yet.")).toHaveCount(0);
  await expect(page.getByRole("list")).toBeVisible();
  await expect(page.getByRole("listitem")).toHaveCount(2);
  await expect(page.getByText("Buy milk")).toBeVisible();
  await expect(page.getByText("Read book")).toBeVisible();
});

test("adds a todo from the input row", async ({ page }) => {
  await page.goto("/");

  const input = page.getByPlaceholder("New item");
  const addButton = page.getByRole("button", { name: "Add" });

  await expect(input).toBeVisible();
  await expect(addButton).toBeDisabled();

  await input.fill("Buy bread");

  await expect(addButton).toBeEnabled();

  await addButton.click();

  await expect(input).toHaveValue("");
  await expect(addButton).toBeDisabled();
  await expect(page.getByText("No todos yet.")).toHaveCount(0);
  await expect(page.getByRole("list")).toBeVisible();
  await expect(page.getByRole("listitem")).toHaveCount(1);
  await expect(page.getByText("Buy bread")).toBeVisible();
});
