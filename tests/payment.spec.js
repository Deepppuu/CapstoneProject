import { test, expect } from '@playwright/test';
import { PaymentPage } from '../pages/PaymentPage';

test.describe("Payment Page Capstone Tests", () => {

  test.beforeEach(async ({ page }) => {

    /* MOCK LOGIN */
    await page.addInitScript(() => {
      localStorage.setItem("userId", "1");
    });

    /* MOCK BOOKING FETCH (THIS FIXES YOUR ISSUE) */
    await page.route("**/bookings/*", route => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          data: {
            slot: {
              time: "10:00",
              date: "2026-04-05",
              service: {
                name: "Hair Spa",
                price: 500
              }
            }
          }
        })
      });
    });

  });

  /* ---------------- BASIC ---------------- */

  test("Payment page loads", async ({ page }) => {

    const payment = new PaymentPage(page);
    await payment.navigate(101);

    await expect(payment.serviceName).toBeVisible();
  });

  test("Service name displayed correctly", async ({ page }) => {

    const payment = new PaymentPage(page);
    await payment.navigate(101);

    await payment.verifyServiceName("Hair Spa");
  });

  test("Date displayed correctly", async ({ page }) => {

    const payment = new PaymentPage(page);
    await payment.navigate(101);

    await payment.verifyDate("2026-04-05");
  });

  test("Time displayed correctly", async ({ page }) => {

    const payment = new PaymentPage(page);
    await payment.navigate(101);

    await payment.verifyTime("10:00");
  });

  test("Price displayed correctly", async ({ page }) => {

    const payment = new PaymentPage(page);
    await payment.navigate(101);

    await payment.verifyPrice(500);
  });

  /* ---------------- UI ---------------- */

  test("Payment options visible", async ({ page }) => {

    const payment = new PaymentPage(page);
    await payment.navigate(101);

    await expect(payment.paymentOptions).toHaveCount(3);
  });

  test("Select payment method", async ({ page }) => {

    const payment = new PaymentPage(page);
    await payment.navigate(101);

    await payment.selectPaymentMethod();

    await expect(payment.paymentOptions.first()).toBeChecked();
  });

  

  /* ---------------- API ---------------- */

  test("Payment success flow", async ({ page }) => {

    await page.route("**/payments/pay*", route => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ status: "SUCCESS" })
      });
    });

    const payment = new PaymentPage(page);
    await payment.navigate(101);

    await payment.selectPaymentMethod();

    const dialogPromise = page.waitForEvent("dialog");

    await payment.clickPay();

    const dialog = await dialogPromise;
    expect(dialog.message()).toContain("Payment Successful");

    await dialog.dismiss();

    await page.waitForURL(/bookings\.html/);
  });

  test("Payment failure shows alert", async ({ page }) => {

    await page.route("**/payments/pay*", route => {
      route.fulfill({
        status: 500
      });
    });

    const payment = new PaymentPage(page);
    await payment.navigate(101);

    await payment.selectPaymentMethod();

    const dialogPromise = page.waitForEvent("dialog");

    await payment.clickPay();

    const dialog = await dialogPromise;
    expect(dialog.message()).toContain("Payment failed");

    await dialog.dismiss();
  });

});