import { test, expect } from '@playwright/test';
import { BookingPage } from '../pages/BookingPage';

test.describe("Booking Page Capstone Tests", () => {

test.beforeEach(async ({ page }) => {

  // simulate login
  await page.addInitScript(() => {
    window.localStorage.setItem("userId","1");
    window.localStorage.setItem("bookingDate","2026-04-05");
  });

  // mock service API
  await page.route("**/api/services/*", route => {
    route.fulfill({
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
  await page.route("**/api/bookings/book*", route => {
    route.fulfill({
      status:200,
      contentType:"application/json",
      body:JSON.stringify({
        status:"SUCCESS",
        data:{ id:101 }
      })
    });
  });

});


/* UI */

test("Confirm button visible", async ({ page }) => {

const booking = new BookingPage(page);

await booking.navigate();
await booking.waitForBookingData();

await expect(booking.confirmBtn).toBeVisible();

});


test("Cancel button visible", async ({ page }) => {

const booking = new BookingPage(page);

await booking.navigate();
await booking.waitForBookingData();

await expect(booking.cancelBtn).toBeVisible();

});


/* API */

test("Confirm booking API request", async ({ page }) => {

const booking = new BookingPage(page);

await booking.navigate();
await booking.waitForBookingData();

const [request] = await Promise.all([

page.waitForRequest(req =>
req.url().includes("/api/bookings/book") &&
req.method() === "POST"
),

booking.clickConfirm()

]);

expect(request).toBeTruthy();

});


test("Handle booking success redirect", async ({ page }) => {

const booking = new BookingPage(page);

await booking.navigate();
await booking.waitForBookingData();

await booking.clickConfirm();

await page.waitForURL(/payment/);

expect(page.url()).toContain("payment");

});


test("Handle booking failure alert", async ({ page }) => {

await page.route("**/api/bookings/book*", route => {
route.fulfill({
status:200,
contentType:"application/json",
body:JSON.stringify({
status:"FAILED",
message:"Booking failed"
})
});
});

const booking = new BookingPage(page);

await booking.navigate();
await booking.waitForBookingData();

const dialogPromise = page.waitForEvent("dialog");

await booking.clickConfirm();

const alert = await dialogPromise;

expect(alert.message()).toContain("Booking failed");

await alert.dismiss();

});


/* NAVIGATION */

test("Cancel button navigation", async ({ page }) => {

const booking = new BookingPage(page);

await booking.navigate();
await booking.waitForBookingData();

await booking.clickCancel();

await expect(page).toHaveURL(/services/);

});


/* EDGE */

test("Invalid slotId handled", async ({ page }) => {

await page.addInitScript(() => {
localStorage.setItem("userId","1");
localStorage.setItem("bookingDate","2026-04-05");
});

await page.route("**/api/services/*", route => {
route.fulfill({
status:200,
contentType:"application/json",
body:JSON.stringify({
data:{name:"Test",description:"Test",price:100}
})
});
});

await page.goto(
"http://127.0.0.1:5500/booking.html?serviceId=1&slotId=invalid",
{ waitUntil:"domcontentloaded" }
);

await expect(page.locator("#slotTime")).toContainText("Selected Slot");

});


test("Prevent DOM price tampering", async ({ page }) => {

const booking = new BookingPage(page);

await booking.navigate();
await booking.waitForBookingData();

await page.evaluate(() => {
document.getElementById("price").innerText="1";
});

const dialogPromise = page.waitForEvent('dialog');

await booking.clickConfirm();

const dialog = await dialogPromise;

await dialog.dismiss();

});


test("Page refresh retains data", async ({ page }) => {

const booking = new BookingPage(page);

await booking.navigate();
await booking.waitForBookingData();

await page.reload();

await booking.verifyServiceDetails();

});


test("Slow network booking", async ({ page }) => {

await page.route("**/api/bookings/book*", async route => {

await new Promise(r=>setTimeout(r,2000));

route.fulfill({
status:200,
contentType:"application/json",
body:JSON.stringify({
status:"SUCCESS",
data:{ id:101 }
})
});

});

const booking = new BookingPage(page);

await booking.navigate();
await booking.waitForBookingData();

await booking.clickConfirm();

});

});
