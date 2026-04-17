// @ts-check
import { BasePage } from './BasePage.js';

/**
 * @typedef {import('@playwright/test').Page} Page
 */

export class LandingPage extends BasePage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    super(page);

    // Navbar Elements
    this.logo = page.locator('#mainNavbar').getByRole('link', { name: 'Complya logo' });
    this.aboutLink = page.locator('#navbarNav').getByRole('link', { name: 'About' });
    this.featuresButton = page.getByRole('button', { name: 'Features Arrow Icon' });
    this.pricingLink = page.locator('#navbarNav').getByRole('link', { name: 'Pricing' });
    this.contactLink = page.getByRole('link', { name: 'Contact', exact: true });
    this.blogLink = page.getByRole('link', { name: 'Blog' });
    this.loginLink = page.getByRole('link', { name: 'Login' });
    this.navDemoLink = page.locator('#navbarNav').getByRole('link', { name: 'Get a demo' });

    // Hero Section Elements
    this.heroText = page.getByText('New Stop the Revenue Leakage');
    this.heroHeading = page.getByRole('heading', { name: 'The All-in-One Platform for' });
    this.heroDescription = page.getByText('Centralize every aspect of');
    this.tryForFreeLink = page.getByRole('link', { name: 'Try for free' });
    this.heroDemoLink = page.getByRole('main').getByRole('link', { name: 'Get a demo', exact: true });
  }

  // ==================== Navigation Methods ====================

  async goto(path = '/') {
    await super.goto(path);
  }

  // ==================== Navbar Navigation Actions ====================

  async clickLogo() {
    await this.logo.click();
  }

  async clickAbout() {
    await this.aboutLink.click();
  }

  async clickFeatures() {
    await this.featuresButton.click();
  }

  async clickPricing() {
    await this.pricingLink.click();
  }

  async clickContact() {
    await this.contactLink.click();
  }

  async clickBlog() {
    await this.blogLink.click();
  }

  async clickLogin() {
    await this.loginLink.click();
  }

  async clickNavDemo() {
    await this.navDemoLink.click();
  }

  // ==================== Hero Section Actions ====================

  async clickTryForFree() {
    await this.tryForFreeLink.click();
  }

  async clickHeroDemo() {
    await this.heroDemoLink.click();
  }

  // ==================== Visibility Assertions ====================

  async isLogoVisible() {
    return await this.logo.isVisible();
  }

  async isHeroHeadingVisible() {
    return await this.heroHeading.isVisible();
  }
}
