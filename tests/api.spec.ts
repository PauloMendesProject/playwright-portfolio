import {test, expect } from '@playwright/test';


test('API GET request', async ({request}) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(1);
    expect(body.userId).toBe(1);
    expect(body.title).toBeTruthy();
});

test('API POST request', async ({request}) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: {
            title: 'Playwright API test',
            body: 'Learning POST request',
            userId: 1,
        },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.title).toBe('Playwright API test');
    expect(body.body).toBe('Learning POST request');
    expect(body.userId).toBe(1);
    expect(body.id).toBeTruthy();
});

test('API PUT request', async ({request}) => {
    const response = await request.put(
        'https://jsonplaceholder.typicode.com/posts/1', {
            data: {
                id: 1,
                title: 'Updated title',
                body: 'Updated body',
                userId: 1,
            },
        }
    );
    
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.title).toBe('Updated title');
    expect(body.body).toBe('Updated body');
});

test('API DELETE request', async ({request}) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
    
    expect(response.status()).toBe(200);
});