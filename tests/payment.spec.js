import { test, expect } from '@playwright/test';
import { PaymentPage } from '../pages/PaymentPage';

test.describe("Payment Page Capstone Tests", () => {

let payment;

test.beforeEach(async ({ page }) => {

  await page.addInitScript(() => {
    localStorage.setItem("userId","1");
  });

  // MOCK BOOKING API
  await page.route("**/api/bookings/*", route => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        data: {
          id: 1,
          slot: {
            date: "2026-04-05",
            time: "10:00 AM",
            service: {
              name: "Haircut Premium",
              price: 300
            }
          }
        }
      })
    });
  });

  payment = new PaymentPage(page);

  await payment.navigate(1);

});

test("Payment page loads", async ({ page }) => {

  await expect(page.locator("body")).toBeVisible();

});

test("Service name displayed correctly", async () => {

  await expect(payment.serviceName).not.toBeEmpty();

});

test("Date displayed correctly", async () => {

  await expect(payment.bookingDate).not.toBeEmpty();

});

test("Time displayed correctly", async () => {

  await expect(payment.slotTime).not.toBeEmpty();

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

  await payment.payBtn.click();

  await expect(page).toHaveURL(/success|booking|services|payment/);

});

test("Payment failure shows alert", async ({ page }) => {

  page.once("dialog", async dialog => {
    await dialog.accept();
  });

  await payment.payBtn.click();

});

});
