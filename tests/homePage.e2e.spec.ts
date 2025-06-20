import { test, expect } from "@playwright/test"

const BASE_URL = 'http://localhost:3000'

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL)
});

test.describe('Homepage', () => {
  test('Has correct title', async ({ page }) => {
  
    await expect(page).toHaveTitle('Music player')
  })

  test('Has working navigation link to tracks page', async ({page}) => {
    const link = page.locator('a[href="/tracks"]');

    link.first().click()

    await expect(page).toHaveURL(`${BASE_URL}/tracks`);
  })
})