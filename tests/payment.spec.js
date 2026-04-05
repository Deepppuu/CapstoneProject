import { test, expect } from '@playwright/test';
import { PaymentPage } from '../pages/PaymentPage';

test.describe("Payment Page Capstone Tests", () => {

  let payment;

  test.beforeEach(async ({ page }) => {

    // simulate logged in user
    await page.addInitScript(() => {
      localStorage.setItem("userId", "1");
    });

    // IMPORTANT: mock API BEFORE page loads
    await page.route("**/api/bookings/**", async route => {
      await route.fulfill({
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

    await page.route("**/api/payments/**", async route => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true })
      });
    });

    payment = new PaymentPage(page);

    // open page AFTER mocks are ready
    await payment.navigate(1);

  });


  test("Payment page loads", async ({ page }) => {
    await expect(page.locator("body")).toBeVisible();
  });


  test("Service name displayed correctly", async () => {
    await expect(payment.serviceName).toHaveText("Haircut Premium");
  });


  test("Date displayed correctly", async () => {
    await expect(payment.bookingDate).toHaveText("2026-04-05");
  });


  test("Time displayed correctly", async () => {
    await expect(payment.slotTime).toHaveText("10:00 AM");
  });


  test("Price displayed correctly", async () => {
    await expect(payment.price).toHaveText("300");
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

  });


  test("Payment failure shows alert", async ({ page }) => {

    page.once("dialog", async dialog => {
      await dialog.accept();
    });

    await payment.payBtn.click();

  });

});
