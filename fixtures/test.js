// @ts-check
import { test as base } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage.js';
import { SignInPage } from '../pages/SignInPage.js';

/**
 * @typedef {import('@playwright/test').Page} Page
 */

/**
 * Custom fixtures for page objects
 * @typedef {Object} PageFixtures
 * @property {LandingPage} landingPage - Landing page object
 * @property {SignInPage} signInPage - Sign in page object
 */

/**
 * Extended test with page object fixtures
 */
export const test = base.extend(/** @type {import('@playwright/test').Fixtures<PageFixtures, {}, import('@playwright/test').PlaywrightTestArgs, import('@playwright/test').PlaywrightWorkerArgs>} */ ({
  landingPage: async ({ page }, use) => {
    const landingPage = new LandingPage(page);
    await use(landingPage);
  },
  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);
    await use(signInPage);
  },
}));

export { expect } from '@playwright/test';
