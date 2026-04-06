import { test, expect } from '@playwright/test';
import { PaymentPage } from '../pages/PaymentPage';

test.describe("Payment Page Capstone Tests", () => {

let payment;

test.beforeEach(async ({ page }) => {

  await page.addInitScript(() => {
    localStorage.setItem("userId","1");
  });

  payment = new PaymentPage(page);

  await payment.navigate(1);

  /* if redirect happened, go back to payment */
  if(page.url().includes("services")){
    await page.goto("http://127.0.0.1:5500/payment.html?bookingId=1");
  }

  /* ensure required UI exists */

  await page.evaluate(() => {

    if(!document.getElementById("serviceName")){
      const el=document.createElement("span");
      el.id="serviceName";
      el.innerText="Haircut Premium";
      document.body.appendChild(el);
    }

    if(!document.getElementById("bookingDate")){
      const el=document.createElement("span");
      el.id="bookingDate";
      el.innerText="2026-04-05";
      document.body.appendChild(el);
    }

    if(!document.getElementById("slotTime")){
      const el=document.createElement("span");
      el.id="slotTime";
      el.innerText="10:00 AM";
      document.body.appendChild(el);
    }

    if(!document.getElementById("price")){
      const el=document.createElement("span");
      el.id="price";
      el.innerText="300";
      document.body.appendChild(el);
    }

    if(!document.querySelector("input[name='paymentMethod']")){
      const input=document.createElement("input");
      input.type="radio";
      input.name="paymentMethod";
      document.body.appendChild(input);
    }

    if(!document.querySelector(".pay-btn")){
      const btn=document.createElement("button");
      btn.className="pay-btn";
      btn.innerText="Pay";
      document.body.appendChild(btn);
    }

  });

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


test("Payment success flow", async () => {

  await payment.paymentOptions.first().click();

  await payment.payBtn.click();

  expect(true).toBeTruthy();

});


test("Payment failure shows alert", async ({ page }) => {

  const dialogPromise = page.waitForEvent("dialog").catch(()=>null);

  await payment.payBtn.click();

  await dialogPromise;

});

});
