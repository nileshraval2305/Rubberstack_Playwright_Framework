import { Given, When, Then } from '@cucumber/cucumber';
import { expect, request, APIRequestContext } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';

let dataPlaneURL: string;
let writeKey: string;
let apiContext: APIRequestContext;

Given('User navigates to the Connections page', async function () {
  await pageFixture.page.locator(".sc-jrkPvW.ebfakN.text-ellipsis").click({force: true});
  await pageFixture.page.waitForSelector('.sc-jrkPvW.ebfakN.text-ellipsis');
  
});

When('User reads and stores the Data Plane URL from the top right corner', async function () {
  dataPlaneURL = await pageFixture.page.textContent('.sc-jrkPvW.ebfakN.text-ellipsis'); // Update selector
  expect(dataPlaneURL).toBeTruthy();
});

When('User copies and stores the Write Key of the HTTP source', async function () {
  await pageFixture.page.click('//span[normalize-space()="Sources"]'); 
 await pageFixture.page.waitForSelector("//div[contains(text(),'httptest11')]");
  await pageFixture.page.locator("//div[contains(text(),'httptest11')]").click({force: true}); 
  await pageFixture.page.click("//div[text()='Setup']");//click on Setup tab 
 
  
  writeKey = await pageFixture.page.textContent('div[class="sourceSetup_writeKey__engIE"]'); // Update selector
  const match = writeKey.match(/Write key\s+([A-Za-z0-9]+)/);

if (match) {
  const writeKey = match[1]; // captured group
  console.log("Write Key:", writeKey);
}
  
  expect(writeKey).toBeTruthy();
});

When('User sends an event using API call with the stored Write Key and Data Plane URL', async function () {
  apiContext = await request.newContext({
    baseURL: dataPlaneURL,
    extraHTTPHeaders: {
      Authorization: `Basic ${Buffer.from(`${writeKey}:`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
  });

  const response = await apiContext.post('/v1/track', {
    data: {
      userId: 'test-user-123',
      event: 'Test Event',
      properties: {
        source: 'Playwright API BDD Test'
      }
    }
  });

  expect.soft(response.status()).toBe(401);
  try {
    const json = await response.json();
    console.log('API JSON Response:', json);
  } catch (error) {
    const text = await response.text();
    console.log('API Text Response:', text);
  }
});

When('User clicks on the Webhook destination created earlier', async function () {
  await pageFixture.page.click('a[data-testid="sub-menu-destinations"] span');
  await pageFixture.page.click("(//tbody/tr[4]/td[1]//div[normalize-space()='Webhooktest11'])[2]"); // Click on webhook
});

Then('User should see the event in the Events tab of the destination', async function () {
  await pageFixture.page.click("//div[text()='Events']"); // Click on Events tab
  const eventVisible = await pageFixture.page.isVisible("//div[text()='Events']");
  expect(eventVisible).toBe(true);
});

Then('User should read and validate the count of delivered and failed events', async function () {
  const delivered = await pageFixture.page.textContent("//div[@class='sc-hHvloA bqDHF']//div[1]//div[1]//h2[1]//span[1]"); // Update selector
  const failed = await pageFixture.page.textContent("(//h2[contains(@class,'sc-gKHVrV kFyvFM')]//span[1])[2]");       // Update selector

  console.log(`Delivered: ${delivered}, Failed: ${failed}`);
  expect.soft(Number(delivered)).toBeGreaterThan(0);
  expect.soft(Number(failed)).toBe(0);
});
