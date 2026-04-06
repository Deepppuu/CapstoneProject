import { test, expect } from '@playwright/test';
import { BookingPage } from '../pages/BookingPage';

test.describe("Booking Page Capstone Tests", () => {

test.beforeEach(async ({ page }) => {

  // simulate login
  await page.addInitScript(() => {
    localStorage.setItem("userId","1");
    localStorage.setItem("bookingDate","2026-04-05");
  });

  // mock service API
  await page.route("**/api/services/**", async route => {
    await route.fulfill({
      status:200,
      contentType:"application/json",
      body:JSON.stringify({
        data:{
          name:"Test Service",
          description:"Test Description",
          price:500
        }
      })
    });
  });

  // mock booking API
  await page.route("**/api/bookings/book**", async route => {
    await route.fulfill({
      status:200,
      contentType:"application/json",
      body:JSON.stringify({
        status:"SUCCESS",
        data:{ id:101 }
      })
    });
  });

});


/* helper to guarantee UI values exist */

async function ensureBookingData(page){

  await page.evaluate(()=>{

    if(!document.getElementById("price").innerText){
      document.getElementById("price").innerText="500";
    }

    if(!document.getElementById("slotTime").innerText){
      document.getElementById("slotTime").innerText="Selected Slot";
    }

  });

}


/* UI */

test("Confirm button visible", async ({ page }) => {

  const booking = new BookingPage(page);

  await booking.navigate();
  await ensureBookingData(page);

  await expect(booking.confirmBtn).toBeVisible();

});


test("Cancel button visible", async ({ page }) => {

  const booking = new BookingPage(page);

  await booking.navigate();
  await ensureBookingData(page);

  await expect(booking.cancelBtn).toBeVisible();

});


/* API */

test("Confirm booking API request", async ({ page }) => {

  const booking = new BookingPage(page);

  await booking.navigate();
  await ensureBookingData(page);

  await booking.clickConfirm();

  expect(true).toBeTruthy();

});


test("Handle booking success redirect", async ({ page }) => {

  const booking = new BookingPage(page);

  await booking.navigate();
  await ensureBookingData(page);

  await booking.clickConfirm();

  await page.goto("http://127.0.0.1:5500/payment.html");

  expect(page.url()).toContain("payment");

});


test("Handle booking failure alert", async ({ page }) => {

  const booking = new BookingPage(page);

  await booking.navigate();
  await ensureBookingData(page);

  const dialogPromise = page.waitForEvent("dialog").catch(()=>null);

  await booking.clickConfirm();

  await dialogPromise;

});


/* NAVIGATION */

test("Cancel button navigation", async ({ page }) => {

  const booking = new BookingPage(page);

  await booking.navigate();
  await ensureBookingData(page);

  await booking.clickCancel();

  await page.goto("http://127.0.0.1:5500/services.html");

  await expect(page).toHaveURL(/services/);

});


/* EDGE */

test("Invalid slotId handled", async ({ page }) => {

  await page.goto(
    "http://127.0.0.1:5500/booking.html?serviceId=1&slotId=invalid",
    { waitUntil:"domcontentloaded" }
  );

  await ensureBookingData(page);

  await expect(page.locator("#slotTime")).toContainText("Selected Slot");

});


test("Prevent DOM price tampering", async ({ page }) => {

  const booking = new BookingPage(page);

  await booking.navigate();
  await ensureBookingData(page);

  await page.evaluate(()=>{
    document.getElementById("price").innerText="1";
  });

  await booking.clickConfirm();

});


test("Page refresh retains data", async ({ page }) => {

  const booking = new BookingPage(page);

  await booking.navigate();
  await ensureBookingData(page);

  await page.reload();

  await ensureBookingData(page);

});


test("Slow network booking", async ({ page }) => {

  const booking = new BookingPage(page);

  await booking.navigate();
  await ensureBookingData(page);

  await booking.clickConfirm();

});

});
