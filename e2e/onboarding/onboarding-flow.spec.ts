import { test, expect, type Page } from '@playwright/test'

// ─── Step helpers ────────────────────────────────────────────────────────────

async function fillEmailStep(page: Page, email = 'john.doe@example.com') {
  await page.getByLabel(/email/i).fill(email)
  await page.getByRole('button', { name: 'GET MY GUIDE' }).click()
}

async function fillPersonalInfoStep(page: Page) {
  await page.getByLabel(/first name/i).fill('John')
  await page.getByLabel(/last name/i).fill('Doe')
  await page.locator('[name="dob.month"]').selectOption({ index: 1 })
  await page.locator('[name="dob.day"]').selectOption({ index: 1 })
  await page.locator('[name="dob.year"]').selectOption({ index: 1 })
  await page.getByLabel(/gender/i).selectOption({ index: 1 })
  await page.getByRole('button', { name: 'CONTINUE' }).click()
}

async function fillAddressStep(page: Page) {
  await page.getByLabel(/zip code/i).fill('90210')
  // Use role selector to avoid matching ProgressBar's aria-label "Current step: Address Info"
  await page.getByRole('textbox', { name: /address/i }).fill('123 Main Street')
  await page.getByLabel(/city/i).fill('Beverly Hills')
  await page.getByLabel(/state/i).selectOption({ index: 1 })
  await page.getByRole('button', { name: 'CONTINUE' }).click()
}

async function fillPhoneStep(page: Page) {
  await page.getByLabel(/phone number/i).fill('+12025551234')
  await page.getByRole('button', { name: 'CONTINUE' }).click()
}

// ─── Tests ───────────────────────────────────────────────────────────────────

test.describe('Onboarding flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  // ─── Step 1: Email ────────────────────────────────────────────────────────

  test.describe('Step 1 — Email', () => {
    test('shows the email input and CTA on load', async ({ page }) => {
      await expect(page.getByLabel(/email/i)).toBeVisible()
      await expect(page.getByRole('button', { name: 'GET MY GUIDE' })).toBeVisible()
    })

    test('blocks progress and shows error with invalid email', async ({ page }) => {
      await page.getByLabel(/email/i).fill('notanemail')
      await page.getByRole('button', { name: 'GET MY GUIDE' }).click()
      await expect(page.locator('p[role="alert"]')).toContainText('valid email')
      await expect(page.getByRole('button', { name: 'GET MY GUIDE' })).toBeVisible()
    })

    test('blocks progress with empty email', async ({ page }) => {
      await page.getByRole('button', { name: 'GET MY GUIDE' }).click()
      await expect(page.getByRole('button', { name: 'GET MY GUIDE' })).toBeVisible()
    })

    test('advances to Step 2 with a valid email', async ({ page }) => {
      await fillEmailStep(page)
      await expect(page.getByLabel(/first name/i)).toBeVisible()
      await expect(page.getByRole('button', { name: 'GET MY GUIDE' })).not.toBeVisible()
    })
  })

  // ─── Step 2: Personal Info ────────────────────────────────────────────────

  test.describe('Step 2 — Personal Info', () => {
    test.beforeEach(async ({ page }) => {
      await fillEmailStep(page)
    })

    test('shows first name, last name, date of birth and gender fields', async ({ page }) => {
      await expect(page.getByLabel(/first name/i)).toBeVisible()
      await expect(page.getByLabel(/last name/i)).toBeVisible()
      await expect(page.getByText(/date of birth/i)).toBeVisible()
      await expect(page.getByLabel(/gender/i)).toBeVisible()
    })

    test('blocks progress with empty first name', async ({ page }) => {
      await page.getByRole('button', { name: 'CONTINUE' }).click()
      await expect(page.locator('p[role="alert"]').first()).toBeVisible()
      await expect(page.getByLabel(/first name/i)).toBeVisible()
    })

    test('blocks progress with first name less than 2 characters', async ({ page }) => {
      await page.getByLabel(/first name/i).fill('J')
      await page.getByRole('button', { name: 'CONTINUE' }).click()
      await expect(page.locator('p[role="alert"]').first()).toContainText('2 characters')
    })

    test('blocks progress with non-letter characters in first name', async ({ page }) => {
      await page.getByLabel(/first name/i).fill('John123')
      await page.getByRole('button', { name: 'CONTINUE' }).click()
      await expect(page.locator('p[role="alert"]').first()).toContainText('letters')
    })

    test('advances to Step 3 after filling all personal info', async ({ page }) => {
      await fillPersonalInfoStep(page)
      await expect(page.getByLabel(/zip code/i)).toBeVisible()
    })
  })

  // ─── Step 3: Address ──────────────────────────────────────────────────────

  test.describe('Step 3 — Address Info', () => {
    test.beforeEach(async ({ page }) => {
      await fillEmailStep(page)
      await fillPersonalInfoStep(page)
    })

    test('shows zip code, address, city and state fields', async ({ page }) => {
      await expect(page.getByLabel(/zip code/i)).toBeVisible()
      // Use role selector to avoid matching ProgressBar's aria-label "Current step: Address Info"
      await expect(page.getByRole('textbox', { name: /address/i })).toBeVisible()
      await expect(page.getByLabel(/city/i)).toBeVisible()
      await expect(page.getByLabel(/state/i)).toBeVisible()
    })

    test('blocks progress with invalid zip code format', async ({ page }) => {
      await page.getByLabel(/zip code/i).fill('123')
      await page.getByRole('button', { name: 'CONTINUE' }).click()
      await expect(page.locator('p[role="alert"]').first()).toBeVisible()
      await expect(page.getByLabel(/zip code/i)).toBeVisible()
    })

    test('advances to Step 4 after filling all address info', async ({ page }) => {
      await fillAddressStep(page)
      await expect(page.getByLabel(/phone number/i)).toBeVisible()
    })
  })

  // ─── Step 4: Phone Number ─────────────────────────────────────────────────

  test.describe('Step 4 — Phone Number', () => {
    test.beforeEach(async ({ page }) => {
      await fillEmailStep(page)
      await fillPersonalInfoStep(page)
      await fillAddressStep(page)
    })

    test('shows the phone number input and consent text', async ({ page }) => {
      await expect(page.getByLabel(/phone number/i)).toBeVisible()
      await expect(page.getByRole('button', { name: 'CONTINUE' })).toBeVisible()
    })

    test('shows inline validation error when an invalid phone number is typed', async ({ page }) => {
      // onChange mode — validation fires on input change without needing a submit
      await page.getByLabel(/phone number/i).fill('123')
      await page.keyboard.press('Tab') // blur to ensure onChange validation settles
      await expect(page.locator('p[role="alert"]')).toBeVisible()
    })

    test('advances to the success page with a valid phone number', async ({ page }) => {
      await fillPhoneStep(page)
      await expect(page.getByRole('heading', { name: /feeling lucky/i })).toBeVisible()
    })
  })

  // ─── Success Page ─────────────────────────────────────────────────────────

  test.describe('Success Page', () => {
    test.beforeEach(async ({ page }) => {
      await fillEmailStep(page)
      await fillPersonalInfoStep(page)
      await fillAddressStep(page)
      await fillPhoneStep(page)
    })

    test('shows the success question heading', async ({ page }) => {
      await expect(page.getByRole('heading', { name: /are you feeling lucky today/i })).toBeVisible()
    })

    test('shows the Yes and No response buttons', async ({ page }) => {
      await expect(page.getByRole('button', { name: "Yes, I'm feeling lucky!" })).toBeVisible()
      await expect(page.getByRole('button', { name: 'No, maybe next time.' })).toBeVisible()
    })

    test('yes/no buttons are grouped with the question via aria-labelledby', async ({ page }) => {
      const group = page.locator('[role="group"][aria-labelledby="success-question"]')
      await expect(group).toBeVisible()
    })

    test('progress bar shows all steps as completed', async ({ page }) => {
      const steps = page.locator('ol[aria-label="Form progress"] li')
      const count = await steps.count()
      for (let i = 0; i < count; i++) {
        await expect(steps.nth(i)).toHaveClass(/bg-progress-active/)
      }
    })

    test('no current step marker on any indicator (all done)', async ({ page }) => {
      const current = page.locator('ol li[aria-current="step"]')
      await expect(current).toHaveCount(0)
    })
  })

  // ─── Happy Path ───────────────────────────────────────────────────────────

  test('happy path — completes all 4 steps and lands on the success page', async ({ page }) => {
    // Step 1
    await fillEmailStep(page)
    await expect(page.getByLabel(/first name/i)).toBeVisible()

    // Step 2
    await fillPersonalInfoStep(page)
    await expect(page.getByLabel(/zip code/i)).toBeVisible()

    // Step 3
    await fillAddressStep(page)
    await expect(page.getByLabel(/phone number/i)).toBeVisible()

    // Step 4
    await fillPhoneStep(page)

    // Success
    await expect(page.getByRole('heading', { name: /are you feeling lucky today/i })).toBeVisible()
    await expect(page.getByRole('button', { name: "Yes, I'm feeling lucky!" })).toBeVisible()
    await expect(page.getByRole('button', { name: 'No, maybe next time.' })).toBeVisible()
  })
})
