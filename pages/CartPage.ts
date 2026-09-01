import {Page, Locator } from '@playwright/test'

export class CartPage {
    private page: Page;

    cartLink: Locator;
    cartItems: Locator;

    constructor(page: Page){
        this.page = page;

        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartItems = page.locator('[data-test="inventory-item"]');
    }

    async openCart(){
        await this.cartLink.click();
    }

    getCartItem(productName: string){
        return this.cartItems.filter({hasText: productName});
    }
}