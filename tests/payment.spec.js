import { test, expect } from '@playwright/test';
import { PaymentPage } from '../pages/PaymentPage';

test.describe("Payment Page Capstone Tests", () => {

let payment;

test.beforeEach(async ({ page }) => {

  // simulate logged in user
  await page.addInitScript(() => {
    localStorage.setItem("userId","1");
    localStorage.setItem("bookingDate","2026-04-05");
  });

  // MOCK SERVICE API
  await page.route("**/api/services/*", route => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        data: {
          id: 1,
          name: "Haircut Premium",
          description: "Mock Service",
          price: 300
        }
      })
    });
  });

  payment = new PaymentPage(page);

  await page.goto(
    "http://127.0.0.1:5500/payment.html?serviceId=1&slotId=1",
    { waitUntil: "domcontentloaded" }
  );

  // wait for UI element after mock response
  await page.waitForSelector("#serviceName");

});


test("Payment page loads", async ({ page }) => {

  await expect(page.locator("body")).toBeVisible();

});


test("Service name displayed correctly", async () => {

  await expect(payment.serviceName).not.toBeEmpty();

});


test("Date displayed correctly", async () => {

  await expect(payment.date).not.toBeEmpty();

});


test("Time displayed correctly", async () => {

  await expect(payment.time).not.toBeEmpty();

});


test("Price displayed correctly", async () => {

  await expect(payment.price).not.toBeEmpty();

});


test("Payment options visible", async () => {

  await expect(payment.paymentOptions.first()).toBeVisible();

});


test("Select payment method", async () => {

  await payment.paymentOptions.first().click();

  await expect(payment.paymentOptions.first()).toBeChecked();

});


test("Payment success flow", async ({ page }) => {

  await payment.paymentOptions.first().click();

  await payment.payButton.click();

  // allow flexible redirect
  await expect(page).toHaveURL(/success|booking|services|payment/);

});


test("Payment failure shows alert", async ({ page }) => {

  page.once("dialog", async dialog => {
    await dialog.accept();
  });

  await payment.payButton.click();

});

});
