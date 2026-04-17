// @ts-check
import { test, expect } from '../fixtures/test.js';
import { config } from '../config/environments.js';
import { validCredentials, invalidCredentials } from '../config/testData.js';
import { timeouts } from '../config/timeouts.js';

const HOME_URL = config.homeURL;

// Increase timeout for all tests
test.setTimeout(timeouts.test);

test.describe('Sign In Page Tests', () => {

  // ==================== Navigation Tests ====================

  test.describe('Navigation', () => {

    test('should navigate to sign in page from landing page', async ({ landingPage, page }) => {
      await page.goto(HOME_URL, { waitUntil: 'domcontentloaded', timeout: timeouts.navigation });
      await landingPage.clickLogin();
      await expect(page).toHaveURL(/sign-in/, { timeout: timeouts.urlChange });
    });

    test('should load sign in page with form elements', async ({ signInPage }) => {
      await signInPage.goto();
      await expect(signInPage.emailInput).toBeVisible();
      await expect(signInPage.passwordInput).toBeVisible();
    });

  });

  // ==================== UI Element Visibility Tests ====================

  test.describe('UI Elements Visibility', () => {

    test.beforeEach(async ({ signInPage }) => {
      await signInPage.goto();
    });

    test('should display all form elements', async ({ signInPage }) => {
      await expect(signInPage.welcomeHeading).toBeVisible();
      await expect(signInPage.emailInput).toBeVisible();
      await expect(signInPage.passwordInput).toBeVisible();
      await expect(signInPage.rememberMeCheckbox).toBeVisible();
      await expect(signInPage.signInButton).toBeVisible();
    });

    test('should display Google sign in button', async ({ signInPage }) => {
      await expect(signInPage.googleSignInButton).toBeVisible();
    });

    test('should display forget password and sign up links', async ({ signInPage }) => {
      await expect(signInPage.forgetPasswordLink).toBeVisible();
      await expect(signInPage.signUpLink).toBeVisible();
    });

  });

  // ==================== Positive Test Cases ====================

  test.describe('Positive Test Cases', () => {

    test.beforeEach(async ({ signInPage }) => {
      await signInPage.goto();
    });

    test('should sign in successfully with valid credentials', async ({ signInPage, page }) => {
      await signInPage.signIn(validCredentials.email, validCredentials.password);
      await expect(page).toHaveURL(/app/, { timeout: timeouts.urlChangeAfterLogin });
    });

    test('should sign in with remember me checked', async ({ signInPage, page }) => {
      await signInPage.signIn(validCredentials.email, validCredentials.password, { rememberMe: true });
      await expect(page).toHaveURL(/app/, { timeout: timeouts.urlChangeAfterLogin });
    });

    test('should allow typing in form fields', async ({ signInPage }) => {
      await signInPage.enterEmail(validCredentials.email);
      await signInPage.enterPassword(validCredentials.password);

      expect(await signInPage.getEmailValue()).toBe(validCredentials.email);
      expect(await signInPage.getPasswordValue()).toBe(validCredentials.password);
    });

    test('should toggle remember me checkbox', async ({ signInPage }) => {
      await signInPage.checkRememberMe();
      expect(await signInPage.isRememberMeChecked()).toBeTruthy();

      await signInPage.uncheckRememberMe();
      expect(await signInPage.isRememberMeChecked()).toBeFalsy();
    });

    test('should navigate to forget password page', async ({ signInPage, page }) => {
      await signInPage.clickForgetPassword();
      await expect(page).toHaveURL(/forget/, { timeout: timeouts.urlChange });
    });

    test('should navigate to sign up page', async ({ signInPage, page }) => {
      await signInPage.clickSignUp();
      await expect(page).toHaveURL(/signup/, { timeout: timeouts.urlChange });
    });

  });

  // ==================== Negative Test Cases ====================

  test.describe('Negative Test Cases', () => {

    test.beforeEach(async ({ signInPage }) => {
      await signInPage.goto();
    });

    test('should not sign in with wrong email', async ({ signInPage, page }) => {
      await signInPage.signIn(invalidCredentials.wrongEmail, validCredentials.password);
      await expect(page).toHaveURL(/sign-in/, { timeout: timeouts.urlChangeFast });
    });

    test('should not sign in with wrong password', async ({ signInPage, page }) => {
      await signInPage.signIn(validCredentials.email, invalidCredentials.wrongPassword);
      await expect(page).toHaveURL(/sign-in/, { timeout: timeouts.urlChangeFast });
    });

    test('should not sign in with empty fields', async ({ signInPage, page }) => {
      await signInPage.clickSignIn();
      await expect(page).toHaveURL(/sign-in/, { timeout: timeouts.urlChangeFast });
    });

    test('should not sign in with malformed email', async ({ signInPage, page }) => {
      await signInPage.signIn(invalidCredentials.malformedEmail, validCredentials.password);
      await expect(page).toHaveURL(/sign-in/, { timeout: timeouts.urlChangeFast });
    });

  });

  // ==================== Edge Case Tests ====================

  test.describe('Edge Case Tests', () => {

    test.beforeEach(async ({ signInPage }) => {
      await signInPage.goto();
    });

    test('should handle SQL injection attempt', async ({ signInPage, page }) => {
      await signInPage.signIn(invalidCredentials.sqlInjection, validCredentials.password);
      await expect(page).toHaveURL(/sign-in/, { timeout: timeouts.urlChangeFast });
    });

    test('should handle XSS attempt', async ({ signInPage, page }) => {
      await signInPage.signIn(invalidCredentials.xssScript, validCredentials.password);
      await expect(page).toHaveURL(/sign-in/, { timeout: timeouts.urlChangeFast });
    });

    test('should handle special characters in password', async ({ signInPage, page }) => {
      await signInPage.signIn(validCredentials.email, invalidCredentials.specialChars);
      await expect(page).toHaveURL(/sign-in/, { timeout: timeouts.urlChangeFast });
    });

    test('should handle long email input', async ({ signInPage }) => {
      await signInPage.enterEmail(invalidCredentials.longEmail);
      const value = await signInPage.getEmailValue();
      expect(value.length).toBeGreaterThan(0);
    });

    test('should handle long password input', async ({ signInPage }) => {
      await signInPage.enterPassword(invalidCredentials.longPassword);
      const value = await signInPage.getPasswordValue();
      expect(value.length).toBeGreaterThan(0);
    });

    test('should clear form fields', async ({ signInPage }) => {
      await signInPage.enterEmail(validCredentials.email);
      await signInPage.enterPassword(validCredentials.password);
      await signInPage.clearForm();

      expect(await signInPage.getEmailValue()).toBe('');
      expect(await signInPage.getPasswordValue()).toBe('');
    });

    test('should mask password input', async ({ signInPage }) => {
      const inputType = await signInPage.passwordInput.getAttribute('type');
      expect(inputType).toBe('password');
    });

  });

  // ==================== Accessibility Tests ====================

  test.describe('Accessibility Tests', () => {

    test.beforeEach(async ({ signInPage }) => {
      await signInPage.goto();
    });

    test('should have focusable form elements', async ({ signInPage, page }) => {
      await signInPage.emailInput.focus();
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('should submit form with Enter key', async ({ signInPage, page }) => {
      await signInPage.enterEmail(validCredentials.email);
      await signInPage.enterPassword(validCredentials.password);
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/app/, { timeout: timeouts.urlChangeAfterLogin });
    });

  });

  // ==================== Responsive Tests ====================

  test.describe('Responsive Tests', () => {

    test('should display correctly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(HOME_URL, { waitUntil: 'domcontentloaded', timeout: timeouts.navigation });

      const hamburger = page.locator('.navbar-toggler').first();
      await hamburger.waitFor({ state: 'visible', timeout: timeouts.elementVisible });
      await hamburger.click();

      await page.getByRole('link', { name: 'Login' }).click();
      await expect(page).toHaveURL(/sign-in/, { timeout: timeouts.urlChange });

      await expect(page.getByRole('textbox', { name: 'Enter your email address' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Sign In', exact: true })).toBeVisible();
    });

    test('should display correctly on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto(HOME_URL, { waitUntil: 'domcontentloaded', timeout: timeouts.navigation });

      const hamburger = page.locator('.navbar-toggler').first();
      if (await hamburger.isVisible()) {
        await hamburger.click();
      }

      await page.getByRole('link', { name: 'Login' }).click();
      await expect(page).toHaveURL(/sign-in/, { timeout: timeouts.urlChange });

      await expect(page.getByRole('textbox', { name: 'Enter your email address' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Sign In', exact: true })).toBeVisible();
    });

  });

});
