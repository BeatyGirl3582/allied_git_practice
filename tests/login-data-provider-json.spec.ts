const { test, expect } = require('@playwright/test');
const loginData = require('../test-data/login.json');

test('logs in with credentials from JSON', async ({ page }) => {
  await page.goto(process.env.LOGIN_URL || loginData.url);
  await page.getByLabel('Username').fill(loginData.username);
  await page.getByLabel('Password').fill(loginData.password);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/secure/);
  await expect(page.locator('#flash')).toContainText(loginData.successMessage);
});