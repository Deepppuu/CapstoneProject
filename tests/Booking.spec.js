import { test, expect } from '@playwright/test';
import { BookingPage } from '../pages/BookingPage';

test.describe("Booking Page Capstone Tests", () => {

test.beforeEach(async ({ page }) => {

/* MOCK LOGIN STATE */

await page.addInitScript(() => {
localStorage.setItem("userId","1");
localStorage.setItem("bookingDate","2026-04-05");
});

/* MOCK SERVICE API */

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

});


/* ---------------- UI ---------------- */

test("Confirm button visible", async ({ page }) => {

const booking = new BookingPage(page);

await booking.navigate();

await expect(booking.confirmBtn).toBeVisible();

});


test("Cancel button visible", async ({ page }) => {

const booking = new BookingPage(page);

await booking.navigate();

await expect(booking.cancelBtn).toBeVisible();

});


/* ---------------- API ---------------- */

test("Confirm booking API request", async ({ page }) => {

const booking = new BookingPage(page);

await booking.navigate();

const dialogPromise = page.waitForEvent('dialog');

const [request] = await Promise.all([

page.waitForRequest(req =>
req.url().includes("/bookings/book") &&
req.method() === "POST"
),

booking.clickConfirm()

]);

const dialog = await dialogPromise;

await dialog.dismiss();

expect(request).toBeTruthy();

});


test("Handle booking success redirect", async ({ page }) => {

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

const booking = new BookingPage(page);

await booking.navigate();

await booking.clickConfirm();

await page.waitForURL(/payment\.html/);

expect(page.url()).toContain("payment.html");

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

const dialogPromise = page.waitForEvent("dialog");

await booking.clickConfirm();

const alert = await dialogPromise;

expect(alert.message()).toContain("Booking failed");

await alert.dismiss();

});


/* ---------------- NAVIGATION ---------------- */

test("Cancel button navigation", async ({ page }) => {

const booking = new BookingPage(page);

await booking.navigate();

await booking.clickCancel();

await expect(page).toHaveURL(/services\.html/);

});


/* ---------------- EDGE ---------------- */

test("Invalid slotId handled", async ({ page }) => {

await page.goto(
"http://127.0.0.1:5500/booking.html?serviceId=1&slotId=invalid",
{ waitUntil:"domcontentloaded" }
);

await expect(page.locator("#slotTime")).toHaveText("Selected Slot");

});


test("Prevent DOM price tampering", async ({ page }) => {

const booking = new BookingPage(page);

await booking.navigate();

await page.evaluate(() => {

document.getElementById("price").innerText = "1";

});

const dialogPromise = page.waitForEvent('dialog');

await booking.clickConfirm();

const dialog = await dialogPromise;

await dialog.dismiss();

});


test("Page refresh retains data", async ({ page }) => {

const booking = new BookingPage(page);

await booking.navigate();

await page.reload();

await booking.verifyServiceDetails();

});


test("Slow network booking", async ({ page }) => {

await page.route("**/api/bookings/book*", async route => {

await new Promise(r => setTimeout(r,2000));

await route.continue();

});

const booking = new BookingPage(page);

await booking.navigate();

const dialogPromise = page.waitForEvent('dialog');

await booking.clickConfirm();

const dialog = await dialogPromise;

await dialog.dismiss();

});

});
