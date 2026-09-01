import { test } from '../fixtures/testFixtures';
import { expect } from '@playwright/test';

test('Complete cart flow using fixtures', async ({page, loginPage, inventoryPage, cartPage}) => {
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await cartPage.openCart();
    const backpack = cartPage.getCartItem('Sauce Labs Backpack');
    await expect(backpack).toBeVisible();
});