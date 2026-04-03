import { expect } from '@playwright/test';

export class BookingsPage {

constructor(page){
this.page = page;

/* LOCATORS */
this.pageTitle = page.locator("h3.page-title");
this.bookingList = page.locator("#bookingList");
this.cards = page.locator(".booking-card");

this.serviceName = page.locator(".booking-card h5");
this.statusBadge = page.locator(".status");

this.cancelBtn = page.locator("button:has-text('Cancel')");
this.rescheduleBtn = page.locator("button:has-text('Reschedule')");
this.payBtn = page.locator("button:has-text('Pay Now')");
}

/* NAVIGATION */

async navigate(){
  await this.page.goto(
    "http://127.0.0.1:5500/Capstone-Frontend/bookings.html",
    { waitUntil: "domcontentloaded" }
  );
}

/* VALIDATIONS */

async verifyPageTitle(){
await expect(this.pageTitle).toHaveText("My Bookings");
}

async verifyBookingList(){
await expect(this.bookingList).toBeVisible();
}

async verifyCardsLoaded(){
await this.page.waitForSelector(".booking-card");
const count = await this.cards.count();
expect(count).toBeGreaterThan(0);
}

async verifyServiceName(){
await expect(this.serviceName.first()).not.toBeEmpty();
}

async verifyStatus(){
await expect(this.statusBadge.first()).toBeVisible();
}

async verifyCancelVisible(){
if(await this.cancelBtn.count()>0){
await expect(this.cancelBtn.first()).toBeVisible();
}
}

async verifyRescheduleVisible(){
if(await this.rescheduleBtn.count()>0){
await expect(this.rescheduleBtn.first()).toBeVisible();
}
}

async verifyPayVisible(){
if(await this.payBtn.count()>0){
await expect(this.payBtn.first()).toBeVisible();
}
}

/* ACTIONS */

async clickCancel(){
if(await this.cancelBtn.count()>0){
await this.cancelBtn.first().click();
}
}

async clickReschedule(){
if(await this.rescheduleBtn.count()>0){
await this.rescheduleBtn.first().click();
}
}

async clickPay(){
if(await this.payBtn.count()>0){
await this.payBtn.first().click();
}
}

}