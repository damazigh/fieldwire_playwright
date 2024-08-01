import { test as base, expect } from '@playwright/test';

const test = base.extend({
  jwt: async ({}, use) => {
    // Use the JWT from the environment variable
    await use(process.env.ACCESS_TOKEN);
  },
})

export {
  test,
  expect
}
