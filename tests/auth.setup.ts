import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill(process.env.SAUCE_USERNAME!);
  await page.getByPlaceholder('Password').fill(process.env.SAUCE_PASSWORD!);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory/);

  await page.context().storageState({
    path: 'auth/user.json'
  });
});