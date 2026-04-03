import { expect } from '@playwright/test';

const BASE_URL = "http://127.0.0.1:5500";

export class BookingPage {

constructor(page){
this.page = page;

this.bookingCard = page.locator(".booking-card");
this.serviceName = page.locator("#serviceName");
this.serviceDescription = page.locator("#serviceDescription");

// ✅ FIX: use visible price
this.servicePrice = page.locator("#price");

this.slotTime = page.locator("#slotTime");
this.bookingDate = page.locator("#bookingDate");

this.confirmBtn = page.locator(".confirm-btn");
this.cancelBtn = page.locator(".cancel-btn");
}

/* NAVIGATION */
async navigate() {
  await this.page.goto(
    "http://127.0.0.1:5500/Capstone-Frontend/booking.html?serviceId=1&slotId=10:00"
  );

  // ✅ WAIT until data is actually populated
  await this.page.waitForFunction(() => {
    const service = document.getElementById("serviceName")?.textContent;
    const slot = document.getElementById("slotTime")?.textContent;
    const price = document.getElementById("price")?.textContent;
    return service && service.trim() !== "" &&
           slot && slot.trim() !== "" &&
           price && price.trim() !== "";
  });
}

/* VALIDATIONS */

async verifyPageLoaded(){
await expect(this.bookingCard).toBeVisible();
}

async verifyServiceDetails(){
await expect(this.serviceName).not.toBeEmpty();
await expect(this.serviceDescription).not.toBeEmpty();
}

async verifyPriceNumeric(){
const price = await this.servicePrice.textContent();
expect(price).not.toBe("");
expect(Number(price)).toBeGreaterThan(0);
}

async verifySlot(){
const slot = await this.slotTime.textContent();
expect(slot.length).toBeGreaterThan(0);
}

async verifyBookingDate(){
await expect(this.bookingDate).toHaveText("2026-04-05");
}

/* ACTIONS */

async clickConfirm(){
await this.confirmBtn.click();
}

async clickCancel(){
await this.cancelBtn.click();
}

}