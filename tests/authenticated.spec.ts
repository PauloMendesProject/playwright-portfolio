import { test, expect } from '@playwright/test';

test('Already logged in', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');

  await expect(page).toHaveURL(/inventory/);
});