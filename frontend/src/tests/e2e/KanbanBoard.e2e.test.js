import { test, expect } from "@playwright/test";

test("User can add a task and see it on the board", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByPlaceholder("Enter Task").fill("Build Kanban Board");

  await page.getByText("Add Task").click();

  await expect(page.getByText("Build Kanban Board").first()).toBeVisible();
});

test("User can drag a task to In Progress", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const taskTitle = `Drag Task ${Date.now()}`;

  await page.getByPlaceholder("Enter Task").fill(taskTitle);
  await page.getByText("Add Task").click();

  const taskCard = page.getByText(taskTitle);
  const inProgress = page.getByRole("heading", {
    name: "In Progress",
  });

  await taskCard.dragTo(inProgress);
  await expect(taskCard).toBeVisible();
});
