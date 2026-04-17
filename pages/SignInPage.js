// @ts-check
import { BasePage } from './BasePage.js';
import { config } from '../config/environments.js';
import { timeouts } from '../config/timeouts.js';

/**
 * @typedef {import('@playwright/test').Page} Page
 */

const HOME_URL = config.homeURL;

export class SignInPage extends BasePage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    super(page);

    // Page Header Elements
    this.welcomeHeading = page.getByRole('heading', { name: 'Welcome to Complya.' });
    this.subHeadingText = page.getByText('Manage your clients, notes,');

    // Social Sign In
    this.googleSignInButton = page.getByRole('button', { name: 'google Sign in with Google' });

    // Form Elements
    this.emailInput = page.getByRole('textbox', { name: 'Enter your email address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Enter Password' });
    this.rememberMeCheckbox = page.getByRole('checkbox', { name: 'Remember me' });
    this.rememberMeLabel = page.getByText('Remember me');
    this.forgetPasswordLink = page.getByRole('link', { name: 'Forget password' });
    this.signInButton = page.getByRole('button', { name: 'Sign In', exact: true });

    // Sign Up Section
    this.signUpText = page.getByText("Don't have an account? Sign Up");
    this.signUpLink = page.getByRole('link', { name: 'Sign Up' });

    // Terms Section
    this.termsText = page.getByText('By continuing, you agree to');

    // Error Messages
    this.emailError = page.locator('[class*="error"], [class*="invalid"]').first();
    this.passwordError = page.locator('[class*="error"], [class*="invalid"]').last();
    this.generalError = page.locator('[class*="alert"], [class*="error-message"], [role="alert"]');

    // Login link on landing page
    this.loginLink = page.getByRole('link', { name: 'Login' });
  }

  // ==================== Navigation Methods ====================

  async goto() {
    await this.page.goto(HOME_URL, { waitUntil: 'domcontentloaded', timeout: timeouts.navigation });
    await this.loginLink.waitFor({ state: 'visible', timeout: timeouts.elementLong });
    await this.loginLink.click();
    await this.emailInput.waitFor({ state: 'visible', timeout: timeouts.elementVeryLong });
  }

  // ==================== Form Actions ====================

  /**
   * Enter email address
   * @param {string} email
   */
  async enterEmail(email) {
    await this.emailInput.click();
    await this.emailInput.fill(email);
  }

  /**
   * Enter password
   * @param {string} password
   */
  async enterPassword(password) {
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
  }

  /**
   * Check remember me checkbox
   */
  async checkRememberMe() {
    await this.rememberMeCheckbox.check();
  }

  /**
   * Uncheck remember me checkbox
   */
  async uncheckRememberMe() {
    await this.rememberMeCheckbox.uncheck();
  }

  /**
   * Click sign in button
   */
  async clickSignIn() {
    await this.signInButton.click();
  }

  /**
   * Click forget password link
   */
  async clickForgetPassword() {
    await this.forgetPasswordLink.click();
  }

  /**
   * Click sign up link
   */
  async clickSignUp() {
    await this.signUpLink.click();
  }

  /**
   * Click Google sign in button
   */
  async clickGoogleSignIn() {
    await this.googleSignInButton.click();
  }

  /**
   * Complete sign in with email and password
   * @param {string} email
   * @param {string} password
   * @param {{ rememberMe?: boolean }} [options={}]
   */
  async signIn(email, password, options = {}) {
    const { rememberMe = false } = options;
    await this.enterEmail(email);
    await this.enterPassword(password);
    if (rememberMe) {
      await this.checkRememberMe();
    }
    await this.clickSignIn();
  }

  /**
   * Clear all form fields
   */
  async clearForm() {
    await this.emailInput.clear();
    await this.passwordInput.clear();
  }

  // ==================== Visibility Assertions ====================

  async isWelcomeHeadingVisible() {
    return await this.welcomeHeading.isVisible();
  }

  async isEmailInputVisible() {
    return await this.emailInput.isVisible();
  }

  async isPasswordInputVisible() {
    return await this.passwordInput.isVisible();
  }

  async isSignInButtonVisible() {
    return await this.signInButton.isVisible();
  }

  async isGoogleSignInVisible() {
    return await this.googleSignInButton.isVisible();
  }

  async isForgetPasswordVisible() {
    return await this.forgetPasswordLink.isVisible();
  }

  async isSignUpLinkVisible() {
    return await this.signUpLink.isVisible();
  }

  async isRememberMeVisible() {
    return await this.rememberMeCheckbox.isVisible();
  }

  // ==================== State Checks ====================

  async isRememberMeChecked() {
    return await this.rememberMeCheckbox.isChecked();
  }

  async isSignInButtonEnabled() {
    return await this.signInButton.isEnabled();
  }

  /**
   * Get email input value
   */
  async getEmailValue() {
    return await this.emailInput.inputValue();
  }

  /**
   * Get password input value
   */
  async getPasswordValue() {
    return await this.passwordInput.inputValue();
  }

  // ==================== Error Handling ====================

  async getErrorMessage() {
    if (await this.generalError.isVisible()) {
      return await this.generalError.textContent();
    }
    return null;
  }

  async hasError() {
    return await this.generalError.isVisible();
  }
}
