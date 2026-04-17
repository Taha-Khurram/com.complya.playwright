// Environment Configuration
const environments = {
  dev: {
    baseURL: 'https://dev.complya.com',
    homeURL: 'https://dev.complya.com/home/',
  },
  staging: {
    baseURL: 'https://staging.complya.com',
    homeURL: 'https://staging.complya.com/home/',
  },
  prod: {
    baseURL: 'https://complya.dev',
    homeURL: 'https://complya.dev/home/',
  },
};

const env = process.env.TEST_ENV || 'prod';

export const config = environments[env] || environments.prod;
