// Test Data Configuration

// Valid credentials per environment (use env vars for sensitive data)
const credentialsByEnv = {
  dev: {
    email: process.env.TEST_USER_EMAIL || 'dev-user@example.com',
    password: process.env.TEST_USER_PASSWORD || 'devpassword123',
  },
  staging: {
    email: process.env.TEST_USER_EMAIL || 'staging-user@example.com',
    password: process.env.TEST_USER_PASSWORD || 'stagingpassword123',
  },
  prod: {
    email: process.env.TEST_USER_EMAIL || 'kiyer44303@bpotogo.com',
    password: process.env.TEST_USER_PASSWORD || 'comply@12',
  },
};

const env = process.env.TEST_ENV || 'prod';

export const validCredentials = credentialsByEnv[env] || credentialsByEnv.prod;

// Invalid credentials (same across all environments)
export const invalidCredentials = {
  wrongEmail: 'invalid@example.com',
  wrongPassword: 'wrongpassword123',
  malformedEmail: 'notanemail',
  sqlInjection: "' OR '1'='1",
  xssScript: '<script>alert("xss")</script>',
  specialChars: '!@#$%^&*()_+{}|:"<>?',
  longEmail: 'a'.repeat(100) + '@example.com',
  longPassword: 'a'.repeat(100),
};
