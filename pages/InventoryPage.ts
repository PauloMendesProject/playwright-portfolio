import {Page, Locator} from '@playwright/test';

export class InventoryPage {
    private page: Page;

    productsTitle: Locator;
    inventoryItems: Locator;

    constructor(page: Page){
        this.page = page;

        this.productsTitle = page.getByText('Products');
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
    }

    getProductCard(productName: string){
        return this.inventoryItems.filter({hasText: productName});
    }

    async addProductToCart(productName: string){
        const productCard = this.getProductCard(productName);

        await productCard.getByRole('button', {name: 'Add to cart'}).click();
    }
}