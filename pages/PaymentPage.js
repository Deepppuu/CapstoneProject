import { expect } from '@playwright/test';

export class PaymentPage {

  constructor(page){
    this.page = page;

    this.serviceName = page.locator("#serviceName");
    this.bookingDate = page.locator("#bookingDate");
    this.slotTime = page.locator("#slotTime");
    this.price = page.locator("#price");

    this.paymentOptions = page.locator("input[name='paymentMethod']");
    this.payBtn = page.locator(".pay-btn");
  }

  async navigate(bookingId){
    await this.page.goto(
      `http://127.0.0.1:5500/Capstone-Frontend/payment.html?bookingId=${bookingId}`,
      { waitUntil: "domcontentloaded" }
    );
  }

  async verifyServiceName(name){
    await expect(this.serviceName).toHaveText(name);
  }

  async verifyDate(date){
    await expect(this.bookingDate).toHaveText(date);
  }

  async verifyTime(time){
    await expect(this.slotTime).toHaveText(time);
  }

  async verifyPrice(price){
    await expect(this.price).toHaveText(String(price));
  }

  async selectPaymentMethod(){
    await this.paymentOptions.first().check();
  }

  async clickPay(){
    await this.payBtn.click();
  }

}