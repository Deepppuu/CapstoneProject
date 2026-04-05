import { expect } from '@playwright/test';

export class ProfilePage {

constructor(page){

this.page = page;

this.profileCard = page.locator(".profile-card");
this.navbar = page.locator("#navbar");

this.userId = page.locator("#userId");
this.name = page.locator("#name");
this.email = page.locator("#email");

this.profileInitial = page.locator("#profileInitial");

this.logoutBtn = page.locator(".logout-btn");

}

/* NAVIGATE */

async navigate(){

await this.page.goto(
"http://127.0.0.1:5500/profile.html",
{ waitUntil: "domcontentloaded" }
);

}

/* PAGE VALIDATIONS */

async verifyPageLoaded(){

await expect(this.profileCard).toBeVisible();

}

async verifyNavbarLoaded(){

await expect(this.navbar).toBeVisible();

}

async verifyUserId(){

await expect(this.userId).not.toBeEmpty();

}

async verifyName(){

await expect(this.name).not.toBeEmpty();

}

async verifyEmail(){

await expect(this.email).not.toBeEmpty();

}

async verifyProfileInitial(){

const text = await this.profileInitial.textContent();

expect(text.length).toBeGreaterThan(0);

}

async verifyLogoutVisible(){

await expect(this.logoutBtn).toBeVisible();

}

/* ACTIONS */

async clickLogout(){

await this.logoutBtn.click();

}

}
