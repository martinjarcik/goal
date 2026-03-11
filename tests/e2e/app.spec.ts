import { expect, test, type Locator } from "@playwright/test";

async function hasLineThroughText(locator: Locator): Promise<boolean> {
  return locator.evaluate(
    (element: Element) => window.getComputedStyle(element).textDecorationLine.includes("line-through")
  );
}

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

test("marks a todo as complete", async ({ page }) => {
  await page.addInitScript((todos) => {
    (window as { __GOAL_INITIAL_TODOS__?: Array<{ id: string; label: string }> }).__GOAL_INITIAL_TODOS__ =
      todos;
  }, [
    { id: "todo-1", label: "Walk the dog" },
    { id: "todo-2", label: "Read book" }
  ]);

  await page.goto("/");

  const toggle = page.getByRole("checkbox", { name: "Walk the dog" });
  const otherToggle = page.getByRole("checkbox", { name: "Read book" });
  const label = page.getByText("Walk the dog");
  const otherLabel = page.getByText("Read book");

  await expect(toggle).not.toBeChecked();
  await expect(otherToggle).not.toBeChecked();
  await expect.poll(async () => hasLineThroughText(label)).toBe(false);
  await expect.poll(async () => hasLineThroughText(otherLabel)).toBe(false);

  await toggle.click();

  await expect(toggle).toBeChecked();
  await expect(otherToggle).not.toBeChecked();
  await expect.poll(async () => hasLineThroughText(label)).toBe(true);
  await expect.poll(async () => hasLineThroughText(otherLabel)).toBe(false);
});

test("preserves in-progress add input text when toggling completion", async ({ page }) => {
  await page.addInitScript((todos) => {
    (window as { __GOAL_INITIAL_TODOS__?: Array<{ id: string; label: string }> }).__GOAL_INITIAL_TODOS__ =
      todos;
  }, [{ id: "todo-1", label: "Walk the dog" }]);

  await page.goto("/");

  const input = page.getByPlaceholder("New item");
  const toggle = page.getByRole("checkbox", { name: "Walk the dog" });

  await input.fill("Buy bread");
  await toggle.click();

  await expect(input).toHaveValue("Buy bread");
});

test("deletes a todo from the list", async ({ page }) => {
  await page.addInitScript((todos) => {
    (window as { __GOAL_INITIAL_TODOS__?: Array<{ id: string; label: string }> }).__GOAL_INITIAL_TODOS__ =
      todos;
  }, [
    { id: "todo-1", label: "Buy oranges" },
    { id: "todo-2", label: "Read book" }
  ]);

  await page.goto("/");

  const buyOrangesRow = page.getByRole("listitem").filter({ hasText: "Buy oranges" });
  const readBookRow = page.getByRole("listitem").filter({ hasText: "Read book" });
  const deleteButton = buyOrangesRow.getByRole("button", { name: "Delete todo" });

  await expect(buyOrangesRow).toBeVisible();
  await expect(readBookRow).toBeVisible();

  await deleteButton.click();

  await expect(buyOrangesRow).toHaveCount(0);
  await expect(readBookRow).toBeVisible();
  await expect(page.getByRole("listitem")).toHaveCount(1);
});
