import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
const loginUsers = [{username: 'standard_user', password: 'secret_sauce'},
  {username: 'problem_user', password: 'secret_sauce'}
];
for (const user of loginUsers) {
  test(`Login works for ${user.username}`, async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill(user.username);
    await page.getByPlaceholder('Password').fill(user.password);

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory/);
  });
}
test('Login with valid credentials', async({page}) => {
   //go to SauceDemo
  await page.goto('https://www.saucedemo.com/');
  //page->browser tab, find element "Username" fill 'standar_user'
  await page.getByPlaceholder('Username').fill('standard_user'); 
  //same shit, but write password
  await page.getByPlaceholder('Password').fill('secret_sauce');
  //find button named Login and click
  await page.getByRole('button', {name: 'Login' }).click();
  //what we expect, that a page appears named .../inventory/
  await expect(page).toHaveURL(/inventory/);
  //check products
  await expect(page.getByText('Products')).toBeVisible();

  //Verify how many items does the product list have
  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);

  //Verify Sauce Labs Backpack
  await expect(page.getByText('Sauce Labs Backpack', {exact: true})).toBeVisible();

  //Find the specific product card
  const backpackCard = page
    .locator('.inventory_item')
    .filter({hasText: 'Sauce Labs Backpack'});

  //Add to cart
  await backpackCard.getByRole('button', {name: 'Add to cart'}).click();
  //Verify that the product is added
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  //Click shopping cart to enter cart directory
  await page.locator('[data-test="shopping-cart-link"]').click();
  //Verify that we are on cart directory
  await expect(page).toHaveURL(/cart/);

  //Verify that the specific item is in the cart and quantity
  const backpackCartItem = page
    .locator('[data-test="inventory-item"]')
    .filter({hasText: 'Sauce Labs Backpack'});

  await expect(backpackCartItem).toBeVisible();

  await expect(backpackCartItem.locator('[data-test="item-quantity"]')).toHaveText('1');
});

test.describe('Inventory tests', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('https://www.saucedemo.com');
    await page
      .getByPlaceholder('Username')
      .fill('standard_user');
    
    await page
      .getByPlaceholder('Password')
      .fill('secret_sauce');
      
    await page
      .getByRole('button', {name:'Login'})
      .click();

    await expect(page).toHaveURL(/inventory/);
  });

  test('Inventory has 6 products', async({page}) => {
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
  });

  test('Sauce Labs Backpack Available', async ({page}) => {
    await expect(page.getByText('Sauce Labs Backpack', {exact: true})).toBeVisible();
  });

  test('Sort products by price low to high', async ({page}) => {
    await page
      .locator('[data-test="product-sort-container"]')
      .selectOption({label: 'Price (low to high)'});

    await expect(page.locator('[data-test="inventory-item-price"]').first()).toHaveText('$7.99');
    await expect(page.locator('[data-test="inventory-item-price"]').last()).toHaveText('$49.99');

    const priceTexts = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    console.log(priceTexts);

    const prices = priceTexts.map(price => Number(price.replace('$', '')));
    console.log(prices);

    const sortedPrices = [...prices];
    sortedPrices.sort((a,b) => a-b);
    expect(prices).toEqual(sortedPrices);
  });
});

test('Checkbox practice', async ({page}) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
  await page.getByPlaceholder('What needs to be done?').fill('Learn Playwright');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.getByPlaceholder('What needs to be done?').fill('Uga buga');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  
  const todoItem = page.getByTestId('todo-item').filter({hasText: 'Learn Playwright'});
  
  const todoCheckbox = todoItem.getByRole('checkbox', {name: 'Toggle Todo'});

  await todoCheckbox.check(); //check the box
  await expect(todoCheckbox).toBeChecked(); //verify that it is checked

  await todoCheckbox.uncheck(); //uncheck the box
  await expect(todoCheckbox).not.toBeChecked(); //Verify that isn't checked
});

test('Radio button practice', async ({page}) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  const maleRadio = page.getByRole('radio', {name: 'Male', exact:true});
  const femaleRadio = page.getByRole('radio', {name: 'Female'});

  await maleRadio.check();
  await expect(femaleRadio).not.toBeChecked();
  
  await femaleRadio.check();
  await expect(maleRadio).not.toBeChecked();
});

test('Keyboard practice', async ({page}) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
  await page.getByPlaceholder('What needs to be done?').fill('Playwright');
  await page.getByPlaceholder('What needs to be done?').press('Control+A');
  await page.getByPlaceholder('What needs to be done?').pressSequentially('Learn Playwright');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  const todoItem = page.getByTestId('todo-item').filter({hasText: 'Learn Playwright'});
  await expect(todoItem).toBeVisible();
});

test('Mouse practice', async ({page}) => {
  await page.goto('https://testautomationpractice.blogspot.com');
  const field1 = page.locator('#field1');
  const field2 = page.locator('#field2');

  await field1.fill('NIGGER');
  
  const field1Value = await field1.inputValue();
  await page.getByRole('button', {name: 'Copy Text'}).dblclick();
  await expect(field2).toHaveValue(field1Value);
});

test('Hover practice', async ({page}) => {
  await page.goto('https://testautomationpractice.blogspot.com');
  await page.getByRole('button', {name: 'Point Me'}).hover();
  await expect(page.getByRole('link', {name: 'Mobiles'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'Laptops'})).toBeVisible();
});

test('Drag practice', async ({page}) => {
  await page.goto('https://testautomationpractice.blogspot.com');
  const sourceDrag = page.locator('#draggable');
  const targetDrop = page.locator('#droppable');
  
  await sourceDrag.dragTo(targetDrop);
  await expect(page.getByText('Dropped!')).toBeVisible();
});

test('File upload practice', async ({page}) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  await page.locator('#singleFileInput').setInputFiles('test-files/upload-test.txt');
  await page.getByRole('button', {name: 'Upload Single File'}).click();
  await expect(page.getByText(/Single file selected: upload-test\.txt/)).toBeVisible();
});

test('Multiple files upload practice', async ({page}) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  await page.locator('#multipleFilesInput').setInputFiles(['test-files/upload-test.txt','test-files/upload-test-2.txt']);
  await page.getByRole('button', {name: 'Upload Multiple Files'}).click();
  await expect(page.getByText('upload-test.txt')).toBeVisible();
  await expect(page.getByText('upload-test-2.txt')).toBeVisible();
});

test('Alert popups', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('I am an alert box!');
      await dialog.accept();
    });
    await page.getByRole('button', {name: 'Simple Alert'}).click();

    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('Press a button!');
      await dialog.accept();
    });
    await page.getByRole('button', {name: 'Confirmation Alert'}).click();
    
    page.once('dialog', async dialog =>{
      expect(dialog.message()).toBe('Please enter your name:');
      await dialog.accept('Playwright');
    });
    await page.getByRole('button', {name: 'Prompt Alert'}).click();
    await expect(page.getByText('Hello Playwright! How are you today?')).toBeVisible();
});

test('iFrames', async ({page}) => {
  await page.goto('https://playwrightlab.github.io/');
  const frame = page.frameLocator('[data-testid="practice-iframe"]');
  await frame.getByTestId('iframe-input-name').fill('Playwright'); //Name field
  await frame.getByTestId('iframe-textarea').fill('I dont fucking know this is a message'); //Message field
  await frame.getByTestId('iframe-select').selectOption({label: 'Critical'}); //Dropdown list
  await frame.getByTestId('iframe-checkbox').check(); //Checkbox
  await frame.getByTestId('iframe-submit').click(); //Submit button
  await expect(frame.getByTestId('iframe-result')).toBeVisible();
});

test('New tab practice', async ({page}) => {
  await page.goto('https://playwrightlab.github.io/');
  const newPagePromise = page.context().waitForEvent('page');
  await page.getByTestId('new-tab-btn').click();
  const newPage = await newPagePromise;
  await newPage.getByTestId('login-email').fill('test@playlab.com');
  await newPage.getByTestId('login-password').fill('Password123');
  await newPage.getByTestId('login-submit').click();
});

test('Popup windows', async ({page}) => {
  await page.goto('https://playwrightlab.github.io/');
  const newPopupPromise = page.context().waitForEvent('page');
  await page.getByTestId('popup-btn').click();
  const newPopup = await newPopupPromise;
  await newPopup.waitForLoadState();
  await newPopup.getByTestId('login-email').fill('test@playlab.com');
  await newPopup.getByTestId('login-password').fill('Password123');
  await newPopup.getByTestId('login-submit').click();
  await expect(newPopup.getByTestId('welcome-message')).toBeVisible();
});

test('Download files', async ({page}) => {
    await page.goto('https://playwrightlab.github.io/');
    const downloadPromise = page.waitForEvent('download');
    page.getByTestId('download-link').click();
    const download = await downloadPromise;
    console.log(download.suggestedFilename());
});

test('Screenshot practice', async ({ page }, testInfo) => {
  await page.goto('https://playwrightlab.github.io/');
  const screenshot = await page.screenshot();
  await testInfo.attach('homepage screenshot', {body: screenshot, contentType: 'image/png'});
});

test('Visual comparison practice', async ({page}) => {
  await page.goto('https://playwrightlab.github.io/');

  await expect(page).toHaveScreenshot('playlab-home.png');
});

test('Login using Page Object Model', async ({page}) => {
  await page.goto('https://www.saucedemo.com/');
  
  const constructorLoginPage = new LoginPage(page);

  await constructorLoginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
});

test('Add product using POM', async ({page}) => {
  await page.goto('https://www.saucedemo.com/');

  const constructorLoginPage = new LoginPage(page);
  const constructorInventoryPage = new InventoryPage(page);

  await constructorLoginPage.login('standard_user', 'secret_sauce');

  await constructorInventoryPage.addProductToCart('Sauce Labs Backpack');

  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
});

test('Complete cart flow using POM', async ({page}) => {
  await page.goto('https://www.saucedemo.com/');

  const constructorLoginPage = new LoginPage(page);
  const constructorInventoryPage = new InventoryPage(page);
  const constructorCartPage = new CartPage(page);

  await constructorLoginPage.login('standard_user', 'secret_sauce');
  
  await constructorInventoryPage.addProductToCart('Sauce Labs Backpack');
  
  await constructorCartPage.openCart();

  const backpack = constructorCartPage.getCartItem('Sauce Labs Backpack');

  await expect(backpack).toBeVisible();
});

test('Already logged in', async ({page}) => {
  await page.goto('https://www.saucedemo.com/inventory.html');  
  await expect(page).toHaveURL(/inventory/);
})