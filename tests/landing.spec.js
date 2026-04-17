// @ts-check
// Allure reporting enabled - 2026-04-17
import { test, expect } from '../fixtures/test.js';
import { config } from '../config/environments.js';
import { timeouts } from '../config/timeouts.js';

const HOME_URL = config.homeURL;

test.describe('Landing Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(HOME_URL, { waitUntil: 'domcontentloaded', timeout: timeouts.navigation });
  });

  // ==================== URL Verification ====================

  test('should load the correct URL', async ({ page }) => {
    await expect(page).toHaveURL(HOME_URL);
  });

  test('should have a page title', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  // ==================== Header & Navigation Visibility ====================

  test('should display the header', async ({ page }) => {
    const header = page.locator('header, nav, #mainNavbar');
    await expect(header.first()).toBeVisible();
  });

  test('should display the logo', async ({ page }) => {
    const logo = page.locator('img[alt*="logo" i], [class*="logo" i], a[class*="brand" i]');
    await expect(logo.first()).toBeVisible();
  });

  test('should display navigation links', async ({ page }) => {
    const aboutLink = page.getByRole('link', { name: /about/i });
    const pricingLink = page.getByRole('link', { name: /pricing/i });
    const contactLink = page.getByRole('link', { name: /contact/i });
    const blogLink = page.getByRole('link', { name: /blog/i });

    await expect(aboutLink.first()).toBeVisible();
    await expect(pricingLink.first()).toBeVisible();
    await expect(contactLink.first()).toBeVisible();
    await expect(blogLink.first()).toBeVisible();
  });

  test('should display Features button', async ({ page }) => {
    const featuresButton = page.getByRole('button', { name: /features/i });
    await expect(featuresButton.first()).toBeVisible();
  });

  test('should display Login link', async ({ page }) => {
    const loginLink = page.getByRole('link', { name: /login/i });
    await expect(loginLink.first()).toBeVisible();
  });

  test('should display Get a demo link in navigation', async ({ page }) => {
    const demoLink = page.getByRole('link', { name: /get a demo/i });
    await expect(demoLink.first()).toBeVisible();
  });

  // ==================== Hero Section Visibility ====================

  test('should display hero section', async ({ page }) => {
    const heroSection = page.locator('[class*="hero" i], section').first();
    await expect(heroSection).toBeVisible();
  });

  test('should display hero heading', async ({ page }) => {
    const heroHeading = page.locator('h1, [class*="hero"] h1, [class*="hero"] h2');
    await expect(heroHeading.first()).toBeVisible();
  });

  test('should display hero description text', async ({ page }) => {
    const heroDescription = page.locator('[class*="hero"] p, main p').first();
    await expect(heroDescription).toBeVisible();
  });

  test('should display Try for free button', async ({ page }) => {
    const tryFreeLink = page.getByRole('link', { name: /try for free/i });
    await expect(tryFreeLink.first()).toBeVisible();
  });

  test('should display Get a demo button in hero', async ({ page }) => {
    const demoButton = page.getByRole('main').getByRole('link', { name: /get a demo/i });
    await expect(demoButton.first()).toBeVisible();
  });

  // ==================== Main Content Visibility ====================

  test('should display main content area', async ({ page }) => {
    const main = page.locator('main, [role="main"]');
    await expect(main.first()).toBeVisible();
  });

  test('should display all images', async ({ page }) => {
    const images = page.locator('img:visible');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 5); i++) {
      await expect(images.nth(i)).toBeVisible();
    }
  });

  // ==================== Navigation Interactions ====================

  test('should navigate to About page', async ({ page }) => {
    await page.getByRole('link', { name: /about/i }).first().click();
    await expect(page).toHaveURL(/about/);
  });

  test('should open Features dropdown', async ({ page }) => {
    const featuresButton = page.getByRole('button', { name: /features/i }).first();
    await featuresButton.click();
    // Verify dropdown is visible after click
    const dropdown = page.locator('[class*="dropdown-menu"], [class*="dropdown"] ul');
    await expect(dropdown.first()).toBeVisible();
  });

  test('should navigate to Pricing page', async ({ page }) => {
    await page.getByRole('link', { name: /pricing/i }).first().click();
    await expect(page).toHaveURL(/pricing/);
  });

  test('should navigate to Contact page', async ({ page }) => {
    await page.getByRole('link', { name: /contact/i }).first().click();
    await expect(page).toHaveURL(/contact/);
  });

  test('should navigate to Blog page', async ({ page }) => {
    await page.getByRole('link', { name: /blog/i }).first().click();
    await expect(page).toHaveURL(/blog/);
  });

  test('should navigate to Login page', async ({ page }) => {
    await page.getByRole('link', { name: /login/i }).first().click();
    await expect(page).toHaveURL(/sign-in/);
  });

  test('should click Try for free link', async ({ page }) => {
    const tryFreeLink = page.getByRole('link', { name: /try for free/i }).first();
    await expect(tryFreeLink).toBeEnabled();
    await tryFreeLink.click();
  });

  test('should click Get a demo from hero', async ({ page }) => {
    const demoLink = page.getByRole('main').getByRole('link', { name: /get a demo/i }).first();
    await expect(demoLink).toBeEnabled();
    await demoLink.click();
  });

  // ==================== Responsive UI Tests ====================

  test('should display correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const main = page.locator('main, body');
    await expect(main.first()).toBeVisible();
  });

  test('should display correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    const main = page.locator('main, body');
    await expect(main.first()).toBeVisible();
  });

  test('should display hamburger menu on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const hamburger = page.locator('[class*="toggler"], [class*="hamburger"], button[aria-label*="menu" i], .navbar-toggler');
    const count = await hamburger.count();
    if (count > 0) {
      await expect(hamburger.first()).toBeVisible();
    }
  });

});
