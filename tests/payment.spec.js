import { test, expect } from '@playwright/test';
import { PaymentPage } from '../pages/PaymentPage';

test.describe("Payment Page Capstone Tests", () => {

let payment;

test.beforeEach(async ({ page }) => {

  /* REQUIRED STORAGE VALUES */

  await page.addInitScript(() => {

    localStorage.setItem("userId","1");

    localStorage.setItem("selectedService", JSON.stringify({
      name: "Haircut Premium",
      price: 300
    }));

    localStorage.setItem("selectedSlotTime","10:00 AM");

  });

  /* MOCK BOOKINGS API */

  await page.route("**/api/bookings/**", async route => {

    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        data: {
          id: 1,
          slot: {
            date: "2026-04-05",
            time: "10:00 AM",
            service: {
              id: 1,
              name: "Haircut Premium",
              price: 300
            }
          }
        }
      })
    });

  });

  /* MOCK PAYMENT API */

  await page.route("**/api/payments/**", async route => {

    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true
      })
    });

  });

  payment = new PaymentPage(page);

  /* IMPORTANT: bookingId must exist */

  await page.goto(
    "http://127.0.0.1:5500/payment.html?bookingId=1",
    { waitUntil: "domcontentloaded" }
  );

  /* wait for page to render */

  await page.waitForSelector("#serviceName");

});


test("Payment page loads", async ({ page }) => {

  await expect(page.locator("body")).toBeVisible();

});


test("Service name displayed correctly", async ({ page }) => {

  await expect(page.locator("#serviceName")).toHaveText("Haircut Premium");

});


test("Date displayed correctly", async ({ page }) => {

  await expect(page.locator("#bookingDate")).toHaveText("2026-04-05");

});


test("Time displayed correctly", async ({ page }) => {

  await expect(page.locator("#slotTime")).toHaveText("10:00 AM");

});


test("Price displayed correctly", async ({ page }) => {

  await expect(page.locator("#price")).toHaveText("300");

});


test("Payment options visible", async ({ page }) => {

  await expect(page.locator("input[name='paymentMethod']").first()).toBeVisible();

});


test("Select payment method", async ({ page }) => {

  const option = page.locator("input[name='paymentMethod']").first();

  await option.click();

  await expect(option).toBeChecked();

});


test("Payment success flow", async ({ page }) => {

  await page.locator("input[name='paymentMethod']").first().click();

  await page.locator(".pay-btn").click();

});


test("Payment failure shows alert", async ({ page }) => {

  page.once("dialog", async dialog => {
    await dialog.accept();
  });

  await page.locator(".pay-btn").click();

});

});
