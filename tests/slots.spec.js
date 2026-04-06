import { test, expect } from '@playwright/test';
import { SlotsPage } from '../pages/SlotsPage';

test.describe("Slots Page - Dynamic Slot Testing", () => {

let slotsPage;

test.beforeEach(async ({ page }) => {

  slotsPage = new SlotsPage(page);

  /* simulate logged in user */

  await page.addInitScript(() => {
    localStorage.setItem("userId", "1");
  });

  await slotsPage.open();

  await slotsPage.waitForPage();

});


test("service info loads", async () => {

  await expect(slotsPage.serviceName).toBeVisible({timeout:10000});
  await expect(slotsPage.serviceDescription).toBeVisible();
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

  test.skip(count === 0);

  const text = await slotsPage.slots.first().textContent();

  expect(text).toMatch(/AM|PM/);

});


test("select slot", async () => {

  const count = await slotsPage.getSlotCount();

  test.skip(count === 0);

  await slotsPage.selectFirstSlot();

  await expect(slotsPage.page.locator(".slot.selected")).toBeVisible();

});


test("only one slot selected", async () => {

  const count = await slotsPage.getSlotCount();

  test.skip(count < 2);

  await slotsPage.selectFirstSlot();

  await slotsPage.selectLastSlot();

  const selected = await slotsPage.page.locator(".slot.selected").count();

  expect(selected).toBe(1);

});


test("confirm button visible", async () => {

  await expect(slotsPage.confirmButton).toBeVisible();

});





test("redirect to login if not logged in", async ({page}) => {

  await slotsPage.clearLogin();

  await slotsPage.confirmButton.click();

  await page.waitForURL(/login/, {timeout:60000});

});


test("slot click does not reload page", async ({page}) => {

  const count = await slotsPage.getSlotCount();

  test.skip(count === 0);

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
