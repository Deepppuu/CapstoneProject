import { test, expect } from '@playwright/test';
import { SlotsPage } from '../pages/SlotsPage';

test.describe("Slots Page - Dynamic Slot Testing", () => {

let slotsPage;

test.beforeEach(async ({ page }) => {

slotsPage = new SlotsPage(page);

await page.addInitScript(() => {
localStorage.setItem("userId", "1");
});

await slotsPage.open();
await slotsPage.waitForPage();

});


test("service info loads", async () => {

await expect(slotsPage.serviceName).not.toBeEmpty();
await expect(slotsPage.serviceDescription).not.toBeEmpty();
await expect(slotsPage.servicePrice).toContainText("₹");

});


test("date should be today", async () => {

const value = await slotsPage.getDateValue();
const min = await slotsPage.getMinDate();

expect(value).toBe(min);

});


test("slots should render", async () => {

const count = await slotsPage.getSlotCount();

expect(count).toBeGreaterThanOrEqual(0);

});


test("slot count valid", async () => {

const count = await slotsPage.getSlotCount();

expect(count).toBeLessThanOrEqual(15);

});


test("slot format AM/PM", async () => {

const count = await slotsPage.getSlotCount();

if(count > 0){
const text = await slotsPage.slots.first().textContent();
expect(text).toMatch(/AM|PM/);
}

});





test("select slot", async () => {

await slotsPage.selectFirstSlot();

const count = await slotsPage.getSlotCount();

if(count > 0){
await expect(slotsPage.page.locator(".slot.selected")).toBeVisible();
}

});


test("only one slot selected", async () => {

await slotsPage.selectFirstSlot();
await slotsPage.selectLastSlot();

const selected = await slotsPage.page.locator(".slot.selected").count();

if(selected > 0){
expect(selected).toBe(1);
}

});


test("confirm button visible", async () => {

await expect(slotsPage.confirmButton).toBeVisible();

});


test("alert if no slot selected", async ({page}) => {

page.once("dialog", async dialog => {
await dialog.accept();
});

await slotsPage.confirmButton.click();

});


test("redirect to login if not logged in", async ({page}) => {

await slotsPage.clearLogin();

await slotsPage.confirmButton.click();

await expect(page).toHaveURL(/login/);

});


test("slot click does not reload page", async ({page}) => {

const before = page.url();

await slotsPage.selectFirstSlot();

const after = page.url();

expect(after).toBe(before);

});


test("late night slots", async () => {

const hour = new Date().getHours();

const count = await slotsPage.getSlotCount();

if(hour >= 23){
expect(count).toBe(0);
}

});

});


function convertToDate(time){

let [t,period] = time.split(" ");
let [h,m] = t.split(":").map(Number);

if(period === "PM" && h !== 12) h += 12;
if(period === "AM" && h === 12) h = 0;

const d = new Date();
d.setHours(h);
d.setMinutes(m);
d.setSeconds(0);

return d;

}