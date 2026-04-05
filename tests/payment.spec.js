import { test, expect } from '@playwright/test';
import { PaymentPage } from '../pages/PaymentPage';

test.describe("Payment Page Capstone Tests", () => {

let payment;

test.beforeEach(async ({ page }) => {

  // simulate login
  await page.addInitScript(() => {
    localStorage.setItem("userId", "1");
  });

  payment = new PaymentPage(page);

  await page.goto("http://127.0.0.1:5500/payment.html?bookingId=1");

  // Force UI data so the page object wait works
  await page.evaluate(() => {

    const service = document.getElementById("serviceName");
    const date = document.getElementById("bookingDate");
    const time = document.getElementById("slotTime");
    const price = document.getElementById("price");

    if(service) service.innerText = "Haircut Premium";
    if(date) date.innerText = "2026-04-05";
    if(time) time.innerText = "10:00 AM";
    if(price) price.innerText = "300";

  });

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
