// Timeout Configuration (in milliseconds)

export const timeouts = {
  // Navigation timeouts
  navigation: 60000,        // Page navigation/goto

  // Element wait timeouts
  elementVisible: 10000,    // Wait for element to be visible
  elementLong: 20000,       // Wait for slower elements
  elementVeryLong: 30000,   // Wait for very slow elements

  // URL/assertion timeouts
  urlChange: 15000,         // Wait for URL to change after navigation
  urlChangeAfterLogin: 20000, // Wait for URL after login (slower)
  urlChangeFast: 10000,     // Wait for URL on error states

  // Test timeout
  test: 60000,              // Overall test timeout

  // Playwright config timeouts
  action: 10000,            // Action timeout (clicks, fills)
  expect: 5000,             // Expect/assertion timeout
  global: 30000,            // Global test timeout
};
