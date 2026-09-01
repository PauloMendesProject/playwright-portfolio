import{test, expect} from '@playwright/test';

test('Mock an API response', async ({page}) => {
    await page.route('**/posts/1', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                userId: 1,
                id: 1,
                title: 'Mocked title',
                body: 'This response came from playwright',
            }),
        });
    });
    
    await page.goto('https://jsonplaceholder.typicode.com/posts/1');

    const body = await page.textContent('body');

    expect(body).toContain('Mocked title');
});

test('Mock an API error', async ({page}) => {
    await page.route('**/posts/1', async route => {
        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({
                error: 'Internal Server Error',
            }),
        });   
    });
    
    const response = await page.goto('https://jsonplaceholder.typicode.com/posts/1');

    expect(response?.status()).toBe(500);
});

test('Modify outgoing request', async ({page}) => {
    await page.route('**/posts/1', async route => {
        const request = route.request();

        console.log(request.method());
        console.log(request.url());

        await route.continue();
    });

    await page.goto('https://jsonplaceholder.typicode.com/posts/1');
});

test('Modify request headers', async ({page}) => {
    await page.route('**/posts/1', async route => {
        const headers = {
            ...route.request().headers(),
            'x-test-header': 'playwright',
        };

        await route.continue({headers});
    });

    await page.goto('https://jsonplaceholder.typicode.com/posts/1');
});