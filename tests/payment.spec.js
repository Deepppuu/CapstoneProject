import { test, expect } from '@playwright/test';
import { PaymentPage } from '../pages/PaymentPage';

test.describe("Payment Page Capstone Tests", () => {

let payment;

test.beforeEach(async ({ page }) => {

  // simulate logged in user and booking context
  await page.addInitScript(() => {
    localStorage.setItem("userId","1");
    localStorage.setItem("bookingDate","2026-04-05");
  });

  payment = new PaymentPage(page);

  await page.goto(
    "http://127.0.0.1:5500/payment.html?serviceId=1&slotId=1"
  );

  // wait for service data
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

  await expect(page).toHaveURL(/success|booking/);

});


test("Payment failure shows alert", async ({ page }) => {

  page.once("dialog", async dialog => {
    await dialog.accept();
  });

  await payment.payButton.click();

});

});
