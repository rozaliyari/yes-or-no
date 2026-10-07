import { test, expect } from '@playwright/test';

test('Persian mode uses RTL and has no horizontal overflow', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'فارسی', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
  await expect(page.getByRole('status')).toHaveText('نیت کردی؟');
  await expect(page.getByRole('button', { name: 'جوابمو بگو' })).toBeEnabled();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

for (const [value, answer] of [[0.1, 'آره!'], [0.8, 'نه!']]) {
  test(`random value ${value} reveals ${answer} and allows another draw`, async ({ page }) => {
    await page.addInitScript(value => { Math.random = () => value; }, value);
    await page.goto('/');
    await page.getByRole('button', { name: 'فارسی', exact: true }).click();
    const button = page.locator('#ask');
    await button.click();
    await expect(button).toBeDisabled();
    await expect(page.getByRole('status')).toHaveAttribute('aria-busy', 'true');
    await expect(page.getByRole('status')).toHaveText(answer);
    await expect(button).toBeEnabled();
    await expect(page.getByRole('status')).not.toHaveAttribute('aria-busy', 'true');
    await button.click();
    await expect(button).toBeDisabled();
    await expect(page.getByRole('status')).toHaveText(answer);
    await expect(button).toBeEnabled();
  });
}

test('keyboard users can draw a fortune', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(page.locator('#ask')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toHaveText(/^(Yes!|No!)$/);
});

test('reduced motion disables the pulsing animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'فارسی', exact: true }).click();
  await page.locator('#ask').click();
  expect(await page.locator('#orb').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  await expect(page.getByRole('status')).toHaveText(/^(آره!|نه!)$/);
});

test('language switch translates the page and preserves the answer', async ({ page }) => {
  await page.addInitScript(() => { Math.random = () => 0.1; });
  await page.goto('/');
  await page.getByRole('button', { name: 'فارسی', exact: true }).click();
  await page.getByRole('button', { name: 'English', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.getByRole('status')).toHaveText('Made a wish?');
  await page.locator('#ask').click();
  await expect(page.getByRole('status')).toHaveText('Yes!');
  await page.getByRole('button', { name: 'فارسی', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.getByRole('status')).toHaveText('آره!');
});

test('English is the default language', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.locator('#ask')).toHaveText('Tell me my answer ↗');
});
