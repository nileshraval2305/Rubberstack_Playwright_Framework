import { Given, When, Then,setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Page, Browser, BrowserContext } from 'playwright';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';


setDefaultTimeout(60 * 1000 * 2);


Given('User launches the RudderStack login page', async function () {
  
  await pageFixture.page.goto(process.env.BASEURL);
   await pageFixture.page.waitForSelector('#text-input-email');
});
``
Given('User enter the username as {string}', async function (username: string) {
  await pageFixture.page.fill('#text-input-email', username); // Adjust selector if needed
});

Given('User enter the password as {string}', async function (password: string) {
  await pageFixture.page.fill('#text-input-password', password); // Adjust selector if needed
});

When('User click on the login button', async function () {
  await pageFixture.page.click('//span[normalize-space()="Log in"]'); // Adjust selector if needed
});

When('It should ask for 2FA code will skip it', async function () {
  await pageFixture.page.click("//a[contains(text(),'do this later')]"); // Adjust selector if needed
});

When('Click on Dashboard button', async function () {
  await pageFixture.page.click("button[type='button'] span"); // Adjust selector if needed
});



Then('User should be redirected to the dashboard', async function () {
  await pageFixture.page.waitForSelector('.sc-iBAcGC.fJpLL');
  const dashboardText = await pageFixture.page.textContent('.sc-iBAcGC.fJpLL'); // Adjust selector if needed
  expect(dashboardText).toContain('Connections'); // Adjust selector if needed
});





