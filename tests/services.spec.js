import { test, expect } from '@playwright/test';
import { ServicesPage } from '../pages/ServicesPage';

test.describe("Services Page UI Tests", () => {

test.beforeEach(async ({page}) => {

const servicesPage = new ServicesPage(page);

// simulate logged-in user
await page.addInitScript(() => {
  localStorage.setItem("userId","1");
});

// open services page
await servicesPage.openServicesPage();

});


// Verify page heading
test("Verify services page heading", async ({page}) => {

const servicesPage = new ServicesPage(page);

await expect(servicesPage.pageTitle)
.toHaveText("Our Professional Services");

});


// Verify services container exists
test("Verify services container is visible", async ({page}) => {

const servicesPage = new ServicesPage(page);

await expect(servicesPage.servicesContainer).toBeVisible();

});


// Verify services load from API
test("Verify services are loaded", async ({page}) => {

const servicesPage = new ServicesPage(page);

const count = await servicesPage.getServiceCount();

expect(count).toBeGreaterThan(0);

});


// Verify expected number of services
test("Verify around 20 services displayed", async ({page}) => {

const servicesPage = new ServicesPage(page);

const count = await servicesPage.getServiceCount();

expect(count).toBeGreaterThanOrEqual(20);

});


// Verify service names displayed
test("Verify service names exist", async ({page}) => {

const servicesPage = new ServicesPage(page);

const count = await servicesPage.serviceNames.count();

for(let i=0;i<count;i++){

await expect(
servicesPage.serviceNames.nth(i)
).not.toBeEmpty();

}

});


// Verify service descriptions displayed
test("Verify service descriptions exist", async ({page}) => {

const servicesPage = new ServicesPage(page);

const count = await servicesPage.serviceDescriptions.count();

for(let i=0;i<count;i++){

await expect(
servicesPage.serviceDescriptions.nth(i)
).not.toBeEmpty();

}

});


// Verify service prices displayed
test("Verify service prices exist", async ({page}) => {

const servicesPage = new ServicesPage(page);

const count = await servicesPage.servicePrices.count();

for(let i=0;i<count;i++){

await expect(
servicesPage.servicePrices.nth(i)
).not.toBeEmpty();

}

});


// Verify price contains currency symbol
test("Verify price contains rupee symbol", async ({page}) => {

const servicesPage = new ServicesPage(page);

const priceText = await servicesPage.servicePrices.first().textContent();

expect(priceText).toContain("₹");

});


// Verify service images exist
test("Verify service images exist", async ({page}) => {

const servicesPage = new ServicesPage(page);

const count = await servicesPage.serviceImages.count();

expect(count).toBeGreaterThan(0);

});


// Verify images are visible
test("Verify service images are visible", async ({page}) => {

const servicesPage = new ServicesPage(page);

await expect(
servicesPage.serviceImages.first()
).toBeVisible();

});


// Verify Book Now button exists
test("Verify Book Now button exists", async ({page}) => {

const servicesPage = new ServicesPage(page);

const count = await servicesPage.bookButtons.count();

expect(count).toBeGreaterThan(0);

});


// Verify Book Now button is clickable
test("Verify Book Now button enabled", async ({page}) => {

const servicesPage = new ServicesPage(page);

await expect(
servicesPage.bookButtons.first()
).toBeEnabled();

});


// Verify Book Now redirect
test("Verify clicking Book Now redirects to slots page", async ({page}) => {

const servicesPage = new ServicesPage(page);

await servicesPage.clickBookButton(0);

await expect(page).toHaveURL(/slots/);

});


// Verify serviceId passed in URL
test("Verify serviceId present in redirect URL", async ({page}) => {

const servicesPage = new ServicesPage(page);

await servicesPage.clickBookButton(0);

await page.waitForURL(/slots/);

const url = page.url();

expect(url).toContain("serviceId");

});


// Verify navbar exists
test("Verify navbar visible", async ({page}) => {

const servicesPage = new ServicesPage(page);

await expect(servicesPage.navbar).toBeVisible();

});


// Verify Home navigation
test("Verify Home link navigation", async ({page}) => {

const servicesPage = new ServicesPage(page);

await servicesPage.navHome.click();

await expect(page).toHaveURL(/\/$/);

});


// Verify Services link active
test("Verify Services link visible", async ({page}) => {

const servicesPage = new ServicesPage(page);

await expect(servicesPage.navServices).toBeVisible();

});


// Verify My Bookings navigation
test("Verify My Bookings navigation", async ({page}) => {

const servicesPage = new ServicesPage(page);

await servicesPage.navBookings.click();

await expect(page).toHaveURL(/bookings/);

});


// Verify Profile navigation
test("Verify Profile navigation", async ({page}) => {

const servicesPage = new ServicesPage(page);

await servicesPage.navProfile.click();

await expect(page).toHaveURL(/profile/);

});


// Verify Login navigation
test("Verify Login navigation", async ({page}) => {

const servicesPage = new ServicesPage(page);

await servicesPage.navLogin.click();

await expect(page).toHaveURL(/login/);

});

});
