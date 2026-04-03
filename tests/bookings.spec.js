import { test, expect } from '@playwright/test';
import { BookingsPage } from '../pages/BookingsPage';

test.describe("Bookings Page Tests", () => {

test.beforeEach(async ({ page }) => {

await page.addInitScript(()=>{
localStorage.setItem("userId","2");
});

});


// TC1
test("Page loads", async ({ page }) => {
const booking = new BookingsPage(page);
await booking.navigate();
await booking.verifyPageTitle();
});


// TC2
test("Booking list visible", async ({ page }) => {
const booking = new BookingsPage(page);
await booking.navigate();
await booking.verifyBookingList();
});


// TC3
test("Booking cards load", async ({ page }) => {
const booking = new BookingsPage(page);
await booking.navigate();
await booking.verifyCardsLoaded();
});


// TC4
test("Service name visible", async ({ page }) => {
const booking = new BookingsPage(page);
await booking.navigate();
await booking.verifyServiceName();
});


// TC5
test("Status badge visible", async ({ page }) => {
const booking = new BookingsPage(page);
await booking.navigate();
await booking.verifyStatus();
});


// TC6
test("Cancel button visible", async ({ page }) => {
const booking = new BookingsPage(page);
await booking.navigate();
await booking.verifyCancelVisible();
});


// TC7
test("Reschedule button visible", async ({ page }) => {
const booking = new BookingsPage(page);
await booking.navigate();
await booking.verifyRescheduleVisible();
});


// TC8
test("Pay Now button visible", async ({ page }) => {
const booking = new BookingsPage(page);
await booking.navigate();
await booking.verifyPayVisible();
});


// TC9
test("Cancel dialog appears", async ({ page }) => {
const booking = new BookingsPage(page);
await booking.navigate();

page.once('dialog', dialog=>{
dialog.dismiss();
});

await booking.clickCancel();
});


// TC10
test("Reschedule prompt appears", async ({ page }) => {
const booking = new BookingsPage(page);
await booking.navigate();

page.once('dialog', dialog=>{
dialog.dismiss();
});

await booking.clickReschedule();
});


// TC11
test("Pay Now redirects", async ({ page }) => {
const booking = new BookingsPage(page);
await booking.navigate();

if(await booking.payBtn.count()>0){
await booking.clickPay();
await expect(page).toHaveURL(/payment/);
}
});


// TC12
test("Booking card count greater than zero", async ({ page }) => {
const booking = new BookingsPage(page);
await booking.navigate();

await page.waitForSelector(".booking-card");

const count = await page.locator(".booking-card").count();
expect(count).toBeGreaterThan(0);
});


// TC13
test("Booking list container exists", async ({ page }) => {
const booking = new BookingsPage(page);
await booking.navigate();

await expect(page.locator("#bookingList")).toBeVisible();
});


// TC14
test("Auto refresh after 5 seconds", async ({ page }) => {
const booking = new BookingsPage(page);
await booking.navigate();

await page.waitForTimeout(6000);

await booking.verifyBookingList();
});


// TC15
test("Page does not crash when no bookings", async ({ page }) => {
const booking = new BookingsPage(page);
await booking.navigate();

await expect(page.locator("body")).toBeVisible();
});

});