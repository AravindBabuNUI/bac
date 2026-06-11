import { test, expect } from '@playwright/test';

test.describe('Button — onboarding flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ─── Rendering ────────────────────────────────────────────────────────────

  test('renders the primary CTA button with correct textbox', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'GET MY GUIDE' })).toBeVisible();
  });

  test('button is enabled on page load', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'GET MY GUIDE' })).toBeEnabled();
  });

  test('button has type="submit"', async ({ page }) => {
    const button = page.getByRole('button', { name: 'GET MY GUIDE' });
    await expect(button).toHaveAttribute('type', 'submit');
  });

  // ─── Styling ──────────────────────────────────────────────────────────────

  test('button applies secondary variant class', async ({ page }) => {
    const button = page.getByRole('button', { name: 'GET MY GUIDE' });
    await expect(button).toHaveClass(/bg-secondary/);
  });

  test('button applies pill border-radius (rounded prop)', async ({ page }) => {
    const button = page.getByRole('button', { name: 'GET MY GUIDE' });
    await expect(button).toHaveClass(/rounded-\[47px\]/);
  });

  test('button has cursor-pointer when enabled', async ({ page }) => {
    const button = page.getByRole('button', { name: 'GET MY GUIDE' });
    await expect(button).toHaveClass(/cursor-pointer/);
  });

  // ─── Accessibility ────────────────────────────────────────────────────────

  test('button has an accessible name', async ({ page }) => {
    const button = page.getByRole('button', { name: 'GET MY GUIDE' });
    const name = await button.getAttribute('aria-label') ?? await button.textContent();
    expect(name?.trim().length).toBeGreaterThan(0);
  });

  test('button is keyboard focusable', async ({ page }) => {
    // Tab 1 → email input, Tab 2 → GET MY GUIDE button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const button = page.getByRole('button', { name: 'GET MY GUIDE' });
    await expect(button).toBeFocused();
  });

  // ─── Behaviour ────────────────────────────────────────────────────────────

  test('clicking without a valid email keeps user on the email step', async ({ page }) => {
    await page.getByRole('button', { name: 'GET MY GUIDE' }).click();
    // still on email step — button still visible, no navigation occurred
    await expect(page.getByRole('button', { name: 'GET MY GUIDE' })).toBeVisible();
  });

  test('clicking with invalid email shows a validation error', async ({ page }) => {
    await page.getByRole('textbox').fill('notanemail');
    // onChange fires immediately — button is disabled, error visible without a submit click
    await expect(page.locator('p[role="alert"]')).toBeVisible();
    await expect(page.locator('p[role="alert"]')).toContainText('valid email');
    await expect(page.getByRole('button', { name: 'GET MY GUIDE' })).toBeDisabled();
  });

  test('clicking with a valid email advances to the next step', async ({ page }) => {
    await page.getByRole('textbox').fill('test@example.com');
    await page.getByRole('button', { name: 'GET MY GUIDE' }).click();
    // next step renders a CONTINUE button, not GET MY GUIDE
    await expect(page.getByRole('button', { name: 'CONTINUE' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'GET MY GUIDE' })).not.toBeVisible();
  });

  // ─── Success page buttons ─────────────────────────────────────────────────

  test('success page renders Yes/No buttons after completing all steps', async ({ page }) => {
    // fill email step
    await page.getByRole('textbox').fill('test@example.com');
    await page.getByRole('button', { name: 'GET MY GUIDE' }).click();

    // fill personal info step
    await page.getByRole('textbox', { name: /first name/i }).fill('John');
    await page.getByRole('textbox', { name: /last name/i }).fill('Doe');
    // dob selects — pick first available option for each
    const selects = page.locator('select');
    await selects.nth(0).selectOption({ index: 1 });
    await selects.nth(1).selectOption({ index: 1 });
    await selects.nth(2).selectOption({ value: '1990' }); // must be >= 18 yrs old
    // gender
    await selects.nth(3).selectOption({ index: 1 });
    await page.getByRole('button', { name: 'CONTINUE' }).click();

    // fill address step
    await page.getByRole('textbox', { name: /address/i }).fill('123 Main St');
    await page.locator('select').nth(0).selectOption({ index: 1 }); // state
    await page.getByRole('textbox', { name: /zip/i }).fill('90210');
    await page.getByRole('button', { name: 'CONTINUE' }).click();

    // fill phone step
    await page.getByRole('textbox', { name: /phone/i }).fill('+12025551234');
    await page.getByRole('button', { name: 'SUBMIT' }).click();

    // success page
    await expect(page.getByRole('button', { name: 'Yes' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'No' })).toBeVisible();
  });

  test('success page buttons have type="button"', async ({ page }) => {
    await page.getByRole('textbox').fill('test@example.com');
    await page.getByRole('button', { name: 'GET MY GUIDE' }).click();

    await page.getByRole('textbox', { name: /first name/i }).fill('John');
    await page.getByRole('textbox', { name: /last name/i }).fill('Doe');
    const selects = page.locator('select');
    await selects.nth(0).selectOption({ index: 1 });
    await selects.nth(1).selectOption({ index: 1 });
    await selects.nth(2).selectOption({ value: '1990' }); // must be >= 18 yrs old
    await selects.nth(3).selectOption({ index: 1 });
    await page.getByRole('button', { name: 'CONTINUE' }).click();

    await page.getByRole('textbox', { name: /address/i }).fill('123 Main St');
    await page.locator('select').nth(0).selectOption({ index: 1 });
    await page.getByRole('textbox', { name: /zip/i }).fill('90210');
    await page.getByRole('button', { name: 'CONTINUE' }).click();

    await page.getByRole('textbox', { name: /phone/i }).fill('+12025551234');
    await page.getByRole('button', { name: 'SUBMIT' }).click();

    await expect(
      page.getByRole('button', { name: 'Yes' })
    ).toHaveAttribute('type', 'button');
  });
});
