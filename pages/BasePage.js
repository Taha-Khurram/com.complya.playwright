// @ts-check

/**
 * @typedef {import('@playwright/test').Page} Page
 */

/**
 * BasePage - Contains common reusable methods for all page objects
 */
export class BasePage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // ==================== Navigation ====================

  /**
   * @param {string} url
   */
  async goto(url) {
    await this.page.goto(url);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle() {
    return await this.page.title();
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  // ==================== Click Methods ====================

  /**
   * Click a link by its accessible name
   * @param {string} name - The accessible name of the link
   * @param {{ exact?: boolean, scope?: string | null }} [options={}]
   */
  async clickLink(name, options = {}) {
    const { exact = false, scope = null } = options;
    const locator = scope
      ? this.page.locator(scope).getByRole('link', { name, exact })
      : this.page.getByRole('link', { name, exact });
    await locator.click();
  }

  /**
   * Click a button by its accessible name
   * @param {string} name - The accessible name of the button
   * @param {{ exact?: boolean, scope?: string | null }} [options={}]
   */
  async clickButton(name, options = {}) {
    const { exact = false, scope = null } = options;
    const locator = scope
      ? this.page.locator(scope).getByRole('button', { name, exact })
      : this.page.getByRole('button', { name, exact });
    await locator.click();
  }

  /**
   * Click by data-testid attribute
   * @param {string} testId
   */
  async clickByTestId(testId) {
    await this.page.getByTestId(testId).click();
  }

  /**
   * Click by CSS selector
   * @param {string} selector
   */
  async clickBySelector(selector) {
    await this.page.locator(selector).click();
  }

  /**
   * Click by visible text
   * @param {string} text
   * @param {{ exact?: boolean }} [options={}]
   */
  async clickByText(text, options = {}) {
    const { exact = false } = options;
    await this.page.getByText(text, { exact }).click();
  }

  /**
   * Click by role and name
   * @param {"alert" | "alertdialog" | "application" | "article" | "banner" | "blockquote" | "button" | "caption" | "cell" | "checkbox" | "code" | "columnheader" | "combobox" | "complementary" | "contentinfo" | "definition" | "deletion" | "dialog" | "directory" | "document" | "emphasis" | "feed" | "figure" | "form" | "generic" | "grid" | "gridcell" | "group" | "heading" | "img" | "insertion" | "link" | "list" | "listbox" | "listitem" | "log" | "main" | "marquee" | "math" | "menu" | "menubar" | "menuitem" | "menuitemcheckbox" | "menuitemradio" | "meter" | "navigation" | "none" | "note" | "option" | "paragraph" | "presentation" | "progressbar" | "radio" | "radiogroup" | "region" | "row" | "rowgroup" | "rowheader" | "scrollbar" | "search" | "searchbox" | "separator" | "slider" | "spinbutton" | "status" | "strong" | "subscript" | "superscript" | "switch" | "tab" | "table" | "tablist" | "tabpanel" | "term" | "textbox" | "time" | "timer" | "toolbar" | "tooltip" | "tree" | "treegrid" | "treeitem"} role - ARIA role
   * @param {string} name - Accessible name
   * @param {{ exact?: boolean, scope?: string | null }} [options={}]
   */
  async clickByRole(role, name, options = {}) {
    const { exact = false, scope = null } = options;
    const locator = scope
      ? this.page.locator(scope).getByRole(role, { name, exact })
      : this.page.getByRole(role, { name, exact });
    await locator.click();
  }

  // ==================== Input Methods ====================

  /**
   * Fill input by label
   * @param {string} label
   * @param {string} value
   */
  async fillByLabel(label, value) {
    await this.page.getByLabel(label).fill(value);
  }

  /**
   * Fill input by placeholder
   * @param {string} placeholder
   * @param {string} value
   */
  async fillByPlaceholder(placeholder, value) {
    await this.page.getByPlaceholder(placeholder).fill(value);
  }

  // ==================== Visibility Methods ====================

  /**
   * Check if element with text is visible
   * @param {string} text
   */
  async isTextVisible(text) {
    return await this.page.getByText(text).isVisible();
  }

  /**
   * Check if element by selector is visible
   * @param {string} selector
   */
  async isVisible(selector) {
    return await this.page.locator(selector).isVisible();
  }

  /**
   * Wait for element to be visible
   * @param {string} selector
   * @param {number} timeout - Timeout in ms
   */
  async waitForVisible(selector, timeout = 30000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  // ==================== Hover Methods ====================

  /**
   * Hover over element by selector
   * @param {string} selector
   */
  async hover(selector) {
    await this.page.locator(selector).hover();
  }

  /**
   * Hover over link by name
   * @param {string} name
   */
  async hoverLink(name) {
    await this.page.getByRole('link', { name }).hover();
  }

  /**
   * Hover over button by name
   * @param {string} name
   */
  async hoverButton(name) {
    await this.page.getByRole('button', { name }).hover();
  }
}
